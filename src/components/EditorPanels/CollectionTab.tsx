import React, { useRef } from 'react';
import { CardData, ItemCategory } from '../../types/card';
import { CATEGORY_INFO } from '../../constants/presets';
import { 
  FolderDown, 
  FolderUp, 
  Copy, 
  Trash2, 
  Layers, 
  FileCode,
  CheckCircle2
} from 'lucide-react';

interface CollectionTabProps {
  currentCard: CardData;
  deck: CardData[];
  onSelectCard: (card: CardData) => void;
  onDuplicateCard: (card: CardData) => void;
  onDeleteCard: (id: string) => void;
  onNewCard: (category?: ItemCategory) => void;
  onImportDeck: (importedCards: CardData[]) => void;
}

export const CollectionTab: React.FC<CollectionTabProps> = ({
  currentCard,
  deck,
  onSelectCard,
  onDuplicateCard,
  onDeleteCard,
  onNewCard,
  onImportDeck,
}) => {
  const jsonFileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJson = () => {
    const dataStr = JSON.stringify(deck, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `Mazo_Papa_Tumbay_${new Date().toISOString().slice(0, 10)}.json`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          onImportDeck(parsed);
          alert(`Se importaron ${parsed.length} cartas con éxito.`);
        } else {
          alert('El archivo no contiene un mazo válido de cartas.');
        }
      } catch (err) {
        console.error(err);
        alert('Error al leer el archivo JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-200">
        <div>
          <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#df356b]" />
            Colección de Cartas ({deck.length})
          </h4>
          <p className="text-[11px] text-slate-500">
            Los cambios se guardan automáticamente en tu navegador (LocalStorage).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Autoguardado activo</span>
          </div>
        </div>
      </div>

      {/* Quick Template Creation Buttons */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
        <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
          Crear Nueva Carta con Plantilla:
        </label>
        <div className="flex flex-wrap gap-2">
          {(['arma', 'pocion', 'pergamino', 'armadura', 'objeto', 'accesorio'] as ItemCategory[]).map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => onNewCard(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 hover:border-[#df356b] hover:text-[#df356b] text-slate-700 transition cursor-pointer capitalize shadow-2xs"
            >
              + {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Card List in Deck */}
      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {deck.map(c => {
          const isSelected = c.id === currentCard.id;
          return (
            <div
              key={c.id}
              onClick={() => onSelectCard(c)}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group shadow-xs ${
                isSelected
                  ? 'bg-[#df356b]/5 border-[#df356b] ring-2 ring-[#df356b]/30'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-12 rounded-lg bg-slate-900 border border-slate-300 overflow-hidden flex-shrink-0 relative">
                  <img src={c.imageUrl} alt="" className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#df356b] transition">
                    {c.name}
                  </h5>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5">
                    <span className="capitalize font-medium">{c.category}</span>
                    <span>•</span>
                    <span className="text-amber-600 font-bold">{c.rarityStars}★</span>
                    <span>•</span>
                    <span className="truncate">{c.authorName ? `Autor: ${c.authorName}` : 'Papa Tumbay'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => onDuplicateCard(c)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  title="Duplicar carta"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                {deck.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onDeleteCard(c.id)}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                    title="Eliminar carta"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* JSON Import / Export */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <label className="block text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <FileCode className="w-4 h-4 text-[#df356b]" />
          Respaldo y Compartir Mazo (JSON)
        </label>
        <p className="text-[11px] text-slate-500">
          Exporta tu mazo en archivo .json para guardarlo en tu equipo o compartirlo con otros jugadores.
        </p>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleExportJson}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
          >
            <FolderDown className="w-3.5 h-3.5 text-[#df356b]" />
            Descargar Mazo (.JSON)
          </button>

          <button
            type="button"
            onClick={() => jsonFileInputRef.current?.click()}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 transition cursor-pointer"
          >
            <FolderUp className="w-3.5 h-3.5 text-emerald-600" />
            Importar Mazo (.JSON)
          </button>
          <input
            ref={jsonFileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};
