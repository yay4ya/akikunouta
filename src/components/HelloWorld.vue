<template>
  <v-container class="d-flex">
    <div class="left">
      <Player id="video-player"/>
      <Queue id="queue" class="scroll-thin"/>
    </div>
    <div class="right">
      <VideoList :list="library.trackList.getAllUniqueVideos()"/>
      <TrackList
        :trackList="library.trackList"
        :sort="false"
        :put="false"
        pull='clone'
        :queueing="true"
        class="main-track-list scroll-thin"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {mapState} from 'vuex';
  import {library} from '@/polyphony/library';

  export default Vue.extend({
    name: 'HelloWorld',
    components: {
      TrackList: () => import ('@/components/TrackList.vue'),
      VideoList: () => import ('@/components/VideoList.vue'),
      Queue: () => import ('@/components/Queue.vue'),
      Player: () => import ('@/components/Player.vue'),
    },
    data() {
      return {
        library: library,
      }
    },
    computed: {
      ...mapState(['playingTrack']),
    },
  })
</script>

<style scoped lang="scss">
  .container {
    padding: 5px;
    max-width: 1400px;
  }

  .scroll-thin {
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        width: 7px;
        height: 0;
        background-color: #f0f0f0;
      }

      &::-webkit-scrollbar-thumb {
        background: #cdcdcd;
      }
  }

  .left {
    width: 400px;

    #video-player {
      margin-bottom: 10px;
      height: 320px;
      overflow: hidden;
    }

    #queue {
      padding: 0;
      height: calc(100vh - 395px);
      overflow: scroll;
      background-color: #f3f3f3;
    }
  }

  .right {
    display: frex;
    margin-left: 30px;
    width: 100%;
    .main-track-list {
      overflow: scroll;
      height: calc(100vh - 278px);
    }
  }
</style>
