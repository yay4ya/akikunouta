declare module 'youtube-iframe-api' {
  export interface YoutubeIframePlayer {
    addEventListener(string, Function): void;
    getCurrentTime(): Promise<number>;
    getDuration(): Promise<number>;
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
