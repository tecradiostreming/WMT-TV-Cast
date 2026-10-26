/**
 * Google Cast SDK Service & Integration
 * WMT-TV Cast
 * 
 * Gerencia a comunicação com o Chromecast / Google TV através da API Cast Web Sender v1.
 */

declare global {
  interface Window {
    __onGCastApiAvailable?: (isAvailable: boolean) => void;
    cast?: any;
    chrome?: any;
  }
}

export type CastConnectionState = 'UNAVAILABLE' | 'NO_DEVICES' | 'NOT_CONNECTED' | 'CONNECTING' | 'CONNECTED';

export interface CastMediaStatus {
  playerState: 'IDLE' | 'PLAYING' | 'PAUSED' | 'BUFFERING';
  currentTime: number;
  duration: number;
  isMuted: boolean;
  volume: number;
}

class GoogleCastManager {
  private isAvailable: boolean = false;
  private currentSession: any = null;
  private stateListeners: Set<(state: CastConnectionState) => void> = new Set();
  private mediaListeners: Set<(status: CastMediaStatus | null) => void> = new Set();
  private deviceName: string = '';

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Callback exigido pelo Google Cast SDK
    const existingCallback = window.__onGCastApiAvailable;
    window.__onGCastApiAvailable = (isAvailable: boolean) => {
      if (existingCallback) existingCallback(isAvailable);
      if (isAvailable && window.cast && window.cast.framework) {
        this.initializeCastApi();
      }
    };

    // Caso o script já tenha carregado antes deste módulo
    if (window.cast && window.cast.framework) {
      this.initializeCastApi();
    }
  }

  private initializeCastApi() {
    try {
      const castContext = window.cast.framework.CastContext.getInstance();
      
      // Default Media Receiver suporta HLS (.m3u8) nativamente
      castContext.setOptions({
        receiverApplicationId: window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
        resumeSavedSession: true
      });

      this.isAvailable = true;

      // Monitorar estado de conexão com Chromecast
      castContext.addEventListener(
        window.cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        (event: any) => {
          this.notifyState();
        }
      );

      // Monitorar sessão ativa
      castContext.addEventListener(
        window.cast.framework.CastContextEventType.SESSION_STATE_CHANGED,
        (event: any) => {
          const session = castContext.getCurrentSession();
          this.currentSession = session;
          if (session && session.getCastDevice()) {
            this.deviceName = session.getCastDevice().friendlyName || 'Chromecast';
            this.bindSessionMediaEvents(session);
          } else {
            this.deviceName = '';
            this.notifyMedia(null);
          }
          this.notifyState();
        }
      );

      this.notifyState();
    } catch (e) {
      console.warn('Erro ao inicializar Google Cast API:', e);
    }
  }

  private bindSessionMediaEvents(session: any) {
    const mediaSession = session.getMediaSession();
    if (mediaSession) {
      mediaSession.addUpdateListener((isAlive: boolean) => {
        if (!isAlive) {
          this.notifyMedia(null);
          return;
        }
        this.notifyMedia({
          playerState: mediaSession.playerState || 'PLAYING',
          currentTime: mediaSession.currentTime || 0,
          duration: mediaSession.media?.duration || 0,
          isMuted: mediaSession.volume?.muted || false,
          volume: mediaSession.volume?.level || 1
        });
      });
    }
  }

  public getCastState(): CastConnectionState {
    if (!this.isAvailable || !window.cast?.framework) return 'UNAVAILABLE';
    try {
      const state = window.cast.framework.CastContext.getInstance().getCastState();
      const castStates = window.cast.framework.CastState;
      if (state === castStates.NO_DEVICES_AVAILABLE) return 'NO_DEVICES';
      if (state === castStates.NOT_CONNECTED) return 'NOT_CONNECTED';
      if (state === castStates.CONNECTING) return 'CONNECTING';
      if (state === castStates.CONNECTED) return 'CONNECTED';
      return 'NOT_CONNECTED';
    } catch {
      return 'UNAVAILABLE';
    }
  }

  public getDeviceName(): string {
    return this.deviceName;
  }

  public requestSession(): Promise<any> {
    if (!this.isAvailable || !window.cast?.framework) {
      return Promise.reject(new Error('Google Cast SDK não disponível ou navegador sem suporte (use o Google Chrome).'));
    }
    return window.cast.framework.CastContext.getInstance().requestSession();
  }

  public loadChannel(channel: { nome: string; streaming: string; imagem: string; estilo: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      const session = window.cast?.framework?.CastContext?.getInstance()?.getCurrentSession();
      if (!session) {
        // Tentar iniciar sessão se não houver
        this.requestSession()
          .then((newSession: any) => {
            this.sendMediaToSession(newSession, channel).then(resolve).catch(reject);
          })
          .catch(reject);
        return;
      }
      this.sendMediaToSession(session, channel).then(resolve).catch(reject);
    });
  }

  private sendMediaToSession(session: any, channel: { nome: string; streaming: string; imagem: string; estilo: string }): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const mediaInfo = new window.chrome.cast.media.MediaInfo(channel.streaming, 'application/x-mpegURL');
        mediaInfo.streamType = window.chrome.cast.media.StreamType.LIVE;
        
        mediaInfo.metadata = new window.chrome.cast.media.GenericMediaMetadata();
        mediaInfo.metadata.title = channel.nome;
        mediaInfo.metadata.subtitle = channel.estilo;
        mediaInfo.metadata.images = [{ url: channel.imagem }];

        const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
        request.autoplay = true;

        session.loadMedia(request).then(
          () => {
            this.bindSessionMediaEvents(session);
            resolve();
          },
          (errorCode: any) => {
            console.error('Erro ao carregar mídia no Chromecast:', errorCode);
            reject(errorCode);
          }
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  public play(): void {
    const session = window.cast?.framework?.CastContext?.getInstance()?.getCurrentSession();
    const media = session?.getMediaSession();
    if (media) media.play(null, () => {}, () => {});
  }

  public pause(): void {
    const session = window.cast?.framework?.CastContext?.getInstance()?.getCurrentSession();
    const media = session?.getMediaSession();
    if (media) media.pause(null, () => {}, () => {});
  }

  public stop(): void {
    const session = window.cast?.framework?.CastContext?.getInstance()?.getCurrentSession();
    const media = session?.getMediaSession();
    if (media) media.stop(null, () => {}, () => {});
  }

  public endSession(): void {
    const castContext = window.cast?.framework?.CastContext?.getInstance();
    if (castContext) {
      castContext.endCurrentSession(true);
    }
  }

  public subscribeState(listener: (state: CastConnectionState) => void) {
    this.stateListeners.add(listener);
    listener(this.getCastState());
    return () => {
      this.stateListeners.delete(listener);
    };
  }

  public subscribeMedia(listener: (status: CastMediaStatus | null) => void) {
    this.mediaListeners.add(listener);
    return () => {
      this.mediaListeners.delete(listener);
    };
  }

  private notifyState() {
    const state = this.getCastState();
    this.stateListeners.forEach((l) => l(state));
  }

  private notifyMedia(status: CastMediaStatus | null) {
    this.mediaListeners.forEach((l) => l(status));
  }
}

export const castManager = new GoogleCastManager();
