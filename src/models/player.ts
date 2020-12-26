import {Track} from './track';

export type PlayerRepeat = 'repeat' | 'repeat-once' | 'repeat-off';

export interface PlayerState {
  queuedTracks: Track[];
  playingTrack: Track | null;
  repeat: PlayerRepeat;
  volume: number;
  mute: boolean;
}
