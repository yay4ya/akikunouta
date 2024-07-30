import {Track} from './track';

export interface PlaylistJson {
  name: string;
  trackIds: number[];
}

export interface Playlist {
  name: string;
  tracks: Track[];
}

export function getPlaylistUrl(playlist: Playlist): string {
  const params = new URLSearchParams({
    name: playlist.name,
    tracks: playlist.tracks.map(track => track.id).join('-')
  });
  return 'https://yay4ya.github.io/akikunouta/#/videos?' + params.toString();
}
