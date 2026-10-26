import React, { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import { CanalTV } from '../data/channels';
import { 
  Tv, 
  Play, 
  Pause, 
  RotateCcw, 
  ExternalLink, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  AlertTriangle, 
  Cast, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  X,
  Radio,
  Share2,
  List
} from 'lucide-react';

interface PlayerViewProps {
  canal: CanalTV;
  onClose: () => void;
  onOpenCastModal: (videoEl: HTMLVideoElement | null) => void;
  onSelectChannel: (canal: CanalTV) => void;
  todosCanais: CanalTV[];
}

export const PlayerView: React.FC<PlayerViewProps> = ({
  canal,
  onClose,
  onOpenCastModal,
  onSelectChannel,
  todosCanais
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showChannelList, setShowChannelList] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<'contain' | 'cover'>('contain');

  // Encontrar índice do canal atual para próxima / anterior
  const currentIndex = todosCanais.findIndex((c) => c.id === canal.id);
  const prevCanal = currentIndex > 0 ? todosCanais[currentIndex - 1] : todosCanais[todosCanais.length - 1];
  const nextCanal = currentIndex < todosCanais.length - 1 ? todosCanais[currentIndex + 1] : todosCanais[0];

  // Iniciar reprodução do stream
  const setupPlayback = useCallback(() => {
    setIsLoading(true);
    setErrorDetails(null);

    // Se for iframe embed
    if (canal.tipo_link === 'embed') {
      setIsLoading(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    // Destruir instância anterior do Hls
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Verificar se o link é HTTP rodando em HTTPS (Conteúdo Misto bloqueado pelo navegador)
    const isMixedContent = window.location.protocol === 'https:' && canal.streaming.startsWith('http://');

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60,
        maxBufferLength: 30,
        fragLoadingTimeOut: 15000,
        manifestLoadingTimeOut: 15000,
      });

      hlsRef.current = hls;
      hls.loadSource(canal.streaming);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().then(() => setIsPlaying(true)).catch((e) => {
          console.warn('Autoplay bloqueado pelo navegador (clique para dar play):', e);
          setIsPlaying(false);
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          setIsLoading(false);
          console.error('Erro Fatal HLS:', data.type, data.details);
          
          if (isMixedContent) {
            setErrorDetails(
              'Este sinal utiliza protocolo HTTP não criptografado em uma página segura HTTPS (Conteúdo Misto bloqueado pelo navegador). Tente abrir o link direto ou em nova aba.'
            );
          } else if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
            setErrorDetails(
              'Falha de rede ou bloqueio por política CORS. O servidor de origem deste canal pode estar offline ou restringindo a exibição.'
            );
          } else {
            setErrorDetails('Erro ao decodificar a transmissão de vídeo. O formato pode estar incompatível.');
          }

          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              hls.destroy();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Suporte nativo em Safari / iOS
      video.src = canal.streaming;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      });
      video.addEventListener('error', () => {
        setIsLoading(false);
        setErrorDetails('Não foi possível carregar a transmissão no player nativo.');
      });
    } else {
      setIsLoading(false);
      setErrorDetails('Seu navegador não possui suporte para reprodução de vídeo HLS.');
    }
  }, [canal.streaming, canal.tipo_link, retryCount]);

  useEffect(() => {
    setupPlayback();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [setupPlayback]);

  // Controles de Play/Pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.error);
    }
  };

  const togglePictureInPicture = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (video.requestPictureInPicture) {
        await video.requestPictureInPicture();
      }
    } catch (e) {
      console.warn('PiP indisponível:', e);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl transition-all duration-300"
    >
      {/* Container do Vídeo (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
        
        {/* PLAYER HLS */}
        {canal.tipo_link === 'HLS' && (
          <video
            ref={videoRef}
            className={`w-full h-full ${aspectRatio === 'contain' ? 'object-contain' : 'object-cover'}`}
            playsInline
            controls={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        )}

        {/* PLAYER EMBED (IFRAME) */}
        {canal.tipo_link === 'embed' && (
          <iframe
            src={canal.streaming}
            title={canal.nome}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        )}

        {/* Indicador de Transmissão ao Vivo no Canto Superior */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600/90 text-white backdrop-blur-md shadow-lg shadow-red-600/30">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            AO VIVO
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-slate-300 backdrop-blur-md border border-white/10">
            {canal.tipo_link}
          </span>
        </div>

        {/* Botão de Fechar Rápido no Canto Superior Direito */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white backdrop-blur-md border border-white/10 transition active:scale-95"
          title="Fechar player"
        >
          <X className="w-5 h-5" />
        </button>

        {/* TELA DE CARREGAMENTO */}
        {isLoading && !errorDetails && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm gap-3">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin shadow-lg" />
            <div className="text-center">
              <p className="text-sm font-semibold text-white">Sintonizando canal...</p>
              <p className="text-xs text-slate-400 mt-0.5">{canal.nome}</p>
            </div>
          </div>
        )}

        {/* MENSAGEM DE ERRO COM DIAGNÓSTICO E RETRY */}
        {errorDetails && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-lg">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="max-w-md">
              <h3 className="text-lg font-bold text-white">Falha ao reproduzir sinal de TV</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{errorDetails}</p>
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center">
              <button
                onClick={() => {
                  setErrorDetails(null);
                  setRetryCount((prev) => prev + 1);
                }}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
              >
                <RotateCcw className="w-4 h-4" />
                Tentar novamente
              </button>
              <a
                href={canal.streaming}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2 transition"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir stream direto
              </a>
              <button
                onClick={() => onSelectChannel(nextCanal)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl flex items-center gap-2 transition"
              >
                Próximo canal &rarr;
              </button>
            </div>
          </div>
        )}

        {/* OVERLAY DE TROCA RÁPIDA DE CANAL (QUICK ZAP) */}
        {showChannelList && (
          <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md p-6 flex flex-col animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <List className="w-4 h-4 text-indigo-400" />
                Troca Rápida de Canais (Zapping)
              </h4>
              <button
                onClick={() => setShowChannelList(false)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 overflow-y-auto mt-4 custom-scroll flex-1">
              {todosCanais.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectChannel(c);
                    setShowChannelList(false);
                  }}
                  className={`p-2.5 rounded-xl text-left border flex items-center gap-2.5 transition ${
                    c.id === canal.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <img
                    src={c.imagem}
                    alt={c.nome}
                    className="w-9 h-9 rounded-lg object-cover bg-slate-800 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="truncate">
                    <div className="text-xs font-bold truncate text-white">{c.nome}</div>
                    <div className="text-[10px] text-slate-400 truncate">{c.estilo}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BARRA INFERIOR DE CONTROLES DO CANAL & TRANSMISSÃO */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-900/90 to-slate-950 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80">
        
        {/* Info do Canal */}
        <div className="flex items-center gap-3.5">
          <img
            src={canal.imagem}
            alt={canal.nome}
            className="w-12 h-12 rounded-2xl object-cover bg-slate-800 border border-slate-700/80 shadow-md shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&auto=format&fit=crop&q=80';
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{canal.nome}</h2>
            </div>
            <p className="text-xs text-indigo-400 font-medium line-clamp-1 mt-0.5">
              {canal.estilo}
            </p>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex items-center flex-wrap gap-2">
          
          {/* Navegação Entre Canais (Anterior / Próximo) */}
          <div className="flex items-center bg-slate-800/80 rounded-xl p-0.5 border border-slate-700/60">
            <button
              onClick={() => onSelectChannel(prevCanal)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
              title={`Anterior: ${prevCanal.nome}`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowChannelList(!showChannelList)}
              className="px-2.5 py-1 text-xs font-semibold text-slate-300 hover:text-white transition flex items-center gap-1"
              title="Abrir lista de canais para troca rápida"
            >
              <List className="w-3.5 h-3.5 text-indigo-400" />
              Zapping
            </button>
            <button
              onClick={() => onSelectChannel(nextCanal)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition"
              title={`Próximo: ${nextCanal.nome}`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Controles de Reprodução para HLS */}
          {canal.tipo_link === 'HLS' && (
            <>
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title={isMuted ? 'Ativar som' : 'Mudo'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setAspectRatio(aspectRatio === 'contain' ? 'cover' : 'contain')}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition text-xs font-mono"
                title="Ajustar proporção (Conter / Preencher)"
              >
                <Layers className="w-4 h-4" />
              </button>

              <button
                onClick={togglePictureInPicture}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                title="Picture-in-Picture (Janela flutuante)"
              >
                <Tv className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Botão de Tela Cheia */}
          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            title="Tela Cheia"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* DESTAQUE PRINCIPAL: TRANSMITIR PARA TV */}
          <button
            onClick={() => onOpenCastModal(videoRef.current)}
            className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/25 flex items-center gap-2 transition active:scale-95"
          >
            <Cast className="w-4 h-4" />
            <span>Transmitir para TV</span>
          </button>

        </div>
      </div>
    </div>
  );
};
