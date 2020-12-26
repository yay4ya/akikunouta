import trackJsons from '@/data/tracks.json';
import {Track} from './track';
import {Playlist, PlaylistJson} from './playlist';
import {PlayerState, PlayerRepeat} from './player';


const LOCALSTORAGE_FAVORITE_TRACKS_KEY = 'favorite_tracks';
const LOCALSTORAGE_PLAYLISTS_KEY = 'playlists';
const LOCALSTORAGE_PLAYER_STATE = 'player_state';


class Library {
  readonly tracks: Track[];
  readonly idToTrack: Map<number, Track>;

  constructor() {
    this.tracks = trackJsons.map(trackJson => new Track(trackJson));
    this.idToTrack = new Map(this.tracks.map(track => [track.id, track]));
    this.tracks.map(track => track.isFavorite = this.isFavoriteTrack(track));
  }

  public getTrackById(trackId: number): Track {
    const track = this.idToTrack.get(trackId);
    if (!track) {
      throw new Error("track not found error: " + trackId);
    }
    return track.clone();
  }

  public getTracksByIds(trackIds: number[]): Track[] {
    return trackIds.map(trackId  => this.getTrackById(trackId));
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
          tracks: this.getTracksByIds(playlistJson.trackIds).map(track => track),
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

  public savePlayerState({ queuedTracks, playingTrack, repeat, volume, mute }: PlayerState) {
    const queuedTrackIds = queuedTracks.map(track => track.id);
    const playingTrackId = playingTrack ? playingTrack.id : null;
    const playingTrackIndex = playingTrack ? queuedTracks.map(track => track.uuid).indexOf(playingTrack.uuid) : null;
    localStorage[LOCALSTORAGE_PLAYER_STATE] = JSON.stringify({
      queuedTrackIds: queuedTrackIds,
      playingTrackId: playingTrackId,
      playingTrackIndex: playingTrackIndex,
      repeat: repeat,
      volume: volume,
      mute: mute,
    });
  }

  public loadPlayerState(): PlayerState {
    const state = JSON.parse(localStorage[LOCALSTORAGE_PLAYER_STATE] || 'null');
    if (!state) return {
      queuedTracks: [],
      playingTrack: null ,
      repeat: 'repeat-off',
      volume: 50,
      mute: false,
    };

    const repeat = state.repeat as PlayerRepeat;
    const volume = state.volume as number;
    const mute = state.mute as boolean;
    const queuedTracks = this.getTracksByIds(state.queuedTrackIds as number[]);

    const playingTrackId  = state.playingTrackId as number | null;
    const playingTrackIndex = state.playingTrackIndex as number | null;

    let playingTrack = queuedTracks[playingTrackIndex || -1] || null;
    if (!playingTrack && playingTrackId) {
      playingTrack = this.getTrackById(playingTrackId);
    }

    return {
      queuedTracks: queuedTracks,
      playingTrack: playingTrack,
      repeat: repeat,
      volume: volume,
      mute: mute,
    };
  }

  public clean() {
    localStorage.removeItem(LOCALSTORAGE_PLAYER_STATE);
    localStorage.removeItem(LOCALSTORAGE_FAVORITE_TRACKS_KEY);
    localStorage.removeItem(LOCALSTORAGE_PLAYLISTS_KEY)
  }
}

export const library = new Library()
