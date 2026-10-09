import React, { useRef, useEffect, useState } from 'react';
import { CardData, ItemCategory } from '../../types/card';
import { SAMPLE_ARTWORKS, CATEGORY_INFO } from '../../constants/presets';
import { 
  Upload, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Move, 
  Sliders, 
  Image as ImageIcon,
  Check,
  Maximize2,
  Minimize2,
  Crosshair,
  Info,
  Filter
} from 'lucide-react';

interface ImageTabProps {
  card: CardData;
  onChange: (updater: (prev: CardData) => CardData) => void;
}

// Measure true natural dimensions of any image (data URL or regular URL)
const measureImage = (src: string): Promise<{ width: number; height: number; aspectRatio: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth || 750;
      const height = img.naturalHeight || 1050;
      resolve({ width, height, aspectRatio: width / height });
    };
    img.onerror = () => {
      resolve({ width: 750, height: 1050, aspectRatio: 750 / 1050 });
    };
    img.src = src;
  });
};

export const ImageTab: React.FC<ImageTabProps> = ({ card, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryFilter, setCategoryFilter] = useState<'todos' | ItemCategory>('todos');

  const categories: { id: 'todos' | ItemCategory; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'arma', label: 'Armas' },
    { id: 'armadura', label: 'Armaduras' },
    { id: 'objeto', label: 'Objetos' },
    { id: 'pocion', label: 'Pociones' },
    { id: 'pergamino', label: 'Pergaminos' },
    { id: 'accesorio', label: 'Accesorios' },
  ];

  const filteredArtworks = categoryFilter === 'todos'
    ? SAMPLE_ARTWORKS
    : SAMPLE_ARTWORKS.filter(art => art.category === categoryFilter);

  // If card has an image but aspect ratio is not yet measured, detect it automatically
  useEffect(() => {
    if (card.imageUrl && (!card.imageWidth || !card.imageHeight || !card.imageAspectRatio)) {
      measureImage(card.imageUrl).then(({ width, height, aspectRatio }) => {
        onChange(prev => {
          if (prev.imageAspectRatio) return prev;
          return {
            ...prev,
            imageWidth: width,
            imageHeight: height,
            imageAspectRatio: aspectRatio,
          };
        });
      });
    }
  }, [card.imageUrl]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const { width, height, aspectRatio } = await measureImage(dataUrl);
        onChange(prev => ({
          ...prev,
          imageUrl: dataUrl,
          imageWidth: width,
          imageHeight: height,
          imageAspectRatio: aspectRatio,
          imageScale: 1.0,
          imageOffsetX: 0,
          imageOffsetY: 0,
          imageFit: 'cover',
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        const { width, height, aspectRatio } = await measureImage(dataUrl);
        onChange(prev => ({
          ...prev,
          imageUrl: dataUrl,
          imageWidth: width,
          imageHeight: height,
          imageAspectRatio: aspectRatio,
          imageScale: 1.0,
          imageOffsetX: 0,
          imageOffsetY: 0,
          imageFit: 'cover',
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleResetAdjustments = () => {
    onChange(prev => ({
      ...prev,
      imageScale: 1.0,
      imageOffsetX: 0,
      imageOffsetY: 0,
      imageRotate: 0,
      imageBrightness: 100,
      imageContrast: 100,
      imageSaturation: 100,
      imageFit: 'cover',
    }));
  };

  const handleSetFitMode = (mode: 'cover' | 'contain') => {
    onChange(prev => ({
      ...prev,
      imageFit: mode,
      imageScale: 1.0,
      imageOffsetX: 0,
      imageOffsetY: 0,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Subir Ilustración del Objeto
        </label>
        
        <div
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-[#df356b] bg-white hover:bg-[#df356b]/5 rounded-2xl p-6 text-center cursor-pointer transition-all group shadow-xs"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-[#df356b]/10 text-slate-500 group-hover:text-[#df356b] flex items-center justify-center mx-auto mb-3 transition">
            <Upload className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-slate-800 group-hover:text-[#df356b]">
            Haz clic para subir o arrastra una imagen aquí
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Formatos: PNG, JPG, WEBP · Mantiene la imagen completa sin recortar
          </p>
        </div>
      </div>

      {/* Preset Illustrations Gallery */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-[#df356b]" />
            Galería de Ilustraciones RPG ({filteredArtworks.length})
          </label>
          <span className="text-[11px] text-slate-500">Filtrar por tipo</span>
        </div>

        {/* Category Filter Chips (Arma, Armadura, Objeto, Poción, Pergamino, Accesorio) */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {categories.map(cat => {
            const isSelected = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#df356b] text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {filteredArtworks.map(art => {
            const isCurrent = card.imageUrl === art.url;
            return (
              <button
                key={art.id}
                type="button"
                onClick={() => onChange(prev => ({ 
                  ...prev, 
                  imageUrl: art.url,
                  imageWidth: 750,
                  imageHeight: 1050,
                  imageAspectRatio: 750 / 1050,
                  imageScale: 1.0,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  imageFit: 'cover',
                }))}
                className={`relative rounded-xl overflow-hidden border p-1 text-left transition-all cursor-pointer group ${
                  isCurrent 
                    ? 'border-[#df356b] ring-2 ring-[#df356b]/30 bg-[#df356b]/5' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-full aspect-[5/7] rounded-lg overflow-hidden bg-slate-900 relative">
                  <img
                    src={art.url}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {isCurrent && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-[#df356b] text-white rounded-full flex items-center justify-center shadow">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/70 text-white text-[9px] font-bold uppercase tracking-wider backdrop-blur-xs">
                    {CATEGORY_INFO[art.category]?.label || art.category}
                  </span>
                </div>
                <div className="px-1 py-1.5 text-[11px] font-bold text-slate-800 truncate">
                  {art.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Adjustments & Fine Tuning */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#df356b]" />
            <span className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Encuadre y Ajustes
            </span>
          </div>
          <button
            type="button"
            onClick={handleResetAdjustments}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#df356b] transition cursor-pointer font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            Restablecer
          </button>
        </div>

        {/* Quick Framing Modes: Cover vs Contain vs Centered */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            Modo de Ajuste
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleSetFitMode('cover')}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                (card.imageFit ?? 'cover') === 'cover'
                  ? 'bg-[#df356b] text-white border-[#df356b] shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Llenar Fondo (Cover)
            </button>
            <button
              type="button"
              onClick={() => handleSetFitMode('contain')}
              className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                card.imageFit === 'contain'
                  ? 'bg-[#df356b] text-white border-[#df356b] shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Minimize2 className="w-3.5 h-3.5" />
              Ver Completa (Contain)
            </button>
          </div>
          <div className="mt-2 flex items-start gap-1.5 p-2 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[11px] text-amber-900 leading-snug">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Sin recorte previo:</strong> La imagen mantiene todas sus proporciones y bordes originales. Puedes arrastrarla en la vista previa o mover los controles para encuadrarla exactamente donde quieras.
            </span>
          </div>
        </div>

        {/* Zoom / Scale */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-600 flex items-center gap-1.5">
              <ZoomIn className="w-3.5 h-3.5" />
              Zoom / Escala
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onChange(prev => ({ ...prev, imageScale: Math.max(0.2, Number((prev.imageScale - 0.1).toFixed(2))) }))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold"
                title="Reducir 10%"
              >
                -
              </button>
              <span className="font-mono text-[#df356b] font-bold min-w-[3rem] text-center">
                {Math.round(card.imageScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => onChange(prev => ({ ...prev, imageScale: Math.min(3.0, Number((prev.imageScale + 0.1).toFixed(2))) }))}
                className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold"
                title="Aumentar 10%"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => onChange(prev => ({ ...prev, imageScale: 1.0 }))}
                className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium"
              >
                100%
              </button>
            </div>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.05"
            value={card.imageScale}
            onChange={e => onChange(prev => ({ ...prev, imageScale: parseFloat(e.target.value) }))}
            className="w-full accent-[#df356b] cursor-pointer"
          />
        </div>

        {/* Offset X */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-600 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5" />
              Desplazamiento Horizontal (X)
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-700 font-bold">{card.imageOffsetX} px</span>
              {card.imageOffsetX !== 0 && (
                <button
                  type="button"
                  onClick={() => onChange(prev => ({ ...prev, imageOffsetX: 0 }))}
                  className="text-[10px] text-slate-400 hover:text-[#df356b]"
                  title="Centrar X"
                >
                  (0)
                </button>
              )}
            </div>
          </div>
          <input
            type="range"
            min="-800"
            max="800"
            step="2"
            value={card.imageOffsetX}
            onChange={e => onChange(prev => ({ ...prev, imageOffsetX: parseInt(e.target.value) }))}
            className="w-full accent-[#df356b] cursor-pointer"
          />
        </div>

        {/* Offset Y */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-slate-600 flex items-center gap-1.5">
              <Move className="w-3.5 h-3.5 rotate-90" />
              Desplazamiento Vertical (Y)
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-700 font-bold">{card.imageOffsetY} px</span>
              {card.imageOffsetY !== 0 && (
                <button
                  type="button"
                  onClick={() => onChange(prev => ({ ...prev, imageOffsetY: 0 }))}
                  className="text-[10px] text-slate-400 hover:text-[#df356b]"
                  title="Centrar Y"
                >
                  (0)
                </button>
              )}
            </div>
          </div>
          <input
            type="range"
            min="-800"
            max="800"
            step="2"
            value={card.imageOffsetY}
            onChange={e => onChange(prev => ({ ...prev, imageOffsetY: parseInt(e.target.value) }))}
            className="w-full accent-[#df356b] cursor-pointer"
          />
        </div>

        {/* Rotation */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-600">Rotación</span>
            <span className="font-mono text-slate-700 font-bold">{card.imageRotate}°</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={card.imageRotate}
            onChange={e => onChange(prev => ({ ...prev, imageRotate: parseInt(e.target.value) }))}
            className="w-full accent-[#df356b] cursor-pointer"
          />
        </div>

        {/* Visual Filters */}
        <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[11px] text-slate-500 mb-1">Brillo</label>
            <input
              type="range"
              min="50"
              max="150"
              value={card.imageBrightness}
              onChange={e => onChange(prev => ({ ...prev, imageBrightness: parseInt(e.target.value) }))}
              className="w-full accent-[#df356b] cursor-pointer"
            />
            <span className="block text-[10px] text-slate-600 text-center font-mono font-medium">{card.imageBrightness}%</span>
          </div>

          <div>
            <label className="block text-[11px] text-slate-500 mb-1">Contraste</label>
            <input
              type="range"
              min="50"
              max="160"
              value={card.imageContrast}
              onChange={e => onChange(prev => ({ ...prev, imageContrast: parseInt(e.target.value) }))}
              className="w-full accent-[#df356b] cursor-pointer"
            />
            <span className="block text-[10px] text-slate-600 text-center font-mono font-medium">{card.imageContrast}%</span>
          </div>

          <div>
            <label className="block text-[11px] text-slate-500 mb-1">Saturación</label>
            <input
              type="range"
              min="0"
              max="200"
              value={card.imageSaturation}
              onChange={e => onChange(prev => ({ ...prev, imageSaturation: parseInt(e.target.value) }))}
              className="w-full accent-[#df356b] cursor-pointer"
            />
            <span className="block text-[10px] text-slate-600 text-center font-mono font-medium">{card.imageSaturation}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
