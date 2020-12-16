import {Track} from './track';

export default interface State {
  queuedTracks: Track[];
  playingTrack: Track | null;
  searchQuery: string;
  favoriteTracks: Track[];
}
