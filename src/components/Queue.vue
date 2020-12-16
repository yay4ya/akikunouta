<template>
  <v-container>

  <div class="queue-background">
    <v-icon dark size="120">mdi-tray-plus</v-icon>
  </div>

  <TrackList
    :tracks="queuedTracks"
    :deletable="true"
    :queueing="false"
    :sort="true"
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
  import {Track} from '@/models/track';
  import * as VuexMutation from '@/store/mutation-types';

  export default Vue.extend({
    name: 'Queue',
    components: {
      TrackList: () => import('@/components/TrackList.vue'),
    },
    computed: {
      ...mapState(['playingTrack', 'queuedTracks']),
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
        this.setQueue(tracks.map((track: Track) => track));
      },
      onDeleted(targetTrack: Track) {
        this.setQueue(this.queuedTracks.filter(
          (track: Track) => track.uuid !== targetTrack.uuid
        ))
      },
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

  .queue-background {
    position: absolute;
    width: 100%;
    height: 100;
    top: 50%;

    .v-icon {
      top: 50%;
      left: 50%;
      -webkit-transform : translate(-50%,-50%);
      transform : translate(-50%,-50%);
    }
  }
</style>
