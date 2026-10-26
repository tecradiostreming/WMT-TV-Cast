/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * WMT-TV Cast
 * Catálogo completo de TVs web com transmissão para Smart TV, Chromecast e AirPlay.
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CANAIS_INICIAIS, CanalTV } from './data/channels';
import { Header } from './components/Header';
import { ChannelCard } from './components/ChannelCard';
import { PlayerView } from './components/PlayerView';
import { CastModal } from './components/CastModal';
import { TvModeOverlay } from './components/TvModeOverlay';
import { PublishGuideModal } from './components/PublishGuideModal';
import { ManageChannelsModal } from './components/ManageChannelsModal';
import { generateSingleFileHtml } from './utils/singleFileGenerator';
import { 
  Search, 
  X, 
  Tv, 
  Sparkles, 
  Heart, 
  Clock, 
  Cast, 
  HelpCircle,
  ExternalLink,
  Filter
} from 'lucide-react';

export default function App() {
  // Lista de canais carregada do localStorage ou do catálogo padrão de 87 canais
  const [canais, setCanais] = useState<CanalTV[]>(() => {
    try {
      const saved = localStorage.getItem('wmt_canais_custom');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Erro ao carregar canais do localStorage:', e);
    }
    return CANAIS_INICIAIS;
  });

  // Canal em reprodução no player
  const [canalAtivo, setCanalAtivo] = useState<CanalTV | null>(null);

  // Favoritos e Assistidos Recentemente (salvos no localStorage)
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('wmt_favs') || '[]');
    } catch {
      return [];
    }
  });

  const [recentes, setRecentes] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('wmt_recentes') || '[]');
    } catch {
      return [];
    }
  });

  // Filtros e Busca
  const [busca, setBusca] = useState<string>('');
  const [estiloSelecionado, setEstiloSelecionado] = useState<string>('Todos');

  // Modais e Modos
  const [isTvMode, setIsTvMode] = useState<boolean>(false);
  const [isCastModalOpen, setIsCastModalOpen] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState<boolean>(false);
  const [canalParaCast, setCanalParaCast] = useState<CanalTV | null>(null);
  const [activeVideoEl, setActiveVideoEl] = useState<HTMLVideoElement | null>(null);

  // Sincronizar URL hash (#canal=ID) ao carregar
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#canal=')) {
        const id = hash.replace('#canal=', '');
        const encontrado = canais.find((c) => c.id === id);
        if (encontrado) {
          setCanalAtivo(encontrado);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [canais]);

  // Salvar favoritos no localStorage
  const handleToggleFavorite = (id: string) => {
    setFavoritos((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('wmt_favs', JSON.stringify(updated));
      return updated;
    });
  };

  // Tocar canal e registrar nos recentes
  const handleSelectChannel = useCallback((canal: CanalTV) => {
    setCanalAtivo(canal);
    window.location.hash = `canal=${canal.id}`;

    // Atualizar recentes (máx 15)
    setRecentes((prev) => {
      const filtrado = prev.filter((id) => id !== canal.id);
      const updated = [canal.id, ...filtrado].slice(0, 15);
      localStorage.setItem('wmt_recentes', JSON.stringify(updated));
      return updated;
    });

    // Scroll suave até o player
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleClosePlayer = useCallback(() => {
    setCanalAtivo(null);
    window.history.pushState(null, '', window.location.pathname);
  }, []);

  // Abrir modal de transmissão
  const handleOpenCastModal = (videoEl: HTMLVideoElement | null, canalOverride?: CanalTV) => {
    const target = canalOverride || canalAtivo;
    if (target) {
      setCanalParaCast(target);
      setActiveVideoEl(videoEl);
      setIsCastModalOpen(true);
    }
  };

  // Alternar Modo TV (Fullscreen)
  const handleToggleTvMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsTvMode(true)).catch(() => {
        setIsTvMode(true);
      });
    } else {
      document.exitFullscreen().then(() => setIsTvMode(false)).catch(() => {
        setIsTvMode(false);
      });
    }
  };

  // Monitorar saída de tela cheia nativa
  useEffect(() => {
    const handleFsChange = () => {
      if (!document.fullscreenElement) {
        setIsTvMode(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Gerar estilos dinamicamente a partir dos canais
  const listaEstilos = useMemo(() => {
    const set = new Set<string>();
    canais.forEach((c) => {
      if (c.estilo) {
        c.estilo.split(',').forEach((item) => {
          const limpo = item.trim();
          if (limpo) set.add(limpo);
        });
      }
    });

    const ordenados = Array.from(set).sort((a, b) => a.localeCompare(b, 'pt-BR'));
    return ['Todos', '⭐ Favoritos', '🕒 Recentes', ...ordenados];
  }, [canais]);

  // Filtragem dos canais por busca e estilo selecionado
  const canaisFiltrados = useMemo(() => {
    return canais.filter((canal) => {
      // Filtro de busca por nome ou categoria
      const termo = busca.toLowerCase().trim();
      const matchBusca =
        !termo ||
        canal.nome.toLowerCase().includes(termo) ||
        (canal.estilo && canal.estilo.toLowerCase().includes(termo)) ||
        (canal.descricao && canal.descricao.toLowerCase().includes(termo));

      if (!matchBusca) return false;

      // Filtros rápidos
      if (estiloSelecionado === 'Todos') return true;
      if (estiloSelecionado === '⭐ Favoritos') return favoritos.includes(canal.id);
      if (estiloSelecionado === '🕒 Recentes') return recentes.includes(canal.id);

      // Filtro por categoria específica
      return canal.estilo && canal.estilo.toLowerCase().includes(estiloSelecionado.toLowerCase());
    });
  }, [canais, busca, estiloSelecionado, favoritos, recentes]);

  // Atualizar canais personalizados
  const handleUpdateChannels = (novosCanais: CanalTV[]) => {
    setCanais(novosCanais);
    localStorage.setItem('wmt_canais_custom', JSON.stringify(novosCanais));
  };

  // Restaurar padrão
  const handleResetChannels = () => {
    setCanais(CANAIS_INICIAIS);
    localStorage.removeItem('wmt_canais_custom');
  };

  // Baixar arquivo HTML autônomo de 1 arquivo
  const handleDownloadSingleFile = () => {
    const htmlContent = generateSingleFileHtml(canais);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wmt-tv-cast.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#080c15] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* CABEÇALHO */}
      <Header
        totalCanais={canais.length}
        isTvMode={isTvMode}
        onToggleTvMode={handleToggleTvMode}
        onOpenGuide={() => setIsGuideModalOpen(true)}
        onOpenManageChannels={() => setIsManageModalOpen(true)}
        onDownloadSingleFile={handleDownloadSingleFile}
        onCastClick={() => {
          if (canalAtivo) {
            handleOpenCastModal(null, canalAtivo);
          } else if (canais.length > 0) {
            handleOpenCastModal(null, canais[0]);
          }
        }}
      />

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* PLAYER ATIVO (QUANDO UM CANAL ESTÁ SELECIONADO) */}
        {canalAtivo && (
          <section className="animate-in fade-in slide-in-from-top-4 duration-300">
            <PlayerView
              canal={canalAtivo}
              onClose={handleClosePlayer}
              onOpenCastModal={(videoEl) => handleOpenCastModal(videoEl, canalAtivo)}
              onSelectChannel={handleSelectChannel}
              todosCanais={canais}
            />
          </section>
        )}

        {/* BARRA DE PESQUISA & FILTROS AUTOMÁTICOS */}
        <section className="space-y-4">
          
          {/* Campo de Busca com Estilo TV & Celular */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Pesquisar canal ou estilo (ex: Desenhos, Clássicos, Rede Brasil, Anime, Fé)..."
              className="w-full pl-12 pr-10 py-3.5 sm:py-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 shadow-inner transition"
            />
            {busca && (
              <button
                onClick={() => setBusca('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Etiquetas / Filtros de Estilo com Scroll Horizontal Suave */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 custom-scroll text-xs">
            {listaEstilos.map((estilo) => {
              const isActive = estiloSelecionado === estilo;
              return (
                <button
                  key={estilo}
                  onClick={() => setEstiloSelecionado(estilo)}
                  className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30 scale-105'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80'
                  }`}
                >
                  {estilo === '⭐ Favoritos' && <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />}
                  {estilo === '🕒 Recentes' && <Clock className="w-3.5 h-3.5 text-cyan-400" />}
                  {estilo}
                </button>
              );
            })}
          </div>

        </section>

        {/* GRADE DE CARDS DOS CANAIS */}
        <section className="space-y-4">
          
          {/* Cabeçalho da Grade */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
                {estiloSelecionado === 'Todos' ? 'Todos os Canais' : estiloSelecionado}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
                {canaisFiltrados.length}
              </span>
            </div>

            {favoritos.length > 0 && estiloSelecionado !== '⭐ Favoritos' && (
              <button
                onClick={() => setEstiloSelecionado('⭐ Favoritos')}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition"
              >
                <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                <span>{favoritos.length} Favoritos</span>
              </button>
            )}
          </div>

          {/* Cards */}
          {canaisFiltrados.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
              {canaisFiltrados.map((canal) => (
                <ChannelCard
                  key={canal.id}
                  canal={canal}
                  isFavorite={favoritos.includes(canal.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onPlay={handleSelectChannel}
                  onQuickCast={(c) => handleOpenCastModal(null, c)}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 space-y-3">
              <Tv className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Nenhum canal encontrado</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Não localizamos canais para a pesquisa "{busca}". Tente buscar por outros termos como Desenhos, Notícias ou Filmes.
              </p>
              <button
                onClick={() => {
                  setBusca('');
                  setEstiloSelecionado('Todos');
                }}
                className="px-4 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 rounded-xl text-xs font-semibold border border-indigo-500/30 transition"
              >
                Limpar filtros
              </button>
            </div>
          )}

        </section>

      </main>

      {/* RODAPÉ */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#060911] px-4 py-8 text-center text-xs text-slate-500 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-medium">
          <button onClick={() => setIsGuideModalOpen(true)} className="hover:text-indigo-400 transition">
            Como Publicar (Blogger / GitHub)
          </button>
          <span>•</span>
          <button onClick={() => setIsManageModalOpen(true)} className="hover:text-indigo-400 transition">
            Carregar lista_tvs.json
          </button>
          <span>•</span>
          <button onClick={handleDownloadSingleFile} className="hover:text-amber-400 transition">
            Baixar Versão Arquivo Único (.html)
          </button>
        </div>
        <p>
          WMT-TV Cast © 2026 • Ferramenta de Catálogo e Espelhamento de Web TVs para Smart TV, Chromecast e AirPlay.
        </p>
      </footer>

      {/* MODAL DE TRANSMISSÃO PARA SMART TV & CHROMECAST */}
      {canalParaCast && (
        <CastModal
          canal={canalParaCast}
          isOpen={isCastModalOpen}
          onClose={() => setIsCastModalOpen(false)}
          videoElement={activeVideoEl}
        />
      )}

      {/* MODO SMART TV & CONTROLE REMOTO D-PAD */}
      <TvModeOverlay
        isActive={isTvMode}
        onToggle={handleToggleTvMode}
        canalAtivo={canalAtivo}
        onSelectChannel={handleSelectChannel}
        todosCanais={canais}
        onClosePlayer={handleClosePlayer}
      />

      {/* MODAL GUIA DE PUBLICAÇÃO & GOOGLE CAST CONSOLE */}
      <PublishGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onDownloadSingleFile={handleDownloadSingleFile}
      />

      {/* MODAL GERENCIAR CANAIS & IMPORTAR JSON */}
      <ManageChannelsModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        canais={canais}
        onUpdateChannels={handleUpdateChannels}
        onResetChannels={handleResetChannels}
        onDownloadSingleFile={handleDownloadSingleFile}
      />

    </div>
  );
}
