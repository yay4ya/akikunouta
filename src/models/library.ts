import trackJsons from '@/data/tracks.json';
import {Track} from './track';


const LOCALSTORAGE_FAVORIT_TRACK_KEY = 'akikun_favorite_tracks';


export class Library {
  readonly tracks: Track[];
  readonly idToTrack: Map<number, Track>;

  constructor() {
    this.tracks = trackJsons.map(trackJson => new Track(trackJson));
    this.idToTrack = new Map(this.tracks.map(track => [track.id, track]));
    this.tracks.map(track => track.isFavorite = this.isFavoriteTrack(track));
  }

  public loadFavoriteTracks(): Track[] {
    const trackIdsJson = localStorage[LOCALSTORAGE_FAVORIT_TRACK_KEY] || '[]';
    const trackIds = JSON.parse(trackIdsJson) as number[];
    return trackIds.map(trackId => {
      const track = this.idToTrack.get(trackId);
      if (!track) {
        throw new Error("track not found error: " + trackId);
      }
      return track;
    });
  }

  private saveTracks(tracks: Track[]) {
    const trackIds = tracks.map(track => track.id);
    const trackIdsJson = JSON.stringify(trackIds);
    localStorage[LOCALSTORAGE_FAVORIT_TRACK_KEY] = trackIdsJson;
  }

  public addFavoriteTrack(track: Track) {
    const favoriteTracks = this.loadFavoriteTracks();
    favoriteTracks.push(track);
    this.saveTracks(favoriteTracks);
  }

  public removeFavoriteTrack(targetTrack: Track) {
    let favoriteTracks = this.loadFavoriteTracks();
    favoriteTracks = favoriteTracks.filter(track => track.id !== targetTrack.id);
    this.saveTracks(favoriteTracks);
  }

  public isFavoriteTrack(targetTrack: Track) {
    const favoriteTracks = this.loadFavoriteTracks();
    const favoriteTrackIds = favoriteTracks.map(track => track.id);
    return favoriteTrackIds.indexOf(targetTrack.id) >= 0;
  }
}

export const library = new Library()
