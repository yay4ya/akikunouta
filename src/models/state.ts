import {Track} from './track';
import {Playlist} from './playlist';
import {PlayerRepeat} from './player';
import Message from './message';

export default interface State {
  queuedTracks: Track[];
  playingTrack: Track | null;
  searchQuery: string;
  favoriteTracks: Track[];
  playlists: Playlist[];
  playerRepeat: PlayerRepeat;
  playerVolume: number;
  playerMute: boolean;
  messages: Message[];
  historyTracks: Track[];
  historyIndex: number;
}
