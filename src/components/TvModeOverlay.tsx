import React, { useEffect, useState } from 'react';
import { 
  Tv, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  CornerDownLeft, 
  X, 
  Maximize2, 
  Minimize2,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX
} from 'lucide-react';
import { CanalTV } from '../data/channels';

interface TvModeOverlayProps {
  isActive: boolean;
  onToggle: () => void;
  canalAtivo: CanalTV | null;
  onSelectChannel: (canal: CanalTV) => void;
  todosCanais: CanalTV[];
  onClosePlayer: () => void;
}

export const TvModeOverlay: React.FC<TvModeOverlayProps> = ({
  isActive,
  onToggle,
  canalAtivo,
  onSelectChannel,
  todosCanais,
  onClosePlayer
}) => {
  const [showVirtualRemote, setShowVirtualRemote] = useState<boolean>(false);

  // Escuta os botões do controle remoto físico (Smart TV ou teclado)
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorar caso o usuário esteja digitando em um campo de busca
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') {
        return;
      }

      const activeElement = document.activeElement as HTMLElement;

      switch (e.key) {
        // Voltar / Esc
        case 'Escape':
        case 'Backspace':
        case 'GoBack': // WebOS & Tizen
          if (canalAtivo) {
            e.preventDefault();
            onClosePlayer();
          } else {
            onToggle();
          }
          break;

        // Troca de canal direto (PageUp / PageDown ou Teclas de Canal da TV)
        case 'PageUp':
        case 'ChannelUp': {
          e.preventDefault();
          if (canalAtivo && todosCanais.length > 0) {
            const idx = todosCanais.findIndex((c) => c.id === canalAtivo.id);
            const nextIdx = (idx + 1) % todosCanais.length;
            onSelectChannel(todosCanais[nextIdx]);
          }
          break;
        }

        case 'PageDown':
        case 'ChannelDown': {
          e.preventDefault();
          if (canalAtivo && todosCanais.length > 0) {
            const idx = todosCanais.findIndex((c) => c.id === canalAtivo.id);
            const prevIdx = (idx - 1 + todosCanais.length) % todosCanais.length;
            onSelectChannel(todosCanais[prevIdx]);
          }
          break;
        }

        // Navegação por setas (D-Pad)
        case 'ArrowRight':
        case 'ArrowLeft':
        case 'ArrowDown':
        case 'ArrowUp': {
          // Gerenciar foco visual
          const focusable = Array.from(
            document.querySelectorAll<HTMLElement>(
              'button:not([disabled]), [tabindex="0"], a[href], input:not([disabled])'
            )
          ).filter((el) => el.offsetParent !== null);

          if (focusable.length === 0) return;

          const currentIndex = focusable.indexOf(activeElement);

          if (currentIndex === -1) {
            focusable[0].focus();
            return;
          }

          if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const next = focusable[(currentIndex + 1) % focusable.length];
            next.focus();
            next.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            const prev = focusable[(currentIndex - 1 + focusable.length) % focusable.length];
            prev.focus();
            prev.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
          break;
        }

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, canalAtivo, todosCanais, onSelectChannel, onClosePlayer, onToggle]);

  // Se modo TV estiver ativo, mostrar banner superior sutil e botão de controle virtual
  return (
    <>
      {isActive && (
        <div className="fixed top-2 right-4 z-40 flex items-center gap-2 animate-in fade-in">
          <div className="px-3 py-1.5 rounded-full bg-indigo-600/90 text-white backdrop-blur-md border border-indigo-400/40 text-xs font-bold flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            MODO SMART TV ATIVO
          </div>

          <button
            onClick={() => setShowVirtualRemote(!showVirtualRemote)}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 text-slate-200 hover:text-white border border-slate-700/80 text-xs font-semibold backdrop-blur-md shadow-lg flex items-center gap-1.5 transition"
          >
            <Tv className="w-3.5 h-3.5 text-cyan-400" />
            {showVirtualRemote ? 'Ocultar Controle' : 'Controle Virtual'}
          </button>
        </div>
      )}

      {/* CONTROLE REMOTO VIRTUAL FLUTUANTE (D-PAD) */}
      {showVirtualRemote && isActive && (
        <div className="fixed bottom-6 right-6 z-50 p-5 rounded-3xl bg-slate-950/95 border border-slate-800 text-white shadow-2xl backdrop-blur-xl w-64 animate-in slide-in-from-bottom-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider">Controle Smart TV</span>
            </div>
            <button
              onClick={() => setShowVirtualRemote(false)}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* D-Pad Virtual */}
          <div className="flex flex-col items-center justify-center gap-1.5 my-2">
            <button
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
              }}
              className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 flex items-center justify-center transition active:scale-95"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
                }}
                className="w-10 h-12 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 flex items-center justify-center transition active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.activeElement as HTMLElement;
                  if (el) el.click();
                }}
                className="w-14 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white font-bold text-xs flex items-center justify-center shadow-lg transition active:scale-90"
              >
                OK
              </button>

              <button
                onClick={() => {
                  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
                }}
                className="w-10 h-12 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 flex items-center justify-center transition active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
              }}
              className="w-12 h-10 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 flex items-center justify-center transition active:scale-95"
            >
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Teclas de Canal +/- e Voltar */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] font-bold">
            <button
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp' }));
              }}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 flex flex-col items-center gap-1 transition"
            >
              <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
              CH +
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
              }}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 flex flex-col items-center gap-1 text-amber-400 transition"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              VOLTAR
            </button>

            <button
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown' }));
              }}
              className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 flex flex-col items-center gap-1 transition"
            >
              <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
              CH -
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center mt-3">
            Dica: Em Smart TVs reais, use diretamente as setas e o botão OK do controle remoto.
          </p>
        </div>
      )}
    </>
  );
};
