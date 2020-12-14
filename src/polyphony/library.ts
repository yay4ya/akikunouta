import trackJsons from '@/data/tracks.json';
import {Track, TrackList} from '@/polyphony/track';


export class Library {
  readonly trackList: TrackList;
  protected favoriteTrackList: TrackList;

  constructor() {
    this.trackList = new TrackList(
      trackJsons.map(trackJson => new Track(trackJson))
    );
    this.favoriteTrackList = new TrackList([]);
  }
}

export const library = new Library()
