import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { CanalTV } from '../data/channels';
import { castManager, CastConnectionState } from '../services/castService';
import { 
  Tv, 
  Cast, 
  Share2, 
  Copy, 
  Check, 
  X, 
  ExternalLink, 
  AlertTriangle, 
  Radio, 
  Play, 
  Pause, 
  Square,
  Volume2
} from 'lucide-react';

interface CastModalProps {
  canal: CanalTV;
  isOpen: boolean;
  onClose: () => void;
  videoElement?: HTMLVideoElement | null;
}

export const CastModal: React.FC<CastModalProps> = ({
  canal,
  isOpen,
  onClose,
  videoElement
}) => {
  const [castState, setCastState] = useState<CastConnectionState>('UNAVAILABLE');
  const [deviceName, setDeviceName] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [hasAirplay, setHasAirplay] = useState<boolean>(false);
  const [hasRemotePlayback, setHasRemotePlayback] = useState<boolean>(false);
  const [isCastingThis, setIsCastingThis] = useState<boolean>(false);
  const [castError, setCastError] = useState<string | null>(null);

  // URL para abrir direto na Smart TV
  const tvUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}#canal=${canal.id}`
    : '';

  useEffect(() => {
    if (!isOpen) return;

    // Gerar QR code
    QRCode.toDataURL(tvUrl, {
      width: 260,
      margin: 1.5,
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    }).then(setQrCodeUrl).catch(console.error);

    // Monitorar estado do Cast SDK
    const unsubscribeCast = castManager.subscribeState((state) => {
      setCastState(state);
      setDeviceName(castManager.getDeviceName());
      setIsCastingThis(state === 'CONNECTED');
    });

    // Detectar AirPlay (Safari)
    if (typeof window !== 'undefined') {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      const airplayCapable = Boolean(
        (window as any).WebKitPlaybackTargetAvailabilityEvent || 
        (videoElement && typeof (videoElement as any).webkitShowPlaybackTargetPicker === 'function')
      );
      setHasAirplay(Boolean(isSafari || airplayCapable));

      // Detectar Remote Playback API
      if (videoElement && (videoElement as any).remote && typeof (videoElement as any).remote.prompt === 'function') {
        setHasRemotePlayback(true);
      }
    }

    return () => {
      unsubscribeCast();
    };
  }, [isOpen, tvUrl, videoElement]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tvUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleStartChromecast = async () => {
    setCastError(null);
    if (canal.tipo_link === 'embed') {
      setCastError('Canais em formato iframe/embed não podem ser transmitidos diretamente pelo Cast SDK. Use a opção de transmitir a aba do Chrome abaixo.');
      return;
    }

    try {
      await castManager.loadChannel({
        nome: canal.nome,
        streaming: canal.streaming,
        imagem: canal.imagem,
        estilo: canal.estilo
      });
      setIsCastingThis(true);
    } catch (err: any) {
      console.error('Falha ao iniciar Cast:', err);
      setCastError('Não foi possível conectar ao dispositivo Cast. Verifique se o Chromecast está na mesma rede Wi-Fi e se o site está rodando em HTTPS.');
    }
  };

  const handleAirplay = () => {
    if (videoElement && typeof (videoElement as any).webkitShowPlaybackTargetPicker === 'function') {
      (videoElement as any).webkitShowPlaybackTargetPicker();
    } else {
      alert('AirPlay disponível nativamente em navegadores Safari no Mac, iPhone ou iPad.');
    }
  };

  const handleRemotePrompt = () => {
    if (videoElement && (videoElement as any).remote) {
      (videoElement as any).remote.prompt().catch((e: any) => console.log('Remote playback cancelado', e));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Topo do Modal */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Transmitir para a TV
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  WMT Cast
                </span>
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-[240px] sm:max-w-xs">{canal.nome}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo com scroll */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto custom-scroll text-sm">
          
          {castError && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{castError}</span>
            </div>
          )}

          {/* 1. GOOGLE CAST / CHROMECAST */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Cast className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    Chromecast / Google TV
                    {castState === 'CONNECTED' && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 font-semibold">
                        <Radio className="w-3 h-3 animate-pulse" /> Conectado ({deviceName || 'TV'})
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {canal.tipo_link === 'HLS' 
                      ? 'Transmissão nativa HLS (.m3u8) para dispositivos Cast'
                      : 'Canal embed: use "Transmitir aba" no menu do Chrome'}
                  </p>
                </div>
              </div>
            </div>

            {canal.tipo_link === 'HLS' ? (
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={handleStartChromecast}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition active:scale-95"
                >
                  <Cast className="w-4 h-4" />
                  {castState === 'CONNECTED' ? 'Trocar canal na TV' : 'Conectar e Transmitir'}
                </button>

                {castState === 'CONNECTED' && (
                  <>
                    <button
                      onClick={() => castManager.play()}
                      className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs transition"
                      title="Play"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => castManager.pause()}
                      className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs transition"
                      title="Pausar"
                    >
                      <Pause className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => castManager.endSession()}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Square className="w-3.5 h-3.5" />
                      Desconectar
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-700/50 space-y-1">
                <p className="text-slate-300 font-medium">Como transmitir canais incorporados (YouTube/Embed):</p>
                <ol className="list-decimal list-inside text-[11px] text-slate-400 space-y-0.5">
                  <li>No computador Google Chrome, clique nos três pontos (⋮) no canto superior direito.</li>
                  <li>Clique em <strong>"Transmitir..."</strong> (Cast).</li>
                  <li>Selecione sua TV e escolha <strong>"Transmitir aba"</strong>.</li>
                </ol>
              </div>
            )}
          </div>

          {/* 2. AIRPLAY (SE COMPATÍVEL) */}
          {(hasAirplay || hasRemotePlayback) && canal.tipo_link === 'HLS' && (
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AirPlay & Remote Playback</h4>
                  <p className="text-xs text-slate-400">Apple TV, TVs com AirPlay 2 e receptores</p>
                </div>
              </div>

              <div className="flex gap-2">
                {hasAirplay && (
                  <button
                    onClick={handleAirplay}
                    className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold shadow transition"
                  >
                    AirPlay
                  </button>
                )}
                {hasRemotePlayback && (
                  <button
                    onClick={handleRemotePrompt}
                    className="px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-semibold transition"
                  >
                    Remoto
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 3. ABRIR DIRETO NO NAVEGADOR DA SMART TV (QR CODE & LINK) */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Navegador da Smart TV (Web Browser)</h4>
                <p className="text-xs text-slate-400">Funciona em Samsung (Tizen), LG (webOS), Roku, Android TV e Fire TV</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-1">
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-inner">
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="QR Code do canal" className="w-40 h-40 object-contain" />
                ) : (
                  <div className="w-40 h-40 flex items-center justify-center text-xs text-slate-400">Gerando QR Code...</div>
                )}
                <span className="text-[10px] font-bold text-slate-800 mt-1 uppercase tracking-wider">Aponte a câmera</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <p className="font-semibold text-white">Como abrir na TV:</p>
                <ol className="list-decimal list-inside text-slate-400 space-y-1 text-[11px]">
                  <li>Abra o navegador de internet na sua Smart TV.</li>
                  <li>Escaneie este QR Code com seu celular para compartilhar, ou acesse a URL direta.</li>
                  <li>O canal abrirá direto em tela cheia com navegação pelo controle remoto.</li>
                </ol>

                <div className="pt-2">
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="text" 
                      readOnly 
                      value={tvUrl} 
                      className="flex-1 bg-slate-950 border border-slate-700 px-3 py-1.5 rounded-xl text-[11px] text-slate-300 font-mono select-all truncate"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copiado!' : 'Copiar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Rodapé do Modal */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500">
            Dica: Para uma experiência sem interrupções, certifique-se de que sua TV e o dispositivo estejam conectados à mesma rede Wi-Fi.
          </p>
        </div>

      </div>
    </div>
  );
};
