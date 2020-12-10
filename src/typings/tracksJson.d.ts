import {TrackJson} from '@/polyphony/track';

declare module '@/data/tracks.json' {
  const trackJsons: TrackJson[];
  export default trackJsons;
}
