import React, { useState } from 'react';
import { CardData, CustomTextLayer } from '../../types/card';
import { FONT_OPTIONS } from '../../constants/presets';
import { calculateTextAutoAdjust } from '../../utils/cardSvgBuilder';
import { 
  Type, 
  Plus, 
  Trash2, 
  Expand, 
  Quote, 
  Layers, 
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  User,
  Sliders,
  CheckCircle2,
  ArrowUp,
  MoveVertical
} from 'lucide-react';

interface TextTabProps {
  card: CardData;
  onChange: (updater: (prev: CardData) => CardData) => void;
}

export const TextTab: React.FC<TextTabProps> = ({ card, onChange }) => {
  const [activeSection, setActiveSection] = useState<'main' | 'custom'>('main');

  const isAutoAdjust = card.autoAdjustText !== false;
  const metrics = calculateTextAutoAdjust(card);

  // Custom text layers handling
  const handleAddCustomLayer = () => {
    const newLayer: CustomTextLayer = {
      id: `layer-${Date.now()}`,
      text: 'Texto Adicional Personalizado',
      fontFamily: "'Cinzel', serif",
      fontSize: 22,
      fontWeight: 'bold',
      fontStyle: 'normal',
      color: '#ffffff',
      x: 50,
      y: 50,
      align: 'center',
      hasBackground: true,
      backgroundColor: 'rgba(44, 46, 48, 0.85)',
      backgroundBorderColor: card.palette.borderColor,
    };
    onChange(prev => ({
      ...prev,
      customLayers: [...(prev.customLayers || []), newLayer],
    }));
    setActiveSection('custom');
  };

  const handleUpdateLayer = (id: string, updates: Partial<CustomTextLayer>) => {
    onChange(prev => ({
      ...prev,
      customLayers: prev.customLayers.map(l => l.id === id ? { ...l, ...updates } : l),
    }));
  };

  const handleDeleteLayer = (id: string) => {
    onChange(prev => ({
      ...prev,
      customLayers: prev.customLayers.filter(l => l.id !== id),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
        <button
          type="button"
          onClick={() => setActiveSection('main')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer ${
            activeSection === 'main'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Contenido Principal
        </button>
        <button
          type="button"
          onClick={() => setActiveSection('custom')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSection === 'custom'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-[#df356b]" />
          Capas de Texto Personalizado ({card.customLayers?.length || 0})
        </button>
      </div>

      {activeSection === 'main' && (
        <div className="space-y-5">
          {/* SMART TEXT AUTO-ADJUST & UPWARD EXPANSION CARD */}
          <div className="p-4 rounded-2xl bg-linear-to-br from-indigo-50/80 via-white to-amber-50/50 border border-indigo-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600/10 text-indigo-700 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#df356b]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Autoajuste de Textos & Expansión hacia Arriba
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Mínimo estricto de fuente: <strong className="text-slate-800">20 px</strong>
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                type="button"
                onClick={() => onChange(prev => ({ ...prev, autoAdjustText: !(prev.autoAdjustText ?? true) }))}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  isAutoAdjust ? 'bg-[#df356b]' : 'bg-slate-300'
                }`}
                title={isAutoAdjust ? 'Desactivar autoajuste' : 'Activar autoajuste'}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                    isAutoAdjust ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Si el texto es largo, la fuente se escala automáticamente hasta un mínimo de <strong>20 px</strong>. Si a 20 px aún excede el cuadro, éste <strong>se expande automáticamente hacia arriba</strong> para darle más espacio.
            </p>

            {/* Live Auto-adjustment Badges */}
            {isAutoAdjust && (
              <div className="flex flex-wrap gap-2 pt-1 border-t border-indigo-100/80 text-xs">
                {metrics.effectiveTitleSize < (card.titleSize || 38) && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-900 font-semibold text-[11px] border border-indigo-200">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    Título auto-ajustado: {metrics.effectiveTitleSize} px
                  </span>
                )}

                {metrics.effectiveDescSize < (card.descriptionSize || 24) ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-semibold text-[11px] border border-amber-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    Fuente texto: {card.descriptionSize || 24}px → {metrics.effectiveDescSize} px
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium text-[11px] border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Fuente óptima ({metrics.effectiveDescSize} px)
                  </span>
                )}

                {metrics.neededAutoExpansion > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#df356b]/10 text-[#df356b] font-bold text-[11px] border border-[#df356b]/30">
                    <ArrowUp className="w-3.5 h-3.5" />
                    Cuadro expandido hacia arriba: +{metrics.neededAutoExpansion} px
                  </span>
                )}

                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-slate-600 font-mono text-[10px]">
                  Altura cuadro: {metrics.boxHeight} px
                </span>
              </div>
            )}
          </div>

          {/* EXPANDABLE TEXT BOX SLIDER */}
          <div className="p-4 rounded-2xl bg-[#ebd08c]/25 border border-[#ebd08c]/60 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Expand className="w-4 h-4 text-[#df356b]" />
                Margen Manual de Expansión hacia Arriba
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-900 bg-white/80 px-2 py-0.5 rounded-md border border-[#ebd08c]">
                  +{card.textBoxHeightBonus || 0} px {metrics.neededAutoExpansion > 0 ? `(+${metrics.neededAutoExpansion}px auto)` : ''}
                </span>
              </div>
            </div>
            <p className="text-[11px] text-amber-950/80">
              Permite añadir margen adicional manual hacia arriba sobre el cálculo automático.
            </p>
            <input
              type="range"
              min="-40"
              max="280"
              step="10"
              value={card.textBoxHeightBonus || 0}
              onChange={e => onChange(prev => ({ ...prev, textBoxHeightBonus: parseInt(e.target.value) }))}
              className="w-full accent-[#df356b] cursor-pointer"
            />
          </div>

          {/* Title Styling */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Tipografía y Título de la Carta
              </label>
              <button
                type="button"
                onClick={() => onChange(prev => ({
                  ...prev,
                  descriptionFont: 'Georgia, serif',
                  titleFont: "'Cinzel', serif",
                  loreFont: "'Spectral', serif",
                  showDividerFlourish: true,
                }))}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#ebd08c]/40 hover:bg-[#ebd08c]/70 text-amber-950 border border-[#ebd08c] transition cursor-pointer shadow-2xs"
                title="Aplica Georgia Clásico para reglas y fuentes ornamentales para títulos y ambientación"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#df356b]" />
                Fuentes Recomendadas (Georgia + Cinzel)
              </button>
            </div>

            {/* Input to edit title directly */}
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Nombre / Título de la Carta</label>
              <input
                type="text"
                value={card.title}
                onChange={e => onChange(prev => ({ ...prev, title: e.target.value, name: e.target.value }))}
                placeholder="Nombre de la carta..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:border-[#df356b]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Fuente</label>
                <select
                  value={card.titleFont}
                  onChange={e => onChange(prev => ({ ...prev, titleFont: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:border-[#df356b]"
                >
                  {FONT_OPTIONS.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                  <span>Tamaño</span>
                  <span className="font-mono text-slate-800 font-bold">
                    {card.titleSize} px {isAutoAdjust && metrics.effectiveTitleSize !== card.titleSize ? `(Aplicado: ${metrics.effectiveTitleSize}px)` : ''}
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="56"
                  value={card.titleSize}
                  onChange={e => onChange(prev => ({ ...prev, titleSize: parseInt(e.target.value) }))}
                  className="w-full accent-[#df356b] cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Alineación del Título</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onChange(prev => ({ ...prev, titleAlign: 'left' }))}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                    (card.titleAlign || 'left') === 'left'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                  <span>Izquierda</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange(prev => ({ ...prev, titleAlign: 'center' }))}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                    card.titleAlign === 'center'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <AlignCenter className="w-3.5 h-3.5" />
                  <span>Centro</span>
                </button>
                <button
                  type="button"
                  onClick={() => onChange(prev => ({ ...prev, titleAlign: 'right' }))}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                    card.titleAlign === 'right'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <AlignRight className="w-3.5 h-3.5" />
                  <span>Derecha</span>
                </button>
              </div>
            </div>

            {/* Micro-ajuste vertical del nombre dentro del bloque */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <div className="flex justify-between items-center text-[11px]">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <MoveVertical className="w-3.5 h-3.5 text-[#df356b]" />
                  Ajuste Vertical del Nombre
                </span>
                <span className="font-mono text-slate-800 font-semibold bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                  {(card.titleOffsetY || 0) === 0 ? 'Centrado natural (+6 px aplicado)' : `${(card.titleOffsetY || 0) > 0 ? '+' : ''}${card.titleOffsetY} px extra`}
                </span>
              </div>
              <input
                type="range"
                min="-16"
                max="24"
                step="1"
                value={card.titleOffsetY || 0}
                onChange={e => onChange(prev => ({ ...prev, titleOffsetY: parseInt(e.target.value) }))}
                className="w-full accent-[#df356b] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Más arriba</span>
                <span>Por defecto</span>
                <span>Más abajo</span>
              </div>
            </div>
          </div>

          {/* Description / Rules */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Efecto / Reglas del Objeto
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">
                  Tamaño: <strong className="text-slate-800">{card.descriptionSize}px</strong>
                  {isAutoAdjust && metrics.effectiveDescSize !== card.descriptionSize && (
                    <span className="text-[#df356b] font-bold ml-1">
                      (auto: {metrics.effectiveDescSize}px)
                    </span>
                  )}
                </span>
                <input
                  type="range"
                  min="14"
                  max="36"
                  step="1"
                  value={card.descriptionSize}
                  onChange={e => onChange(prev => ({ ...prev, descriptionSize: parseInt(e.target.value) }))}
                  className="w-24 accent-[#df356b] cursor-pointer"
                />
              </div>
            </div>

            {isAutoAdjust && metrics.neededAutoExpansion > 0 && (
              <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <ArrowUp className="w-3.5 h-3.5 text-[#df356b] shrink-0" />
                <span>
                  El texto excede el espacio base: el cuadro se expandió automáticamente <strong>+{metrics.neededAutoExpansion}px hacia arriba</strong>.
                </span>
              </div>
            )}

            <textarea
              rows={4}
              value={card.description}
              onChange={e => onChange(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe el efecto, mecánicas de juego, daño o utilidad del objeto..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:border-[#df356b] focus:ring-1 focus:ring-[#df356b]/30 resize-y"
            />

            <div>
              <label className="block text-[11px] text-slate-500 mb-1">Fuente del Texto</label>
              <select
                value={card.descriptionFont}
                onChange={e => onChange(prev => ({ ...prev, descriptionFont: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:border-[#df356b]"
              >
                {FONT_OPTIONS.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Flavor / Lore Quote */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-[#df356b]" />
                Cita de Ambientación / Lore
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500">
                  Tamaño: <strong className="text-slate-800">{card.loreSize}px</strong>
                  {isAutoAdjust && metrics.effectiveLoreSize !== card.loreSize && (
                    <span className="text-[#df356b] font-bold ml-1">
                      (auto: {metrics.effectiveLoreSize}px)
                    </span>
                  )}
                </span>
                <input
                  type="range"
                  min="12"
                  max="28"
                  step="1"
                  value={card.loreSize}
                  onChange={e => onChange(prev => ({ ...prev, loreSize: parseInt(e.target.value) }))}
                  className="w-24 accent-[#df356b] cursor-pointer"
                />
              </div>
            </div>

            <textarea
              rows={2}
              value={card.lore}
              onChange={e => onChange(prev => ({ ...prev, lore: e.target.value }))}
              placeholder="Fragmento narrativo o cita en cursiva..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-xs italic focus:border-[#df356b] resize-y"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Fuente de la Cita / Lore</label>
                <select
                  value={card.loreFont || "'Spectral', serif"}
                  onChange={e => onChange(prev => ({ ...prev, loreFont: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:border-[#df356b]"
                >
                  {FONT_OPTIONS.map(f => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-medium text-slate-700">
                  <input
                    type="checkbox"
                    checked={card.showDividerFlourish !== false}
                    onChange={e => onChange(prev => ({ ...prev, showDividerFlourish: e.target.checked }))}
                    className="w-4 h-4 accent-[#df356b] rounded cursor-pointer"
                  />
                  <span>Separador Ornamental (Mantener siempre entre reglas y cita)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Pie de Carta (Sistema, Ilustrador & Autor)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Pie Izquierdo (Sistema)</label>
                <input
                  type="text"
                  value={card.systemLabel}
                  onChange={e => onChange(prev => ({ ...prev, systemLabel: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Ilustrador / Arte</label>
                <input
                  type="text"
                  value={card.illustratorName || ''}
                  onChange={e => onChange(prev => ({ ...prev, illustratorName: e.target.value }))}
                  placeholder="Ej: Artista o IA"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Pie Derecho (Autor)</label>
                <input
                  type="text"
                  value={card.authorName}
                  onChange={e => onChange(prev => ({ ...prev, authorName: e.target.value }))}
                  placeholder="Tu nombre"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Text Layers */}
      {activeSection === 'custom' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#df356b]" />
                Textos Personalizables
              </h4>
              <p className="text-[11px] text-slate-500">
                Añade textos libres en cualquier coordenada con diferentes fuentes y tamaños.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddCustomLayer}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#df356b] text-white hover:bg-[#c9245a] transition cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              Nuevo Texto
            </button>
          </div>

          {(!card.customLayers || card.customLayers.length === 0) ? (
            <div className="p-8 text-center rounded-2xl bg-white border border-dashed border-slate-300">
              <Type className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-600">
                Aún no has añadido textos personalizados adicionales.
              </p>
              <button
                type="button"
                onClick={handleAddCustomLayer}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-[#df356b] border border-slate-200 hover:bg-slate-200 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Añadir Primer Texto Libre
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {card.customLayers.map((layer, index) => (
                <div key={layer.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#df356b]">
                      Capa #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteLayer(layer.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={layer.text}
                    onChange={e => handleUpdateLayer(layer.id, { text: e.target.value })}
                    placeholder="Contenido del texto..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Tipografía</label>
                      <select
                        value={layer.fontFamily}
                        onChange={e => handleUpdateLayer(layer.id, { fontFamily: e.target.value })}
                        className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-xs"
                      >
                        {FONT_OPTIONS.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>Tamaño</span>
                        <span className="font-mono text-[#df356b] font-bold">{layer.fontSize}px</span>
                      </div>
                      <input
                        type="range"
                        min="12"
                        max="64"
                        value={layer.fontSize}
                        onChange={e => handleUpdateLayer(layer.id, { fontSize: parseInt(e.target.value) })}
                        className="w-full accent-[#df356b] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">Color de Texto</label>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={layer.color}
                          onChange={e => handleUpdateLayer(layer.id, { color: e.target.value })}
                          className="w-7 h-7 rounded border border-slate-200 cursor-pointer bg-transparent"
                        />
                        <span className="text-[11px] font-mono text-slate-600">{layer.color}</span>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-[10px] text-slate-500 mb-1">Alineación</label>
                      <div className="flex rounded-lg bg-slate-100 p-0.5 border border-slate-200">
                        <button
                          type="button"
                          onClick={() => handleUpdateLayer(layer.id, { align: 'left' })}
                          className={`flex-1 py-1 flex justify-center rounded text-xs cursor-pointer ${
                            layer.align === 'left' ? 'bg-[#df356b] text-white font-bold' : 'text-slate-600'
                          }`}
                        >
                          <AlignLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateLayer(layer.id, { align: 'center' })}
                          className={`flex-1 py-1 flex justify-center rounded text-xs cursor-pointer ${
                            layer.align === 'center' ? 'bg-[#df356b] text-white font-bold' : 'text-slate-600'
                          }`}
                        >
                          <AlignCenter className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateLayer(layer.id, { align: 'right' })}
                          className={`flex-1 py-1 flex justify-center rounded text-xs cursor-pointer ${
                            layer.align === 'right' ? 'bg-[#df356b] text-white font-bold' : 'text-slate-600'
                          }`}
                        >
                          <AlignRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>Posición Horizontal (X)</span>
                        <span className="font-mono text-slate-800">{layer.x}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        value={layer.x}
                        onChange={e => handleUpdateLayer(layer.id, { x: parseInt(e.target.value) })}
                        className="w-full accent-[#df356b] cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>Posición Vertical (Y)</span>
                        <span className="font-mono text-slate-800">{layer.y}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="95"
                        value={layer.y}
                        onChange={e => handleUpdateLayer(layer.id, { y: parseInt(e.target.value) })}
                        className="w-full accent-[#df356b] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
