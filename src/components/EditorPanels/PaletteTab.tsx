import React from 'react';
import { CardData, CardPalette } from '../../types/card';
import { COLOR_PALETTES } from '../../constants/presets';
import { Palette, Check, Sliders } from 'lucide-react';

interface PaletteTabProps {
  card: CardData;
  onChange: (updater: (prev: CardData) => CardData) => void;
}

export const PaletteTab: React.FC<PaletteTabProps> = ({ card, onChange }) => {
  const handleSelectPreset = (preset: CardPalette) => {
    onChange(prev => ({
      ...prev,
      palette: { ...preset },
    }));
  };

  const handleUpdateColor = (field: keyof CardPalette, value: string) => {
    onChange(prev => ({
      ...prev,
      palette: {
        ...prev.palette,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Official & Preset Palettes */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-[#df356b]" />
            Paletas Temáticas (Papa Tumbay & Pumba)
          </label>
          <span className="text-[11px] text-[#df356b] font-medium">Oficiales</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {COLOR_PALETTES.map(p => {
            const isSelected = card.palette.id === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className={`flex items-center justify-between p-3.5 rounded-2xl border text-left transition-all cursor-pointer group shadow-xs ${
                  isSelected
                    ? 'bg-[#df356b]/5 border-[#df356b] ring-2 ring-[#df356b]/30'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center -space-x-1.5">
                    <div 
                      className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                      style={{ backgroundColor: p.borderColor }} 
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                      style={{ backgroundColor: p.accentColor }} 
                    />
                    <div 
                      className="w-5 h-5 rounded-full border border-black/20 shadow-xs" 
                      style={{ backgroundColor: p.starsColor }} 
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 group-hover:text-[#df356b] transition">
                      {p.name}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 bg-[#df356b] text-white rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Fine-Tuned Palette */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Sliders className="w-4 h-4 text-[#df356b]" />
          <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Personalización de Colores de Bordes, Placa y Adornos
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Border & Frame Color */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="block text-xs font-medium text-slate-800">Bordes y Líneas</span>
              <span className="text-[10px] text-slate-500 font-mono">{card.palette.borderColor}</span>
            </div>
            <input
              type="color"
              value={card.palette.borderColor.startsWith('#') ? card.palette.borderColor : '#ebd08c'}
              onChange={e => handleUpdateColor('borderColor', e.target.value)}
              className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer bg-transparent"
            />
          </div>

          {/* Accent / Top Icon Color */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="block text-xs font-medium text-slate-800">Icono y Acentos</span>
              <span className="text-[10px] text-slate-500 font-mono">{card.palette.accentColor}</span>
            </div>
            <input
              type="color"
              value={card.palette.accentColor.startsWith('#') ? card.palette.accentColor : '#df356b'}
              onChange={e => handleUpdateColor('accentColor', e.target.value)}
              className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer bg-transparent"
            />
          </div>

          {/* Stars Color */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="block text-xs font-medium text-slate-800">Estrellas de Rareza</span>
              <span className="text-[10px] text-slate-500 font-mono">{card.palette.starsColor}</span>
            </div>
            <input
              type="color"
              value={card.palette.starsColor.startsWith('#') ? card.palette.starsColor : '#ebd08c'}
              onChange={e => handleUpdateColor('starsColor', e.target.value)}
              className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer bg-transparent"
            />
          </div>

          {/* Title Banner Background (Pumba Plate) */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="block text-xs font-medium text-slate-800">Fondo Placa PUMBA</span>
              <span className="text-[10px] text-slate-500 font-mono">{card.palette.titleBannerBg || '#232527'}</span>
            </div>
            <input
              type="color"
              value={card.palette.titleBannerBg && card.palette.titleBannerBg.startsWith('#') ? card.palette.titleBannerBg : '#352518'}
              onChange={e => handleUpdateColor('titleBannerBg', e.target.value)}
              className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer bg-transparent"
            />
          </div>

          {/* Title Text Color */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="block text-xs font-medium text-slate-800">Color del Título</span>
              <span className="text-[10px] text-slate-500 font-mono">{card.palette.textTitleColor}</span>
            </div>
            <input
              type="color"
              value={card.palette.textTitleColor.startsWith('#') ? card.palette.textTitleColor : '#ffffff'}
              onChange={e => handleUpdateColor('textTitleColor', e.target.value)}
              className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer bg-transparent"
            />
          </div>

          {/* Body Text Color */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="block text-xs font-medium text-slate-800">Texto de Reglas</span>
              <span className="text-[10px] text-slate-500 font-mono">{card.palette.textColor}</span>
            </div>
            <input
              type="color"
              value={card.palette.textColor.startsWith('#') ? card.palette.textColor : '#f5f6f8'}
              onChange={e => handleUpdateColor('textColor', e.target.value)}
              className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
