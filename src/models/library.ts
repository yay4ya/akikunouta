import trackJsons from '@/data/tracks.json';
import {Track} from './track';


export class Library {
  readonly tracks: Track[];
  protected favoriteTracks: Track[];

  constructor() {
    this.tracks = trackJsons.map(trackJson => new Track(trackJson));
    this.favoriteTracks= [];
  }
}

export const library = new Library()
