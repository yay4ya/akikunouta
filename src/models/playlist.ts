import {Track} from './track';

export interface PlaylistJson {
  name: string;
  trackIds: number[];
}

export interface Playlist {
  name: string;
  tracks: Track[];
}
