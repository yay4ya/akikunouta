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
  />

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import {Track, TrackList} from '@/polyphony/track';
  import * as VuexMutation from '@/store/mutation-types';

  export default Vue.extend({
    name: 'Queue',
    components: {
      TrackList: () => import('@/components/TrackList.vue'),
    },
    data() {
      return {
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
        this.setQueue(tracks);
      }
    },
    watch: {
      queuedTracks() {
        this.trackList = new TrackList(this.queuedTracks.map((track: Track) => track));
        this.queueChange = !this.queueChange;
      }
    },
  })
</script>

<style scoped lang="scss">
  .container {
    min-width: 350px;
    position: relative;
    padding: 0;
  }
</style>
