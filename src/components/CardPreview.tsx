import React, { useRef, useState, useEffect, useCallback } from 'react';
import { CardData } from '../types/card';
import { generateCardSvgMarkup } from '../utils/cardSvgBuilder';
import { 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Move, 
  Scissors, 
  ChevronDown, 
  Gamepad2, 
  Check 
} from 'lucide-react';
import { exportCardAsPng } from '../utils/exportUtils';

interface CardPreviewProps {
  card: CardData;
  onUpdateCard: (updater: (prev: CardData) => CardData) => void;
  onOpenPrintModal: () => void;
  onOpenTabletopModal?: () => void;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  card,
  onUpdateCard,
  onOpenPrintModal,
  onOpenTabletopModal,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(0.48);
  const [isAutoFit, setIsAutoFit] = useState<boolean>(true);
  const [showBleedGuides, setShowBleedGuides] = useState<boolean>(false);
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isDraggingArt, setIsDraggingArt] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [initialOffset, setInitialOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Calculate the exact zoom so the full 750x1050 card is 100% visible inside the viewport
  const handleAutoFit = useCallback(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    if (clientWidth > 0 && clientHeight > 0) {
      // 16px safety margins so card border and outer drop-shadow are completely visible
      const padX = 20;
      const padY = 20;
      const scaleX = Math.max(0.1, (clientWidth - padX) / 750);
      const scaleY = Math.max(0.1, (clientHeight - padY) / 1050);
      const fit = Math.min(scaleX, scaleY);
      const clamped = Math.max(0.2, Math.min(1.0, Number(fit.toFixed(3))));
      setZoomLevel(clamped);
      setIsAutoFit(true);
    }
  }, []);

  // Use ResizeObserver to automatically keep the card 100% visible when container size changes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (isAutoFit) {
        handleAutoFit();
      }
    });

    observer.observe(el);
    handleAutoFit();

    return () => {
      observer.disconnect();
    };
  }, [handleAutoFit, isAutoFit]);

  // When card ID changes, re-fit
  useEffect(() => {
    handleAutoFit();
  }, [card.id, handleAutoFit]);

  // Keyboard shortcuts (App & Preview)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setIsAutoFit(false);
        setZoomLevel(prev => Math.min(1.2, Number((prev + 0.05).toFixed(2))));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setIsAutoFit(false);
        setZoomLevel(prev => Math.max(0.2, Number((prev - 0.05).toFixed(2))));
      } else if (e.key === '0') {
        e.preventDefault();
        handleAutoFit();
      } else if (e.key.toLowerCase() === 'b') {
        setShowBleedGuides(prev => !prev);
      } else if (e.key.toLowerCase() === 'm' || e.key.toLowerCase() === 't') {
        if (onOpenTabletopModal) {
          onOpenTabletopModal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleAutoFit, onOpenTabletopModal]);

  // Auto-measure image dimensions if missing to guarantee uncropped scaling
  useEffect(() => {
    if (card.imageUrl && (!card.imageWidth || !card.imageHeight || !card.imageAspectRatio)) {
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth || 750;
        const h = img.naturalHeight || 1050;
        onUpdateCard(prev => {
          if (prev.imageAspectRatio) return prev;
          return {
            ...prev,
            imageWidth: w,
            imageHeight: h,
            imageAspectRatio: w / h,
          };
        });
      };
      img.src = card.imageUrl;
    }
  }, [card.imageUrl, onUpdateCard]);

  const svgContent = generateCardSvgMarkup(card, { showBleedGuides });

  const handleExportPng = async (withBleed: boolean = false) => {
    try {
      setIsExporting(true);
      setShowExportMenu(false);
      await exportCardAsPng(card, { withBleed });
    } catch (err) {
      console.error(err);
      alert('Hubo un error al exportar la imagen. Intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingArt(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialOffset({ x: card.imageOffsetX, y: card.imageOffsetY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingArt) return;
    const deltaX = (e.clientX - dragStart.x) / zoomLevel;
    const deltaY = (e.clientY - dragStart.y) / zoomLevel;
    
    onUpdateCard(prev => ({
      ...prev,
      imageOffsetX: Math.round(initialOffset.x + deltaX),
      imageOffsetY: Math.round(initialOffset.y + deltaY),
    }));
  };

  const handleMouseUp = () => {
    setIsDraggingArt(false);
  };

  return (
    <div className="flex flex-col items-center justify-between h-full p-2.5 sm:p-3.5 bg-white/95 rounded-3xl border border-slate-200/90 shadow-sm backdrop-blur-sm select-none">
      
      {/* Top action bar: Clean bar with title, status and zoom controls */}
      <div className="shrink-0 w-full flex items-center justify-between mb-2 pb-2 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-800 tracking-wide uppercase flex items-center gap-1.5">
            Vista Previa
          </span>

          {/* Bleed Guide Toggle (Sangrado 3mm) */}
          <button
            type="button"
            onClick={() => setShowBleedGuides(prev => !prev)}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold transition cursor-pointer border ${
              showBleedGuides
                ? 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-200'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Mostrar u ocultar guías de corte y sangrado de 3mm (tecla B)"
          >
            <Scissors className="w-3 h-3 text-red-500" />
            <span>Guías Sangrado</span>
          </button>

          {/* Tabletop Mode Toggle Button */}
          {onOpenTabletopModal && (
            <button
              type="button"
              onClick={onOpenTabletopModal}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition cursor-pointer"
              title="Abrir Vista Inmersiva en Modo Mesa de Juego (tecla M)"
            >
              <Gamepad2 className="w-3 h-3 text-indigo-600" />
              <span className="hidden sm:inline">Modo Mesa</span>
            </button>
          )}
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1 bg-slate-50 p-0.5 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => {
              setIsAutoFit(false);
              setZoomLevel(prev => Math.max(0.2, Number((prev - 0.05).toFixed(2))));
            }}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Reducir zoom (-)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          
          <span className="text-xs font-mono font-bold text-slate-700 px-1 min-w-[3.2rem] text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          
          <button
            onClick={() => {
              setIsAutoFit(false);
              setZoomLevel(prev => Math.min(1.2, Number((prev + 0.05).toFixed(2))));
            }}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-white rounded-lg transition-colors cursor-pointer shadow-2xs"
            title="Aumentar zoom (+)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleAutoFit}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all ml-0.5 cursor-pointer shadow-2xs ${
              isAutoFit 
                ? 'bg-white text-[#df356b] border border-slate-200 font-bold' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-white'
            }`}
            title="Ajustar al 100% para ver la carta entera sin recortes (0)"
          >
            <RotateCcw className="w-3 h-3 text-[#df356b]" />
            <span className="text-[11px] hidden md:inline">Ver Entera</span>
          </button>
        </div>
      </div>

      {/* Main Card Viewport - Always fits the entire 750x1050 card, centers it with zero clipping */}
      <div 
        ref={containerRef}
        className="relative flex-1 w-full flex items-center justify-center overflow-auto min-h-0 py-1"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="relative transition-all duration-100 shadow-2xl rounded-[36px] cursor-grab active:cursor-grabbing group bg-black shrink-0 select-none my-auto"
          style={{
            width: `${Math.round(750 * zoomLevel)}px`,
            height: `${Math.round(1050 * zoomLevel)}px`,
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.55), 0 10px 20px -5px rgba(0, 0, 0, 0.35)',
          }}
          onMouseDown={handleMouseDown}
          title="Arrastra para mover la ilustración dentro de la carta"
        >
          {/* SVG Card scaled to fit perfectly within bounding container */}
          <div 
            style={{
              width: '750px',
              height: '1050px',
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
            }}
            dangerouslySetInnerHTML={{ __html: svgContent }} 
          />

          {/* Drag hint overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-95 transition-opacity bg-slate-900/90 text-white text-xs font-medium px-3.5 py-1.5 rounded-full border border-slate-700 pointer-events-none flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
            <Move className="w-3.5 h-3.5 text-[#ebd08c]" />
            Arrastra para encuadrar la imagen
          </div>
        </div>
      </div>

      {/* Compact Status & Quick Action Bar */}
      <div className="shrink-0 w-full mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
        <div className="truncate text-slate-600 flex items-center gap-1.5 min-w-0">
          <span className="font-bold text-slate-900 truncate">{card.name}</span>
          <span className="text-[#ebd08c] font-black shrink-0">{'★'.repeat(card.rarityStars)}</span>
          <span className="text-slate-300 hidden sm:inline shrink-0">·</span>
          <span className="text-[#df356b] font-medium truncate hidden sm:inline text-[11px]">
            {card.illustratorName ? `Ilus: ${card.illustratorName}` : (card.authorName ? `Autor: ${card.authorName}` : 'Papa Tumbay')}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 relative">
          {/* Export PNG with Options Dropdown */}
          <div className="relative">
            <div className="inline-flex rounded-xl shadow-xs">
              <button
                onClick={() => handleExportPng(false)}
                disabled={isExporting}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-l-xl font-bold text-xs text-white bg-[#df356b] hover:bg-[#c9245a] active:scale-98 transition disabled:opacity-50 cursor-pointer"
                title="Descargar carta actual en PNG a 300 DPI"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isExporting ? 'Exportando...' : 'PNG 300DPI'}</span>
              </button>
              <button
                onClick={() => setShowExportMenu(prev => !prev)}
                className="px-1.5 py-1.5 rounded-r-xl text-white bg-[#c9245a] hover:bg-[#b01f4e] border-l border-white/20 transition cursor-pointer"
                title="Opciones de exportación (con sangrado)"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {showExportMenu && (
              <div className="absolute right-0 bottom-full mb-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-1.5 z-50 text-xs">
                <button
                  onClick={() => handleExportPng(false)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition cursor-pointer flex flex-col"
                >
                  <span className="font-bold text-slate-900">PNG Estándar (300 DPI)</span>
                  <span className="text-[11px] text-slate-500">750 × 1050 px · Tamaño exacto</span>
                </button>
                <button
                  onClick={() => handleExportPng(true)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 transition cursor-pointer flex flex-col"
                >
                  <span className="font-bold text-[#df356b]">PNG con Sangrado 3mm</span>
                  <span className="text-[11px] text-slate-500">822 × 1122 px · Ideal imprentas RPG</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick PDF 8-Card Modal */}
          <button
            onClick={onOpenPrintModal}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-bold text-xs text-slate-800 bg-[#ebd08c]/40 hover:bg-[#ebd08c]/70 border border-[#ebd08c] active:scale-98 transition cursor-pointer shadow-2xs"
            title="Generar plancha de 8 cartas en PDF para imprimir"
          >
            <Printer className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Plancha PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
