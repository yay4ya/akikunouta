<template>
  <v-container>
    <div class="left">
      <Player id="video-player" />
      <v-divider class="player-queue-devider"></v-divider>
      <TrackList
        :trackList="library.getTrackList()"
        id="queue"
      />
    </div>
    <div class="right">
      <VideoList :videos="library.getVideos()"/>
      <TrackList
        :trackList="library.getTrackList()"
      />
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {mapState} from 'vuex';
  import Player from '@/components/Player.vue';

  export default Vue.extend({
    name: 'HelloWorld',
    components: {
      TrackList: () => import ('@/components/TrackList.vue'),
      VideoList: () => import ('@/components/VideoList.vue'),
      Player,
    },
    computed: {
      ...mapState(['library']),
    },
    methods: {
    }
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

    .player-queue-devider {
      margin: 10px 0;
    }

    #queue {
      height: calc(100% - 400px);
      position: relative;
      overflow: scroll;
    }
  }

  .right {
    margin-left: 420px;
  }
</style>
