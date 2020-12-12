import trackJsons from '@/data/tracks.json';
import {Track, TrackList} from '@/polyphony/track';
import {Video} from '@/polyphony/youtube';

export default class Library {
  protected trackList: TrackList;

  constructor() {
    this.trackList = new TrackList(
      trackJsons.map(trackJson => new Track(trackJson))
    );
  }

  public getTrackByID(id: number): Track {
    return this.trackList.getTrackByID(id);
  }

  public getTracksByIDs(ids: number[]): Track[] {
    return ids.map(id => this.getTrackByID(id));
  }

  public getTrackList(): TrackList {
    return this.trackList;
  }

  public getVideos(): Video[] {
    const tracks = this.trackList.getAllTracks();
    const videoMap = new Map(tracks.map(
      track => [track.video.id, track.video]
    ));
    return [...videoMap.values()]
  }

  public searchTrack(query: string): TrackList {
    return this.trackList.filter(query);
  }
}
