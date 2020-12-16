import trackJsons from '@/data/tracks.json';
import {Track} from './track';


const LOCALSTORAGE_FAVORITE_TRACKS_KEY = 'favorite_tracks';
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

  public loadTracks(key: string): Track[] {
    const trackIdsJson = localStorage[key] || '[]';
    const trackIds = JSON.parse(trackIdsJson) as number[];
    return trackIds.map(trackId => {
      const track = this.idToTrack.get(trackId);
      if (!track) {
        throw new Error("track not found error: " + trackId);
      }
      return track;
    });
  }

  public loadFavoriteTracks(): Track[] {
    return this.loadTracks(LOCALSTORAGE_FAVORITE_TRACKS_KEY);
  }

  private saveTracks(key: string, tracks: Track[]) {
    const trackIds = tracks.map(track => track.id);
    const trackIdsJson = JSON.stringify(trackIds);
    localStorage[key] = trackIdsJson;
  }

  public addFavoriteTrack(track: Track) {
    const favoriteTracks = this.loadFavoriteTracks();
    favoriteTracks.push(track);
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
}

export const library = new Library()
