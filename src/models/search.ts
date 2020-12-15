import {Track} from './track';

export default class Search {
  constructor(
    readonly tracks: Track[],
  ){}

  public getTracksByTag(tag: string): Track[] {
    return this.tracks.filter(track => track.tags.indexOf(tag) >= 0);
  }

  public getTracksByQuery(query: string): Track[] {
    return this.tracks.filter(track => {
      const videoTitle = track.video.getTitle() || '';

      const channel = track.video.getChannel();
      const channelName = channel? channel.name : '';

      const target = [
        track.title,
        track.singer,
        track.artist,
        videoTitle,
        channelName,
      ].join('  ').toLowerCase();
      return target.indexOf(query) >= 0;
    });
  }
}
