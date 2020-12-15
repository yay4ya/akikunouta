<template>
  <v-container>

  <div class="queue-background">
  </div>

  <TrackList
    :key="queueChange"
    :trackList="trackList"
    :deletable="true"
    :queueing="false"
    :sort="true"
    :sticky="true"
    pull="clone"
    nowPlayingId="uuid"
    @changed="onChange"
    @deleted="onDeleted"
    class="queued-tracks scroll-thin"
  />

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import {Track, TrackList} from '@/models/track';
  import * as VuexMutation from '@/store/mutation-types';

  export default Vue.extend({
    name: 'Queue',
    components: {
      TrackList: () => import('@/components/TrackList.vue'),
    },
    data() {
      return {
        watchQueue: true,
        queueChange: true,
        trackList: new TrackList([]),
      };
    },
    computed: {
      ...mapState(['playingTrack', 'queuedTracks']),
    },
    async created() {
      await Promise.all(
        this.queuedTracks.map(
          (track: Track) => track.fetchVideoInfo()
        )
      ).then(
        () => this.trackList = new TrackList(this.queuedTracks.map(
          (track: Track) => track
        ))
      );
    },
    methods: {
      ...mapMutations({
        setPlayingTrack: VuexMutation.SET_PLAYING_TRACK,
        setQueue: VuexMutation.SET_QUEUE,
      }),
      cloneTrack(track: Track): Track {
        return track.clone();
      },
      onChange(tracks: Track[]) {
        this.watchQueue = false;

        this.setQueue(tracks.map((track: Track) => track));
      },
      onDeleted(targetTrack: Track) {
        this.watchQueue = false;
        this.setQueue(this.queuedTracks.filter(
          (track: Track) => track.uuid !== targetTrack.uuid
        ))
      },
    },
    watch: {
      queuedTracks() {
        if (this.watchQueue) {
          this.trackList = new TrackList(this.queuedTracks.map(
            (track: Track) => track
          ))
          this.queueChange = !this.queueChange;
        }
        this.watchQueue = true;
      }
    },
  })
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    min-width: 350px;
    position: relative;
    padding: 0;
  }
  .queued-tracks {
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
