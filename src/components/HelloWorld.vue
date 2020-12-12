<template>
  <v-container>
    <div class="left">
      <Player id="video-player" />
      <div class="playing-track-wrapper">
        <Track v-if="playingTrack !== null"
          :track="playingTrack"
          id="playing-track"
        />
      </div>
      <Queue id="queue"/>
    </div>
    <div class="right">
      <VideoList :list="library.getVideos()"/>
      <TrackList
        :list="library.getTrackList().getAllTracks()"
        :sort="false"
        :put="false"
        pull='clone'
        :queueing="true"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {mapState} from 'vuex';

  export default Vue.extend({
    name: 'HelloWorld',
    components: {
      Track: () => import ('@/components/Track.vue'),
      TrackList: () => import ('@/components/TrackList.vue'),
      VideoList: () => import ('@/components/VideoList.vue'),
      Queue: () => import ('@/components/Queue.vue'),
      Player: () => import ('@/components/Player.vue'),
    },
    computed: {
      ...mapState(['library', 'playingTrack']),
    },
  })
</script>

<style scoped lang="scss">
  .container {
    padding: 5px;
    max-width: 1200px;
  }

  .left {
    position: fixed;
    width: 400px;
    height: 100vh;

    #video-player {
      margin-bottom: 10px;
    }

    .playing-track-wrapper {
      width: calc(100% - 7px);
      height: 84px;
      background-color: #f3f3f3;

      #playing-track {
        position: relative;
      }
    }

    #queue {
      padding: 0;
      height: calc(100% - 460px);
      position: relative;
      overflow: scroll;

      scrollbar-width: thin;

      &::-webkit-scrollbar {
        width: 7px;
        height: 0;
        background-color: #f0f0f0;
      }

      &::-webkit-scrollbar-thumb {
        background: #cdcdcd;
      }

      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f3f3f3;
      }
    }
  }

  .right {
    margin-left: 420px;
  }
</style>
