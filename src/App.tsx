import React, { useState, useEffect } from 'react';
import { CardData, ItemCategory } from './types/card';
import { 
  INITIAL_CARD_DATA, 
  SAMPLE_ARTWORKS, 
  COLOR_PALETTES, 
  CATEGORY_INFO 
} from './constants/presets';
import { CardPreview } from './components/CardPreview';
import { GeneralTab } from './components/EditorPanels/GeneralTab';
import { ImageTab } from './components/EditorPanels/ImageTab';
import { TextTab } from './components/EditorPanels/TextTab';
import { PaletteTab } from './components/EditorPanels/PaletteTab';
import { CollectionTab } from './components/EditorPanels/CollectionTab';
import { PrintModal } from './components/PrintModal';
import { TabletopModal } from './components/TabletopModal';
import { PorzuuLogo } from './components/PorzuuLogo';
import { 
  Sparkles, 
  Layers, 
  Image as ImageIcon, 
  Type, 
  Palette, 
  Download, 
  Printer, 
  FolderHeart,
  Eye,
  Gamepad2
} from 'lucide-react';
import { exportCardAsPng } from './utils/exportUtils';

// Seed deck with 8 varied cards ready for an immediate 8-card print sheet
const SEED_DECK: CardData[] = [
  INITIAL_CARD_DATA,
  {
    ...INITIAL_CARD_DATA,
    id: 'seed-card-2',
    name: 'Cuchilla de las Estrellas',
    title: 'Cuchilla de las Estrellas',
    category: 'arma',
    rarityStars: 5,
    imageUrl: SAMPLE_ARTWORKS[1].url,
    palette: COLOR_PALETTES[0], // Papa Tumbay Oficial
    description: 'Imbuida con el polvo de meteoros caídos en el Valle de Tumbay. Al asestar un golpe crítico, el objetivo queda cegado por un destello astral durante 1 turno.',
    lore: 'Su filo nunca se desgasta mientras la luz de las estrellas toque su acero. - Herrería de Antares',
    authorName: 'Porzu',
  },
  {
    ...INITIAL_CARD_DATA,
    id: 'seed-card-3',
    name: 'Amuleto de las Aguas',
    title: 'Amuleto de las Aguas',
    category: 'accesorio',
    rarityStars: 3,
    imageUrl: SAMPLE_ARTWORKS[0].url,
    palette: COLOR_PALETTES[1], // Estilo Pumba
    description: 'Tallado en piedra de río bendecida por los chamanes de Tumbay. Otorga resistencia al cansancio y purifica cualquier líquido que toque.',
    lore: 'El murmullo del agua acompaña siempre a quien lo lleva al cuello.',
    authorName: 'Porzu',
  },
  {
    ...INITIAL_CARD_DATA,
    id: 'seed-card-4',
    name: 'Poción de Niebla Lunar',
    title: 'Poción de Niebla Lunar',
    category: 'pocion',
    rarityStars: 2,
    imageUrl: SAMPLE_ARTWORKS[2].url,
    palette: COLOR_PALETTES[2], // Rosa Porzuu & Ceniza
    description: 'El bebedor exhala una densa cortina de vapor plateado que oculta su silueta, otorgándole ventaja en todas las pruebas de sigilo y evasión.',
    lore: 'Destilada a la medianoche con hojas de sauce blanco y rocío subterráneo.',
    authorName: 'Porzu',
  },
  {
    ...INITIAL_CARD_DATA,
    id: 'seed-card-5',
    name: 'Escudo del Guardián',
    title: 'Escudo del Guardián',
    category: 'armadura',
    rarityStars: 3,
    imageUrl: SAMPLE_ARTWORKS[1].url,
    palette: COLOR_PALETTES[5], // Acero & Grafito
    description: 'Forjado con placas de roble fósil reforzado con acero estelar. Reduce 2 puntos de todo el daño físico no mágico recibido.',
    lore: 'Portado con honor en las murallas de las fortalezas septentrionales.',
    authorName: 'Porzu',
  },
  {
    ...INITIAL_CARD_DATA,
    id: 'seed-card-6',
    name: 'Pergamino de Destierro',
    title: 'Pergamino de Destierro',
    category: 'pergamino',
    rarityStars: 4,
    imageUrl: SAMPLE_ARTWORKS[0].url,
    palette: COLOR_PALETTES[3], // Carbón & Oro Imperial
    description: 'Pronuncia la palabra rúnica para rasgar el tejido planar. Cualquier criatura invocada o espiritual debe superar una tirada de Voluntad o ser expulsada.',
    lore: 'Trazado con tinta de calamar abisal y bendecido por la Alta Orden.',
    authorName: 'Porzu',
  },
  {
    ...INITIAL_CARD_DATA,
    id: 'seed-card-7',
    name: 'Anillo del Ojo Astral',
    title: 'Anillo del Ojo Astral',
    category: 'accesorio',
    rarityStars: 4,
    imageUrl: SAMPLE_ARTWORKS[2].url,
    palette: COLOR_PALETTES[0],
    description: 'Permite al portador percibir corrientes invisibles de maná y seres etéreos en la penumbra. Una vez por descanso largo, revela puertas secretas.',
    lore: 'La gema en el engaste parece parpadear cuando nadie la mira.',
    authorName: 'Porzu',
  },
  {
    ...INITIAL_CARD_DATA,
    id: 'seed-card-8',
    name: 'Lanza del Cazador Ancestral',
    title: 'Lanza del Cazador',
    category: 'arma',
    rarityStars: 5,
    imageUrl: SAMPLE_ARTWORKS[1].url,
    palette: COLOR_PALETTES[1],
    description: 'Tallada con asta de bestia titánica. Puede arrojarse con alcance duplicado y regresa a la mano de su dueño con un chasquido rúnico.',
    lore: 'Testigo del esplendor del primer imperio de Tumbay.',
    authorName: 'Porzu',
  },
];

