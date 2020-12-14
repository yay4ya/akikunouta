import {Track} from '@/polyphony/track';

export interface State {
  queuedTracks: Track[];
  playingTrack: Track | null;
}
