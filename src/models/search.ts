import {Track} from './track';

export default class Search {
  constructor(
    readonly tracks: Track[],
  ){}

  public getTracksByTag(tag: string): Track[] {
    return this.tracks.filter(track => track.tags.indexOf(tag) >= 0);
  }
}
