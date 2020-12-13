import axios from 'axios';

export type ThumbnailQuality = 'default' | 'mqdefault' | 'hqdefault';

export class Channel {
  constructor(
    readonly url: string,
    readonly name: string,
  ) {}
}

export class Video {
  readonly id: string;
  protected url: string | null = null;
  protected title: string | null = null;
  protected channel: Channel | null = null;

  constructor(id: string) {
    this.id = id;
  }

  public async fetchVideoInfo() {
    if (
      this.url !== null
      && this.title !== null
      && this.channel !== null
    ) {
      return;
    }

    const url = "https://noembed.com/embed?url=https://www.youtube.com/watch?v=" + this.id;
    await axios.get(url).then(response => {
      if (response.status !== 200) {
        throw new Error("failed to fetch video info: " + response);
      }

      if (response.data.error !== undefined) {
        throw new Error("failed to fetch video info: " + response.data);
      }

      this.url = response.data.url;
      this.title = response.data.title;
      this.channel = new Channel(response.data.author_url, response.data.author_name);
    });
  }

  public getTitle(): string {
    if (this.title === null) {
      throw new Error("video info not fetched");
    }
    return this.title;
  }

  public getURL(): string {
    if (this.url === null) {
      throw new Error("video info not fetched");
    }
    return this.url;
  }

  public getChannel(): Channel {
    if (this.channel === null) {
      throw new Error("video info not fetched");
    }
    return this.channel;
  }

  public getThumbnailURL(quality: ThumbnailQuality): string {
    return 'https://i.ytimg.com/vi/' + this.id + '/' + quality + '.jpg'
  }
}
