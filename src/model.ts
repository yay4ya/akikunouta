import Library from '@/polyphony/library';
import {Track} from '@/polyphony/track';

export interface State {
  library: Library;
  playingTrack: Track | null;
}
