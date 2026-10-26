import React, { useEffect, useState } from 'react';
import { 
  Tv, 
  Cast, 
  HelpCircle, 
  Database, 
  Download, 
  Radio, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { castManager, CastConnectionState } from '../services/castService';

interface HeaderProps {
  totalCanais: number;
  isTvMode: boolean;
  onToggleTvMode: () => void;
  onOpenGuide: () => void;
  onOpenManageChannels: () => void;
  onDownloadSingleFile: () => void;
  onCastClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCanais,
  isTvMode,
  onToggleTvMode,
  onOpenGuide,
  onOpenManageChannels,
  onDownloadSingleFile,
  onCastClick
}) => {
  const [castState, setCastState] = useState<CastConnectionState>('UNAVAILABLE');

  useEffect(() => {
    const unsub = castManager.subscribeState(setCastState);
    return unsub;
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#080c15]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        
        {/* Logo & Marca */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 border border-indigo-400/30 shrink-0">
            <Tv className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                WMT-TV Cast
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <span>Web TVs do Blog</span>
              <span className="text-slate-600">•</span>
              <span className="text-cyan-400 font-semibold">{totalCanais} canais</span>
            </p>
          </div>
        </div>

        {/* Ações do Topo */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Status Chromecast */}
          <button
            onClick={onCastClick}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
              castState === 'CONNECTED'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/10'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Google Cast / Chromecast"
          >
            <Cast className={`w-4 h-4 ${castState === 'CONNECTED' ? 'text-emerald-400 animate-pulse' : 'text-cyan-400'}`} />
            <span className="hidden md:inline">
              {castState === 'CONNECTED' ? 'Transmitindo na TV' : 'Cast'}
            </span>
          </button>

          {/* Botão Modo TV (10-foot Smart TV UI) */}
          <button
            onClick={onToggleTvMode}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
              isTvMode
                ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 border-cyan-400/40 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Ativar modo de tela cheia e controle remoto para Smart TV"
          >
            <Tv className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Modo TV</span>
          </button>

          {/* Gerenciar / Importar Canais */}
          <button
            onClick={onOpenManageChannels}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition"
            title="Importar lista_tvs.json ou exportar"
          >
            <Database className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Canais</span>
          </button>

          {/* Baixar HTML Único */}
          <button
            onClick={onDownloadSingleFile}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition"
            title="Baixar aplicativo completo em 1 único arquivo HTML"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span className="hidden lg:inline">Baixar .HTML</span>
          </button>

          {/* Como Publicar & Cast */}
          <button
            onClick={onOpenGuide}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 flex items-center gap-1.5 transition"
            title="Instruções de publicação e registro no Google Cast Developer Console"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Como Publicar</span>
          </button>

        </div>

      </div>
    </header>
  );
};
