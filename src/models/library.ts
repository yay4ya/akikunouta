import trackJsons from '@/data/tracks.json';
import {Track} from './track';
import {Playlist, PlaylistJson} from './playlist';


const LOCALSTORAGE_FAVORITE_TRACKS_KEY = 'favorite_tracks';
const LOCALSTORAGE_PLAYLISTS_KEY = 'playlists';
const LOCALSTORAGE_QUEUED_TRACKS_KEY = 'queued_tracks';
const LOCALSTORAGE_PLAYING_TRACK_KEY = 'playing_track';


export class Library {
  readonly tracks: Track[];
  readonly idToTrack: Map<number, Track>;

  constructor() {
    this.tracks = trackJsons.map(trackJson => new Track(trackJson));
    this.idToTrack = new Map(this.tracks.map(track => [track.id, track]));
    this.tracks.map(track => track.isFavorite = this.isFavoriteTrack(track));
  }

  public getTracksByIds(trackIds: number[]): Track[] {
    return trackIds.map(trackId => {
      const track = this.idToTrack.get(trackId);
      if (!track) {
        throw new Error("track not found error: " + trackId);
      }
      return track;
    });
  }

  public loadTracks(key: string): Track[] {
    const trackIdsJson = localStorage[key] || '[]';
    const trackIds = JSON.parse(trackIdsJson) as number[];
    return this.getTracksByIds(trackIds);
  }

  private saveTracks(key: string, tracks: Track[]) {
    const trackIds = tracks.map(track => track.id);
    const trackIdsJson = JSON.stringify(trackIds);
    localStorage[key] = trackIdsJson;
  }

  public loadFavoriteTracks(): Track[] {
    return this.loadTracks(LOCALSTORAGE_FAVORITE_TRACKS_KEY);
  }

  public addFavoriteTrack(track: Track) {
    const favoriteTracks = this.loadFavoriteTracks();
    favoriteTracks.unshift(track);
    this.saveTracks(LOCALSTORAGE_FAVORITE_TRACKS_KEY, favoriteTracks);
  }

  public removeFavoriteTrack(targetTrack: Track) {
    let favoriteTracks = this.loadFavoriteTracks();
    favoriteTracks = favoriteTracks.filter(track => track.id !== targetTrack.id);
    this.saveTracks(LOCALSTORAGE_FAVORITE_TRACKS_KEY, favoriteTracks);
  }

  public isFavoriteTrack(targetTrack: Track) {
    const favoriteTracks = this.loadFavoriteTracks();
    const favoriteTrackIds = favoriteTracks.map(track => track.id);
    return favoriteTrackIds.indexOf(targetTrack.id) >= 0;
  }

  public loadPlaylists(): Playlist[] {
    return JSON.parse(localStorage[LOCALSTORAGE_PLAYLISTS_KEY] || '[]').map(
      (playlistJson: PlaylistJson) => {
        return {
          name: playlistJson.name,
          tracks: this.getTracksByIds(playlistJson.trackIds).map(track => track.clone()),
        }
      }
    );
  }

  public savePlaylists(playlists: Playlist[]) {
    const playlistsJson = JSON.stringify(
      playlists.map(playlist => {
        return {
          name: playlist.name,
          trackIds: playlist.tracks.map(track => track.id),
        }
      })
    );
    localStorage[LOCALSTORAGE_PLAYLISTS_KEY] = playlistsJson;
  }

  public existsPlaylist(playlist: Playlist | string) {
    const playlistName = typeof(playlist) == 'string'? playlist : playlist.name;
    const playlists = this.loadPlaylists();
    const playlistNames = playlists.map(playlist => playlist.name);
    return playlistNames.indexOf(playlistName) >= 0;
  }

  public addPlaylist(playlist: Playlist) {
    if (this.existsPlaylist(playlist)) {
      throw new Error("同じ名前のプレイリストが存在します");
    }
    const playlists = this.loadPlaylists()
    playlists.unshift(playlist);
    this.savePlaylists(playlists);
  }

  public removePlaylist(targetPlaylist: Playlist) {
    let playlists = this.loadPlaylists();
    playlists = playlists.filter(playlist => playlist.name !== targetPlaylist.name);
    this.savePlaylists(playlists);
  }

  public getPlaylistByName(name: string): Playlist | null {
    const playlists = this.loadPlaylists();
    const playlist = playlists.find(playlist => playlist.name === name)
    return playlist || null;
  }

  public saveQueuedTracks(tracks: Track[]) {
    this.saveTracks(LOCALSTORAGE_QUEUED_TRACKS_KEY, tracks);
  }

  public loadQueuedTracks() {
    return this.loadTracks(LOCALSTORAGE_QUEUED_TRACKS_KEY);
  }

  public savePlayingTrack(track: Track | null) {
    localStorage[LOCALSTORAGE_PLAYING_TRACK_KEY] = JSON.stringify(track? track.id: null);
  }

  public loadPlayingTrack(): Track | null {
    const trackId = JSON.parse(localStorage[LOCALSTORAGE_PLAYING_TRACK_KEY] || 'null');
    return this.tracks.find(track => track.id === trackId) || null;
  }

  public clean() {
    this.saveTracks(LOCALSTORAGE_QUEUED_TRACKS_KEY, []);
    this.saveTracks(LOCALSTORAGE_FAVORITE_TRACKS_KEY, []);
    this.savePlaylists([]);
    this.savePlayingTrack(null);
  }
}

export const library = new Library()
