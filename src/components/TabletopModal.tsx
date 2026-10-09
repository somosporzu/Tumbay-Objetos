import React, { useState, useEffect } from 'react';
import { CardData } from '../types/card';
import { generateCardSvgMarkup } from '../utils/cardSvgBuilder';
import { 
  X, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Scissors, 
  ChevronLeft, 
  ChevronRight, 
  Download,
  Gamepad2,
  Sparkles
} from 'lucide-react';
import { exportCardAsPng } from '../utils/exportUtils';

interface TabletopModalProps {
  card: CardData;
  deck: CardData[];
  isOpen: boolean;
  onClose: () => void;
  onSelectCard: (card: CardData) => void;
}

export const TabletopModal: React.FC<TabletopModalProps> = ({
  card,
  deck,
  isOpen,
  onClose,
  onSelectCard,
}) => {
  const [zoom, setZoom] = useState<number>(0.65);
  const [showBleedGuides, setShowBleedGuides] = useState<boolean>(false);
  const [matStyle, setMatStyle] = useState<'neoprene' | 'wood' | 'slate'>('neoprene');

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const idx = deck.findIndex(c => c.id === card.id);
        if (idx > 0) {
          onSelectCard(deck[idx - 1]);
        } else if (deck.length > 0) {
          onSelectCard(deck[deck.length - 1]);
        }
      } else if (e.key === 'ArrowRight') {
        const idx = deck.findIndex(c => c.id === card.id);
        if (idx >= 0 && idx < deck.length - 1) {
          onSelectCard(deck[idx + 1]);
        } else if (deck.length > 0) {
          onSelectCard(deck[0]);
        }
      } else if (e.key === 'b') {
        setShowBleedGuides(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, card.id, deck, onClose, onSelectCard]);

  if (!isOpen) return null;

  const currentIdx = deck.findIndex(c => c.id === card.id);
  const svgMarkup = generateCardSvgMarkup(card, { showBleedGuides });

  const getMatBgClass = () => {
    switch (matStyle) {
      case 'wood':
        return 'bg-[#18110b] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d1b10] via-[#1a0f08] to-[#0c0704]';
      case 'slate':
        return 'bg-[#0b0f19] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e293b] via-[#0f172a] to-[#020617]';
      case 'neoprene':
      default:
        return 'bg-[#121417] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#22272e] via-[#14171c] to-[#0b0c0e]';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden select-none animate-in fade-in duration-200">
      
      {/* Tabletop Playmat Background */}
      <div className={`absolute inset-0 transition-colors duration-500 ${getMatBgClass()}`} />

      {/* Ambient Playmat Lighting Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.85) 85%)',
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full px-4 sm:px-6 py-3 flex items-center justify-between bg-black/50 backdrop-blur-md border-b border-white/10 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#df356b]/20 border border-[#df356b]/40 flex items-center justify-center text-[#df356b]">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold flex items-center gap-2">
              Modo Mesa de Juego
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-normal">
                Apoyo Visual RPG
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Inspección inmersiva de carta en mesa · Usa ← y → para cambiar de carta
            </p>
          </div>
        </div>

        {/* Playmat Surface Switcher & Bleed Toggle */}
        <div className="flex items-center gap-2">
          {/* Mat Surface style */}
          <div className="hidden md:flex items-center bg-black/40 rounded-xl p-0.5 border border-white/10 text-xs">
            <button
              onClick={() => setMatStyle('neoprene')}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                matStyle === 'neoprene' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Neopreno
            </button>
            <button
              onClick={() => setMatStyle('wood')}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                matStyle === 'wood' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Madera
            </button>
            <button
              onClick={() => setMatStyle('slate')}
              className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                matStyle === 'slate' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pizarra
            </button>
          </div>

          {/* Bleed guides toggle */}
          <button
            onClick={() => setShowBleedGuides(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition cursor-pointer ${
              showBleedGuides
                ? 'bg-red-500/20 text-red-300 border-red-500/50'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
            title="Alternar guías de corte y sangrado de 3mm (tecla B)"
          >
            <Scissors className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Guías 3mm</span>
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer border border-white/10"
            title="Salir del Modo Mesa (Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Interactive Tabletop Canvas */}
      <main className="relative z-10 flex-1 w-full flex items-center justify-center p-4 overflow-auto min-h-0">
        
        {/* Previous Card Arrow */}
        {deck.length > 1 && (
          <button
            onClick={() => {
              const prevIdx = currentIdx > 0 ? currentIdx - 1 : deck.length - 1;
              onSelectCard(deck[prevIdx]);
            }}
            className="absolute left-4 z-20 p-3 rounded-2xl bg-black/60 hover:bg-black/80 text-white border border-white/15 backdrop-blur-md shadow-2xl transition cursor-pointer hover:scale-105 active:scale-95"
            title="Carta anterior (←)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Floating Card Container with Realistic Tabletop Shadow */}
        <div 
          className="relative transition-all duration-150 rounded-[36px] bg-black shadow-2xl shrink-0 my-auto"
          style={{
            width: `${Math.round(750 * zoom)}px`,
            height: `${Math.round(1050 * zoom)}px`,
            boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.85), 0 18px 36px -18px rgba(0, 0, 0, 0.95)',
          }}
        >
          <div 
            style={{
              width: '750px',
              height: '1050px',
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
            }}
            dangerouslySetInnerHTML={{ __html: svgMarkup }} 
          />
        </div>

        {/* Next Card Arrow */}
        {deck.length > 1 && (
          <button
            onClick={() => {
              const nextIdx = currentIdx < deck.length - 1 ? currentIdx + 1 : 0;
              onSelectCard(deck[nextIdx]);
            }}
            className="absolute right-4 z-20 p-3 rounded-2xl bg-black/60 hover:bg-black/80 text-white border border-white/15 backdrop-blur-md shadow-2xl transition cursor-pointer hover:scale-105 active:scale-95"
            title="Siguiente carta (→)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </main>

      {/* Bottom Bar: Quick Deck Info, Zoom & Navigation */}
      <footer className="relative z-10 w-full px-4 sm:px-6 py-2.5 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-between text-white text-xs gap-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-sm truncate">
            {card.name}
          </span>
          <span className="text-[#ebd08c] font-black">
            {'★'.repeat(card.rarityStars)}
          </span>
          {deck.length > 0 && (
            <span className="text-slate-400 font-mono text-[11px] bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
              {currentIdx >= 0 ? currentIdx + 1 : 1} de {deck.length} cartas
            </span>
          )}
        </div>

        {/* Bottom Zoom & Actions */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-white/10 rounded-xl p-0.5 border border-white/10">
            <button
              onClick={() => setZoom(prev => Math.max(0.3, Number((prev - 0.05).toFixed(2))))}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg transition cursor-pointer"
              title="Reducir zoom"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono font-bold text-slate-200 px-2 text-[11px] min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(prev => Math.min(1.1, Number((prev + 0.05).toFixed(2))))}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg transition cursor-pointer"
              title="Aumentar zoom"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(0.65)}
              className="px-2 py-1 text-[11px] font-semibold text-[#ebd08c] hover:bg-white/10 rounded-lg transition cursor-pointer"
              title="Zoom normal"
            >
              Reajustar
            </button>
          </div>

          {/* Quick PNG download */}
          <button
            onClick={() => exportCardAsPng(card)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs bg-[#df356b] hover:bg-[#c9245a] text-white transition cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PNG 300DPI</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
