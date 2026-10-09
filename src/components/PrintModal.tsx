import React, { useState } from 'react';
import { CardData } from '../types/card';
import { generatePrintPdf, PdfPrintItem, PdfPrintOptions } from '../utils/exportUtils';
import { PorzuuLogo } from './PorzuuLogo';
import { 
  X, 
  Printer, 
  FileText, 
  Scissors, 
  Check, 
  Sparkles, 
  Layers, 
  Plus, 
  Minus,
  AlertCircle
} from 'lucide-react';

interface PrintModalProps {
  currentCard: CardData;
  savedDeck: CardData[];
  isOpen: boolean;
  onClose: () => void;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  currentCard,
  savedDeck,
  isOpen,
  onClose,
}) => {
  const [paperSize, setPaperSize] = useState<'a4' | 'letter'>('a4');
  const [includeCropMarks, setIncludeCropMarks] = useState<boolean>(true);
  const [includeBleed, setIncludeBleed] = useState<boolean>(false);
  const [printMode, setPrintMode] = useState<'single8' | 'customDeck'>('single8');
  
  const [deckQuantities, setDeckQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = { [currentCard.id]: 8 };
    savedDeck.forEach(c => {
      if (initial[c.id] === undefined) {
        initial[c.id] = 1;
      }
    });
    return initial;
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [progressMsg, setProgressMsg] = useState<string>('');

  if (!isOpen) return null;

  let printItems: PdfPrintItem[] = [];
  if (printMode === 'single8') {
    printItems = [{ card: currentCard, copies: 8 }];
  } else {
    const cardMap = new Map<string, CardData>();
    cardMap.set(currentCard.id, currentCard);
    savedDeck.forEach(c => cardMap.set(c.id, c));

    cardMap.forEach((card, id) => {
      const count = deckQuantities[id] || 0;
      if (count > 0) {
        printItems.push({ card, copies: count });
      }
    });
  }

  const totalCardCopies = printItems.reduce((acc, curr) => acc + curr.copies, 0);
  const totalSheets = Math.ceil(totalCardCopies / 8);

  const handleUpdateQty = (id: string, delta: number) => {
    setDeckQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleGeneratePdf = async () => {
    if (totalCardCopies === 0) {
      alert('Debes seleccionar al menos 1 carta para imprimir.');
      return;
    }

    try {
      setIsGenerating(true);
      setProgress(5);
      setProgressMsg('Iniciando generador de plancha...');

      const options: PdfPrintOptions = {
        paperSize,
        includeCropMarks,
        cardsPerSheet: 8,
        bleedMm: includeBleed ? 3 : 0,
      };

      await generatePrintPdf(printItems, options, (prog, msg) => {
        setProgress(prog);
        setProgressMsg(msg);
      });

      setTimeout(() => {
        setIsGenerating(false);
        onClose();
      }, 800);
    } catch (err) {
      console.error(err);
      alert('Error al generar el PDF. Verifica que las imágenes carguen correctamente.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#f9f9fb]">
          <div className="flex items-center gap-3">
            <PorzuuLogo size={38} />
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Plancha de Impresión (8 Cartas / Hoja)
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#df356b]/10 text-[#df356b] border border-[#df356b]/20">
                  Estándar Magic (63.5 × 88.9 mm)
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Impresión a 300 DPI con marcas de corte precisas.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Print Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPrintMode('single8')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer shadow-xs ${
                printMode === 'single8'
                  ? 'bg-[#df356b]/5 border-[#df356b] ring-2 ring-[#df356b]/30'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-slate-900">
                  1 Hoja Completa (8 Copias)
                </span>
                {printMode === 'single8' && (
                  <Check className="w-4 h-4 text-[#df356b] stroke-[3]" />
                )}
              </div>
              <p className="text-xs text-slate-600">
                Imprime una hoja con 8 copias idénticas de la carta actual: <strong className="text-[#df356b]">{currentCard.name}</strong>.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setPrintMode('customDeck')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer shadow-xs ${
                printMode === 'customDeck'
                  ? 'bg-[#df356b]/5 border-[#df356b] ring-2 ring-[#df356b]/30'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-slate-900">
                  Mazo / Selección de Cartas
                </span>
                {printMode === 'customDeck' && (
                  <Check className="w-4 h-4 text-[#df356b] stroke-[3]" />
                )}
              </div>
              <p className="text-xs text-slate-600">
                Selecciona diferentes cartas de tu colección y especifica cuántas copias imprimir de cada una en la cuadrícula de 8.
              </p>
            </button>
          </div>

          {/* Sheet Preview & Specs */}
          <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#df356b]" />
                Esquema de la Plancha (4 columnas × 2 filas)
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {paperSize.toUpperCase()} Paisaje · 8 cartas por página
              </span>
            </div>

            {/* Visual Mini 4x2 Grid */}
            <div className="w-full bg-white rounded-xl p-3 border border-slate-200 shadow-2xs">
              <div className="grid grid-cols-4 gap-2 aspect-[297/210] max-h-48 mx-auto p-2 bg-[#f4f5f7] rounded-lg border border-dashed border-slate-300">
                {[0, 1, 2, 3, 4, 5, 6, 7].map(slotIdx => {
                  return (
                    <div
                      key={slotIdx}
                      className="border border-[#ebd08c] bg-white rounded flex flex-col items-center justify-center p-1 text-center shadow-2xs"
                    >
                      <span className="text-[10px] font-mono font-bold text-[#df356b]">
                        #{slotIdx + 1}
                      </span>
                      <span className="text-[9px] text-slate-500 leading-none mt-0.5 font-medium">
                        63.5×88.9mm
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <span>Total de cartas: <strong className="text-slate-900 font-bold">{totalCardCopies}</strong></span>
              <span>Hojas necesarias: <strong className="text-[#df356b] font-bold">{totalSheets} {totalSheets === 1 ? 'página' : 'páginas'}</strong></span>
            </div>
          </div>

          {/* Custom Deck Selector */}
          {printMode === 'customDeck' && (
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#df356b]" />
                  Cartas Disponibles y Cantidad de Copias
                </label>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {/* Current Card */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-10 rounded bg-slate-900 border border-slate-300 overflow-hidden flex-shrink-0">
                      <img src={currentCard.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {currentCard.name} (Actual)
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {currentCard.category.toUpperCase()} · {currentCard.rarityStars}★
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => handleUpdateQty(currentCard.id, -1)}
                      className="p-1 text-slate-500 hover:text-slate-900 transition rounded"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-xs font-mono font-bold text-[#df356b]">
                      {deckQuantities[currentCard.id] || 0}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleUpdateQty(currentCard.id, 1)}
                      className="p-1 text-slate-500 hover:text-slate-900 transition rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Saved Deck Cards */}
                {savedDeck.map(savedCard => {
                  if (savedCard.id === currentCard.id) return null;
                  const qty = deckQuantities[savedCard.id] || 0;
                  return (
                    <div key={savedCard.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-10 rounded bg-slate-900 border border-slate-300 overflow-hidden flex-shrink-0">
                          <img src={savedCard.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            {savedCard.name}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {savedCard.category.toUpperCase()} · {savedCard.rarityStars}★
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200 shadow-2xs">
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(savedCard.id, -1)}
                          className="p-1 text-slate-500 hover:text-slate-900 transition rounded"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-[#df356b]">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQty(savedCard.id, 1)}
                          className="p-1 text-slate-500 hover:text-slate-900 transition rounded"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Print Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Tamaño de Papel
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaperSize('a4')}
                  className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition cursor-pointer ${
                    paperSize === 'a4'
                      ? 'bg-[#df356b] text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  A4
                </button>
                <button
                  type="button"
                  onClick={() => setPaperSize('letter')}
                  className={`py-2 px-2 text-center rounded-lg text-xs font-bold transition cursor-pointer ${
                    paperSize === 'letter'
                      ? 'bg-[#df356b] text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Letter
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="block text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-[#df356b]" />
                  Guías de Corte
                </span>
                <span className="text-[11px] text-slate-500">
                  Marcas en esquinas
                </span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCropMarks}
                  onChange={e => setIncludeCropMarks(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#df356b]"></div>
              </label>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="block text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Scissors className="w-3.5 h-3.5 text-red-500" />
                  Sangrado (3mm)
                </span>
                <span className="text-[11px] text-slate-500">
                  Margen imprenta profesional
                </span>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBleed}
                  onChange={e => setIncludeBleed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#df356b]"></div>
              </label>
            </div>
          </div>

          {/* Progress Indicator */}
          {isGenerating && (
            <div className="p-4 rounded-xl bg-[#df356b]/10 border border-[#df356b]/30 space-y-2">
              <div className="flex justify-between text-xs text-[#df356b] font-bold">
                <span>{progressMsg}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#df356b] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-100 flex items-center justify-between bg-[#f9f9fb]">
          <button
            type="button"
            onClick={onClose}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleGeneratePdf}
            disabled={isGenerating || totalCardCopies === 0}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-[#df356b] hover:bg-[#c9245a] active:scale-98 transition shadow-md shadow-[#df356b]/20 disabled:opacity-50 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            {isGenerating ? 'Generando PDF...' : `Descargar PDF (${totalCardCopies} cartas / ${totalSheets} hojas)`}
          </button>
        </div>

      </div>
    </div>
  );
};
