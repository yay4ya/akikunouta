import {Track} from './track';
import {Playlist} from './playlist';

export default interface State {
  queuedTracks: Track[];
  playingTrack: Track | null;
  searchQuery: string;
  favoriteTracks: Track[];
  playlists: Playlist[];
}
