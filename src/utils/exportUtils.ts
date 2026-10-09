import jsPDF from 'jspdf';
import { CardData } from '../types/card';
import { generateCardSvgMarkup } from './cardSvgBuilder';

// Convert card SVG to an Image and draw on an off-screen HTMLCanvasElement
export async function renderCardToCanvas(
  card: CardData, 
  options: { withBleed?: boolean; showBleedGuides?: boolean } = {}
): Promise<HTMLCanvasElement> {
  const svgMarkup = generateCardSvgMarkup(card, { showBleedGuides: options.showBleedGuides });
  const blob = new Blob([svgMarkup], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  // If withBleed is requested, add 3mm (36px at 300DPI) on each side: 750+72 = 822 x 1050+72 = 1122
  const bleedPad = options.withBleed ? 36 : 0;
  const canvasWidth = 750 + bleedPad * 2;
  const canvasHeight = 1050 + bleedPad * 2;

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No se pudo obtener el contexto 2D del Canvas');
  }

  // Draw background image directly if needed, or load SVG via Image
  const img = new Image();
  img.crossOrigin = 'anonymous';

  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Clear with black base for card
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      if (options.withBleed) {
        // Draw card with extra 36px bleed boundary filled by mirrored or scaled edges
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      } else {
        ctx.drawImage(img, 0, 0, 750, 1050);
      }

      URL.revokeObjectURL(url);
      resolve(canvas);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      console.error('Error cargando SVG en Canvas:', e);
      reject(new Error('Error al procesar la imagen de la carta'));
    };
    img.src = url;
  });
}

// Export single card as PNG (750 x 1050 px at 300 DPI, or 822 x 1122 px with 3mm bleed)
export async function exportCardAsPng(
  card: CardData, 
  options: { withBleed?: boolean; showBleedGuides?: boolean } = {}
): Promise<void> {
  const canvas = await renderCardToCanvas(card, options);
  const dataUrl = canvas.toDataURL('image/png');
  
  const safeName = (card.name || 'carta_tumbay')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '_');
  
  const suffix = options.withBleed ? '_sangrado_3mm_300dpi.png' : '_300dpi.png';
  const link = document.createElement('a');
  link.download = `${safeName}${suffix}`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export interface PdfPrintItem {
  card: CardData;
  copies: number;
}

export interface PdfPrintOptions {
  paperSize: 'a4' | 'letter';
  includeCropMarks: boolean;
  cardsPerSheet: 8; // 4 columns x 2 rows
  bleedMm: number; // 0 for exact MTG (63.5 x 88.9 mm)
}

// Generate printable PDF with 8 cards per page (Magic the Gathering standard dimensions: 63.5 x 88.9 mm)
export async function generatePrintPdf(
  items: PdfPrintItem[],
  options: PdfPrintOptions = {
    paperSize: 'a4',
    includeCropMarks: true,
    cardsPerSheet: 8,
    bleedMm: 0,
  },
  onProgress?: (progress: number, message: string) => void
): Promise<void> {
  // Flatten card list according to copies count
  const allCards: CardData[] = [];
  for (const item of items) {
    for (let c = 0; c < item.copies; c++) {
      allCards.push(item.card);
    }
  }

  if (allCards.length === 0) {
    throw new Error('No hay cartas seleccionadas para imprimir');
  }

  onProgress?.(10, 'Renderizando cartas en alta resolución...');

  // Standard Magic Card dimensions in millimeters
  const cardWidthMm = 63.5;
  const cardHeightMm = 88.9;

  // Grid layout: 4 columns x 2 rows = 8 cards per page
  const cols = 4;
  const rows = 2;
  const cardsPerPage = 8;

  // Setup page size in landscape
  // A4: 297 x 210 mm
  // Letter: 279.4 x 215.9 mm
  const isA4 = options.paperSize === 'a4';
  const pageWidthMm = isA4 ? 297.0 : 279.4;
  const pageHeightMm = isA4 ? 210.0 : 215.9;

  const totalGridWidthMm = cols * cardWidthMm; // 254 mm
  const totalGridHeightMm = rows * cardHeightMm; // 177.8 mm

  // Center the 4x2 grid on page
  const startX = (pageWidthMm - totalGridWidthMm) / 2;
  const startY = (pageHeightMm - totalGridHeightMm) / 2;

  // Initialize jsPDF document in landscape orientation
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: options.paperSize === 'a4' ? 'a4' : 'letter',
  });

  // Cache rendered canvases for unique card IDs so we don't render duplicates multiple times
  const cardCanvasCache = new Map<string, string>();

  const totalCards = allCards.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  for (let i = 0; i < totalCards; i++) {
    const card = allCards[i];
    const pageIndex = Math.floor(i / cardsPerPage);
    const indexOnPage = i % cardsPerPage;

    // Add new page if starting a new page (after first page)
    if (i > 0 && indexOnPage === 0) {
      pdf.addPage(options.paperSize === 'a4' ? 'a4' : 'letter', 'landscape');
    }

    const col = indexOnPage % cols;
    const row = Math.floor(indexOnPage / cols);

    const x = startX + col * cardWidthMm;
    const y = startY + row * cardHeightMm;

    // Check canvas cache
    let dataUrl = cardCanvasCache.get(card.id);
    if (!dataUrl) {
      onProgress?.(
        Math.round(10 + (i / totalCards) * 75),
        `Procesando carta ${i + 1} de ${totalCards}: ${card.name}...`
      );
      const canvas = await renderCardToCanvas(card);
      dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      cardCanvasCache.set(card.id, dataUrl);
    }

    // Add card image to PDF at exact Magic card dimensions (63.5 x 88.9 mm)
    pdf.addImage(dataUrl, 'JPEG', x, y, cardWidthMm, cardHeightMm);

    // Optional crop marks around the card
    if (options.includeCropMarks) {
      pdf.setDrawColor(180, 180, 180);
      pdf.setLineWidth(0.15);

      const markLen = 3.5; // 3.5mm crop mark lines

      // Top-left
      pdf.line(x - markLen, y, x, y);
      pdf.line(x, y - markLen, x, y);

      // Top-right
      pdf.line(x + cardWidthMm, y, x + cardWidthMm + markLen, y);
      pdf.line(x + cardWidthMm, y - markLen, x + cardWidthMm, y);

      // Bottom-left
      pdf.line(x - markLen, y + cardHeightMm, x, y + cardHeightMm);
      pdf.line(x, y + cardHeightMm, x, y + cardHeightMm + markLen);

      // Bottom-right
      pdf.line(x + cardWidthMm, y + cardHeightMm, x + cardWidthMm + markLen, y + cardHeightMm);
      pdf.line(x + cardWidthMm, y + cardHeightMm, x + cardWidthMm, y + cardHeightMm + markLen);
    }

    // Header/Footer text on page (only on slot 0 of page)
    if (indexOnPage === 0) {
      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 120);
      pdf.text(
        `Tumbay RPG - Plancha de Impresión 8 Cartas (Página ${pageIndex + 1}/${totalPages}) - Tamaño Magic: 63.5 x 88.9 mm (300 DPI)`,
        startX,
        startY - 4
      );
    }
  }

  onProgress?.(95, 'Generando archivo PDF...');
  
  // Save PDF
  const filename = `Tumbay_Cartas_Imprimir_8xPagina_${new Date().toISOString().slice(0, 10)}.pdf`;
  pdf.save(filename);
  onProgress?.(100, '¡PDF generado exitosamente!');
}
