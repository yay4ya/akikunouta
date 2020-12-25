declare module 'youtube-iframe-api' {
  export interface YoutubeIframePlayer {
    addEventListener(string, Function): void;
    getCurrentTime(): Promise<number>;
    getDuration(): Promise<number>;
    getVolume(): Promise<number>;
    setVolume(number): Promise<void>;
    mute(): Promise<void>;
    unMute(): Promise<void>;
    isMuted(): Promise<boolean>;
    loadVideoById(any): Promise<void>;
    playVideo(): Promise<void>;
    pauseVideo(): Promise<void>;
    seekTo(number, boolean): Promise<void>;
  }

  export interface YoutubeIframe extends Element {
    player: YoutubeIframePlayer;
  }

  export interface YoutubePlayerState {
    data: number;
  }
}
