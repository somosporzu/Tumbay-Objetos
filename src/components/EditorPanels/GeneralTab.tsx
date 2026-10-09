import React from 'react';
import { CardData, ItemCategory } from '../../types/card';
import { CATEGORY_INFO } from '../../constants/presets';
import { 
  Sword, 
  Package, 
  FlaskConical, 
  Scroll, 
  Star, 
  User,
  Palette as PaletteIcon
} from 'lucide-react';

interface GeneralTabProps {
  card: CardData;
  onChange: (updater: (prev: CardData) => CardData) => void;
}

export const GeneralTab: React.FC<GeneralTabProps> = ({ card, onChange }) => {
  const categories: ItemCategory[] = [
    'arma',
    'armadura',
    'objeto',
    'pocion',
    'pergamino',
    'accesorio',
  ];

  const getCategoryIcon = (cat: ItemCategory) => {
    switch (cat) {
      case 'arma': return <Sword className="w-4 h-4" />;
      case 'armadura': 
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4 C9 6 15 6 17 4 L19 8 L18 14 C18 18 15 20 12 21 C9 20 6 18 6 14 L5 8 Z" />
            <line x1="12" y1="6" x2="12" y2="20" />
          </svg>
        );
      case 'pocion': return <FlaskConical className="w-4 h-4" />;
      case 'pergamino': return <Scroll className="w-4 h-4" />;
      case 'accesorio': 
        return (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 4 C6 13 10 16 12 16 C14 16 18 13 19 4" />
            <polygon points="12,16 14,19 12,22 10,19" fill="currentColor" />
          </svg>
        );
      case 'objeto':
      default: return <Package className="w-4 h-4" />;
    }
  };

  const handleCategorySelect = (cat: ItemCategory) => {
    onChange(prev => ({
      ...prev,
      category: cat,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Name / Title */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Nombre del Objeto (Placa Pumba)
        </label>
        <input
          type="text"
          value={card.name}
          onChange={e => onChange(prev => ({ ...prev, name: e.target.value, title: e.target.value }))}
          placeholder="Ej. PUMBA, Espada de las Ruinas..."
          className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#df356b] focus:ring-2 focus:ring-[#df356b]/20 text-sm font-bold uppercase transition shadow-xs"
        />
      </div>

      {/* Item Category (6 core categories) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Tipo de Objeto (Icono Silueta RPG en Círculo)
          </label>
          <span className="text-[11px] text-[#df356b] font-medium">
            Siluetas Game-Icons
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {categories.map(cat => {
            const isSelected = card.category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#df356b]/10 border-[#df356b] text-[#df356b] font-bold shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span className={isSelected ? 'text-[#df356b]' : 'text-slate-400'}>
                  {getCategoryIcon(cat)}
                </span>
                <span className="capitalize">{CATEGORY_INFO[cat]?.label || cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rarity Stars */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
              Rareza (1 a 5 Estrellas)
            </label>
            <span className="text-[11px] text-slate-500">
              Estrellas flotantes con resplandor radiante
            </span>
          </div>
          <span className="text-xs font-bold text-[#df356b]">
            {card.rarityStars} {card.rarityStars === 1 ? 'Estrella' : 'Estrellas'}
          </span>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-200">
          {[1, 2, 3, 4, 5].map(starNum => {
            const isActive = starNum <= card.rarityStars;
            return (
              <button
                key={starNum}
                type="button"
                onClick={() => onChange(prev => ({ ...prev, rarityStars: starNum }))}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ebd08c]/40 text-amber-900 font-bold'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-white'
                }`}
              >
                <Star 
                  className={`w-5.5 h-5.5 ${isActive ? 'fill-[#e0b94c] text-[#e0b94c]' : 'text-slate-300'}`} 
                />
                <span className="text-[10px] mt-1 font-semibold">{starNum}★</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Illustrator, Author Name & System (Footer text) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <PaletteIcon className="w-3.5 h-3.5 text-[#df356b]" />
            Ilustrador / Arte
          </label>
          <input
            type="text"
            value={card.illustratorName || ''}
            onChange={e => onChange(prev => ({ ...prev, illustratorName: e.target.value }))}
            placeholder="Ej: Midjourney, Artista..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:border-[#df356b]"
          />
          <p className="text-[10px] text-slate-400 mt-1">Aparece antes del autor (Ilus: ...)</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#df356b]" />
            Autor de la Carta
          </label>
          <input
            type="text"
            value={card.authorName}
            onChange={e => onChange(prev => ({ ...prev, authorName: e.target.value }))}
            placeholder="Tu nombre o alias"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:outline-none focus:border-[#df356b]"
          />
          <p className="text-[10px] text-slate-400 mt-1">Extremo inferior derecho (Autor: ...)</p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Identificador (Pie Izquierdo)
          </label>
          <input
            type="text"
            value={card.systemLabel}
            onChange={e => onChange(prev => ({ ...prev, systemLabel: e.target.value }))}
            placeholder="Sistema PAPA TUMBAY"
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold uppercase focus:outline-none focus:border-[#df356b]"
          />
          <p className="text-[10px] text-slate-400 mt-1">Nombre del sistema en pie izquierdo</p>
        </div>
      </div>

      {/* Separador Ornamental entre Reglas y Lore */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-slate-700 block">
            Floritura divisoria entre reglas y lore
          </span>
          <span className="text-[11px] text-slate-500">
            Añade un divisor ornamental sutil antes de la cita narrativa
          </span>
        </div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={card.showDividerFlourish ?? true}
            onChange={e => onChange(prev => ({ ...prev, showDividerFlourish: e.target.checked }))}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#df356b]"></div>
        </label>
      </div>
    </div>
  );
};
