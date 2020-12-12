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

  public getDuration(): number {
    return this.end - this.start;
  }
}

export class TrackList {
  protected tracks: Track[];
  protected idToTrack: Map<number, Track>;

  constructor(tracks: Track[]) {
    /* Track ID validation */
    const trackIDs = tracks.map(track => track.id);
    const numTracks = tracks.length;
    const numUniqueTrackIDs = (new Set(trackIDs)).size;
    if (numTracks !== numUniqueTrackIDs) {
      throw new Error("track duplicated error: " + tracks);
    }

    this.tracks = tracks;
    this.idToTrack = new Map(
      tracks.map(track => [track.id, track])
    );
  }

  public setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }

  public getAllTracks(): Track[] {
    return this.tracks;
  }

  public getTrackByID(id: number): Track {
    const track = this.idToTrack.get(id);
    if (track === undefined) {
      throw new Error("track not found: id=" + id);
    }
    return track;
  }

  public getTrackListByVideo(videoId: string): TrackList {
    return new TrackList(this.tracks.filter(
      track => track.video.id === videoId
    ));
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