type ActiveTab = 'general' | 'image' | 'text' | 'palette' | 'collection';

export default function App() {
  const [deck, setDeck] = useState<CardData[]>(() => {
    try {
      const saved = localStorage.getItem('tumbay_card_deck');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(c => {
            const matchedPalette = COLOR_PALETTES.find(p => p.id === c.palette?.id) || COLOR_PALETTES[0];
            return {
              ...c,
              circlePosY: 93,
              rightCrossSize: 22.2,
              showDividerFlourish: c.showDividerFlourish ?? true,
              autoAdjustText: c.autoAdjustText ?? true,
              showRarityBorder: false,
              showOrnamentTopLeft: false,
              showHorizontalStars: false,
              titleAlign: c.titleAlign ?? 'left',
              titleOffsetY: c.titleOffsetY ?? 0,
              illustratorName: c.illustratorName ?? '',
              imageFit: c.imageFit ?? 'cover',
              imageWidth: c.imageWidth ?? 750,
              imageHeight: c.imageHeight ?? 1050,
              imageAspectRatio: c.imageAspectRatio ?? (750 / 1050),
              palette: matchedPalette,
            };
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
    return SEED_DECK;
  });

  const [currentCard, setCurrentCard] = useState<CardData>(() => {
    const savedActiveId = typeof window !== 'undefined' ? localStorage.getItem('tumbay_active_card_id') : null;
    const found = savedActiveId ? deck.find(c => c.id === savedActiveId) : null;
    const first = found || deck[0] || INITIAL_CARD_DATA;
    const matchedPalette = COLOR_PALETTES.find(p => p.id === first.palette?.id) || COLOR_PALETTES[0];
    return {
      ...first,
      circlePosY: 93,
      rightCrossSize: 22.2,
      showDividerFlourish: first.showDividerFlourish ?? true,
      autoAdjustText: first.autoAdjustText ?? true,
      showRarityBorder: false,
      showOrnamentTopLeft: false,
      showHorizontalStars: false,
      titleAlign: first.titleAlign ?? 'left',
      titleOffsetY: first.titleOffsetY ?? 0,
      illustratorName: first.illustratorName ?? '',
      imageFit: first.imageFit ?? 'cover',
      imageWidth: first.imageWidth ?? 750,
      imageHeight: first.imageHeight ?? 1050,
      imageAspectRatio: first.imageAspectRatio ?? (750 / 1050),
      palette: matchedPalette,
    };
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>('general');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isTabletopOpen, setIsTabletopOpen] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('Autoguardado en LocalStorage');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('tumbay_card_deck', JSON.stringify(deck));
    } catch (e) {
      console.error('Error guardando mazo en localStorage:', e);
    }
  }, [deck]);

  useEffect(() => {
    try {
      localStorage.setItem('tumbay_active_card_id', currentCard.id);
    } catch (e) {
      console.error(e);
    }
  }, [currentCard.id]);

  const handleUpdateCard = (updater: (prev: CardData) => CardData) => {
    setCurrentCard(prev => {
      const updated = updater(prev);
      setDeck(prevDeck => {
        const exists = prevDeck.some(c => c.id === updated.id);
        const nextDeck = exists
          ? prevDeck.map(c => (c.id === updated.id ? updated : c))
          : [updated, ...prevDeck];
        try {
          localStorage.setItem('tumbay_card_deck', JSON.stringify(nextDeck));
        } catch (e) {
          console.error('Error guardando mazo en localStorage:', e);
        }
        return nextDeck;
      });
      return updated;
    });

    setIsSaving(true);
    setSaveStatus('Guardando...');
    const timer = setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('Autoguardado en LocalStorage');
    }, 400);
    return () => clearTimeout(timer);
  };

  const handleSelectCard = (selected: CardData) => {
    setCurrentCard(selected);
    try {
      localStorage.setItem('tumbay_active_card_id', selected.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDuplicateCard = (cardToDup: CardData) => {
    const dup: CardData = {
      ...cardToDup,
      id: `card-${Date.now()}`,
      name: `${cardToDup.name} (Copia)`,
      title: `${cardToDup.title} (Copia)`,
    };
    setDeck(prev => {
      const nextDeck = [...prev, dup];
      try {
        localStorage.setItem('tumbay_card_deck', JSON.stringify(nextDeck));
        localStorage.setItem('tumbay_active_card_id', dup.id);
      } catch (e) {
        console.error(e);
      }
      return nextDeck;
    });
    setCurrentCard(dup);
  };

  const handleDeleteCard = (id: string) => {
    if (deck.length <= 1) {
      alert('Debes mantener al menos una carta en la colección.');
      return;
    }
    const newDeck = deck.filter(c => c.id !== id);
    setDeck(newDeck);
    try {
      localStorage.setItem('tumbay_card_deck', JSON.stringify(newDeck));
    } catch (e) {
      console.error(e);
    }
    if (currentCard.id === id) {
      const fallback = newDeck[0];
      setCurrentCard(fallback);
      try {
        localStorage.setItem('tumbay_active_card_id', fallback.id);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleNewCard = (category: ItemCategory = 'objeto') => {
    const newCard: CardData = {
      ...INITIAL_CARD_DATA,
      id: `card-${Date.now()}`,
      name: `Nuevo ${CATEGORY_INFO[category]?.label || category}`,
      title: `Nuevo ${CATEGORY_INFO[category]?.label || category}`,
      category,
      imageUrl: SAMPLE_ARTWORKS[0].url,
    };
    setDeck(prev => {
      const nextDeck = [...prev, newCard];
      try {
        localStorage.setItem('tumbay_card_deck', JSON.stringify(nextDeck));
        localStorage.setItem('tumbay_active_card_id', newCard.id);
      } catch (e) {
        console.error(e);
      }
      return nextDeck;
    });
    setCurrentCard(newCard);
    setActiveTab('general');
  };

  const handleImportDeck = (importedCards: CardData[]) => {
    setDeck(importedCards);
    if (importedCards.length > 0) {
      setCurrentCard(importedCards[0]);
      try {
        localStorage.setItem('tumbay_card_deck', JSON.stringify(importedCards));
        localStorage.setItem('tumbay_active_card_id', importedCards[0].id);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-[#2c2e30] flex flex-col font-sans">
      
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 border-b border-slate-200/90 backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-2xs">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#df356b]/10 border border-[#df356b]/20 flex items-center justify-center shadow-xs">
              <PorzuuLogo size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-wide text-[#2c2e30] font-serif">
                  PAPA TUMBAY
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#df356b] text-white">
                  CARD FORGE
                </span>
                <div className="hidden md:flex items-center -space-x-1 ml-1" title="Paleta Oficial Papa Tumbay">
                  <div className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: '#c57375' }} />
                  <div className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: '#ebd08c' }} />
                  <div className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: '#2c2e30' }} />
                  <div className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: '#7f8285' }} />
                  <div className="w-3.5 h-3.5 rounded-full border border-white" style={{ backgroundColor: '#df356b' }} />
                </div>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Maquetador de cartas RPG · Placa PUMBA · Siluetas Game-Icons · 750 × 1050 px @ 300 DPI
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTabletopOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer shadow-2xs"
              title="Abrir vista inmersiva de juego en Modo Mesa (tecla M)"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#ebd08c]" />
              <span className="hidden sm:inline">Modo Mesa</span>
            </button>

            <button
              onClick={() => exportCardAsPng(currentCard)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#df356b] text-white hover:bg-[#c9245a] transition cursor-pointer shadow-sm shadow-[#df356b]/20"
              title="Descargar carta actual en PNG a 300 DPI"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">PNG (300 DPI)</span>
            </button>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition cursor-pointer shadow-2xs"
              title="Generar plancha de 8 cartas en PDF para imprimir"
            >
              <Printer className="w-3.5 h-3.5 text-[#df356b]" />
              <span>Plancha 8 PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-4 lg:p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
        
        {/* Left Column: Live Card Preview - ALWAYS CONSTANT & FIXED IN VIEW */}
        <div id="card-preview-container" className="lg:col-span-5 xl:col-span-5 2xl:col-span-5 lg:sticky lg:top-[4.25rem] h-[520px] sm:h-[620px] lg:h-[calc(100vh-5.5rem)] z-20 flex flex-col">
          <CardPreview
            card={currentCard}
            onUpdateCard={handleUpdateCard}
            onOpenPrintModal={() => setIsPrintModalOpen(true)}
            onOpenTabletopModal={() => setIsTabletopOpen(true)}
          />
        </div>

        {/* Right Column: Tabbed Editor Controls - INDEPENDENT SCROLL */}
        <div className="lg:col-span-7 xl:col-span-7 2xl:col-span-7 bg-white/95 border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm backdrop-blur-sm lg:h-[calc(100vh-5.5rem)] flex flex-col">
          
          {/* Tabs Navigation Bar (Fixed at top of editor) */}
          <div className="shrink-0 flex overflow-x-auto border-b border-slate-100 bg-[#f9f9fb] p-1.5 gap-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('general')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'general'
                  ? 'bg-white text-[#df356b] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#df356b]" />
              Identidad & Icono
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('image')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'image'
                  ? 'bg-white text-[#df356b] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#df356b]" />
              Ilustración
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-white text-[#df356b] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Type className="w-3.5 h-3.5 text-[#df356b]" />
              Textos & Expansión
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('palette')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'palette'
                  ? 'bg-white text-[#df356b] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-[#df356b]" />
              Paleta & Bordes
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('collection')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ml-auto ${
                activeTab === 'collection'
                  ? 'bg-white text-[#df356b] shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FolderHeart className="w-3.5 h-3.5 text-[#df356b]" />
              Mazo ({deck.length})
            </button>
          </div>

          {/* Active Tab Panel Body (Scrolls smoothly without moving the card preview) */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 min-h-0">
            {activeTab === 'general' && (
              <GeneralTab card={currentCard} onChange={handleUpdateCard} />
            )}

            {activeTab === 'image' && (
              <ImageTab card={currentCard} onChange={handleUpdateCard} />
            )}

            {activeTab === 'text' && (
              <TextTab card={currentCard} onChange={handleUpdateCard} />
            )}

            {activeTab === 'palette' && (
              <PaletteTab card={currentCard} onChange={handleUpdateCard} />
            )}

            {activeTab === 'collection' && (
              <CollectionTab
                currentCard={currentCard}
                deck={deck}
                onSelectCard={handleSelectCard}
                onDuplicateCard={handleDuplicateCard}
                onDeleteCard={handleDeleteCard}
                onNewCard={handleNewCard}
                onImportDeck={handleImportDeck}
              />
            )}
          </div>

          {/* Bottom Card Navigation Bar (Fixed at bottom of editor) */}
          <div className="shrink-0 px-6 py-3.5 bg-[#f9f9fb] border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Editando:</span>
              <span className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
                {currentCard.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 shadow-2xs">
                <span className={`w-2 h-2 rounded-full ${isSaving ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
                <span>{saveStatus}</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* Mobile Floating Quick View Card Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-30">
        <button
          onClick={() => {
            const previewEl = document.getElementById('card-preview-container');
            if (previewEl) {
              previewEl.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#df356b] text-white font-bold text-xs shadow-lg shadow-[#df356b]/30 active:scale-95 transition-all cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>Ver Carta</span>
        </button>
      </div>

      {/* 8-Card PDF Generator Modal */}
      <PrintModal
        currentCard={currentCard}
        savedDeck={deck}
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />

      {/* Tabletop Inspection Modal (Modo Mesa de Juego) */}
      <TabletopModal
        card={currentCard}
        deck={deck}
        isOpen={isTabletopOpen}
        onClose={() => setIsTabletopOpen(false)}
        onSelectCard={handleSelectCard}
      />

      {/* Footer Info */}
      <footer className="mt-auto border-t border-slate-200 bg-white/70 py-4 px-6 text-center text-xs text-slate-500 font-medium">
        <p>
          Sistema PAPA TUMBAY · Placa de Título PUMBA · Siluetas RPG Game-Icons · 750 × 1050 px @ 300 DPI · Planchas de 8 cartas
        </p>
      </footer>
    </div>
  );
}
