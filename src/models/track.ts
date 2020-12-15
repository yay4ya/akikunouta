import {Video} from './youtube';
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

  public async fetchVideoInfo(force = false) {
    await this.video.fetchVideoInfo(force);
  }

  public hasVideoInfo(): boolean {
    return this.video.hasVideoInfo();
  }

  public getDuration(): number {
    return this.end - this.start;
  }
}
