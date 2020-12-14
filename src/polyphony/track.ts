import {Video} from '@/polyphony/youtube';
import * as util from '@/util';

export interface TrackJson {
  id: number;
  title: string;
  singer: string;
  artist: string;
  videoid: string;
  publishedAt: string;
  tags: string[];
  start: number;
  end: number;
}

export class Track {
  readonly uuid: string;
  readonly id: number;
  readonly title: string;
  readonly singer: string;
  readonly artist: string;
  readonly video: Video;
  readonly publishedAt: string;
  readonly tags: string[];
  readonly start: number;
  readonly end: number;

  constructor(
    trackJson: TrackJson,
    video: Video | null = null,
    uuid: string | null = null,
  ) {
    this.uuid = uuid || util.generateUuid();
    this.id = trackJson.id;
    this.title = trackJson.title;
    this.singer = trackJson.singer;
    this.artist = trackJson.artist;
    this.publishedAt = trackJson.publishedAt;
    this.tags = trackJson.tags;
    this.start = trackJson.start;
    this.end = trackJson.end;
    this.video = video || new Video(trackJson.videoid);
  }

  public clone(): Track {
    return new Track({
      id: this.id,
      title: this.title,
      singer: this.singer,
      artist: this.artist,
      videoid: this.video.id,
      publishedAt: this.publishedAt,
      tags: this.tags,
      start: this.start,
      end: this.end,
    }, this.video);
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

  constructor(tracks: Track[]) {
    this.tracks = tracks;
  }

  public setTracks(tracks: Track[]) {
    this.tracks = tracks;
  }

  public getAllTracks(): Track[] {
    return this.tracks;
  }

  public getTrackById(id: number): Track {
    const track =  this.tracks.find(track => track.id == id)
    if (track === undefined) {
      throw new Error("track not found: id=" + id);
    }
    return track;
  }

  public getTracksByIds(trackIds: number[]): Track[] {
    return trackIds.map(trackId => this.getTrackById(trackId));
  }

  public getAllUniqueVideos(): Video[] {
    const videoMap = new Map(
      this.tracks.map(track => [track.video.id, track.video])
    );
    return [...videoMap.values()];
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
