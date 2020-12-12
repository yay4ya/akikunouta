import Library from '@/polyphony/library';
import {Track} from '@/polyphony/track';

export interface State {
  library: Library;
  queue: Track[];
  history: Track[];
  playingTrack: Track | null;
}
