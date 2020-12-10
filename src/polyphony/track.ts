import {Video} from '@/polyphony/youtube';

export interface TrackJson {
  id: number;
  title: string;
  artist: string;
  videoid: string;
  start: number;
  end: number;
}

export class Track {
  readonly id: number;
  readonly title: string;
  readonly artist: string;
  readonly video: Video;
  readonly start: number;
  readonly end: number;

  constructor(trackJson: TrackJson) {
    this.id = trackJson.id;
    this.title = trackJson.title;
    this.artist = trackJson.artist;
    this.start = trackJson.start;
    this.end = trackJson.end;
    this.video = new Video(trackJson.videoid);
  }

  public async fetchVideoInfo() {
    await this.video.fetchVideoInfo();
  }
}

export class TrackList {
  protected tracks: Track[];

  constructor(tracks: Track[]) {
    this.tracks = tracks;

    /* Track ID validation */
    const trackIDs = tracks.map(track => track.id);
    const numTracks = tracks.length;
    const numUniqueTrackIDs = (new Set(trackIDs)).size;
    if (numTracks !== numUniqueTrackIDs) {
      throw new Error("track duplicated error: " + tracks);
    }
  }

  public setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }

  public getAllTracks(): Track[] {
    return this.tracks;
  }

  public getTrackByID(id: number): Track {
    const filteredTracks = this.tracks.filter(
      track => track.id == id
    );
    if (filteredTracks.length === 0) {
      throw new Error("track not found error: id=" + id);
    }
    if (filteredTracks.length > 1) {
      throw new Error("track duplicated error: id=" + id);
    }
    return filteredTracks[0];
  }

  public filter(query: string): TrackList {
    const tracks = this.tracks;
    return new TrackList(tracks.filter(track => {
      const target = [
        "id:" + track.video.id,
        "title:" + track.title,
        "artist:" + track.artist,
        "video:" + track.video.id,
        "video:" + track.video.getTitle(),
        "channel:" + track.video.getChannel().name,
      ].join(' ');
      return target.indexOf(query) > -1;
    }));
  }

  public async fetchAllVideoInfo() {
    await Promise.all(this.tracks.map(track => track.fetchVideoInfo()));
  }
}
