<template>
  <v-container>
    <div class="left">
      <Player id="video-player" />
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
  $player-width: 430px;

  .container {
    max-width: 1400px;
  }

  .left {
    position: fixed;
    width: $player-width;
    height: 100vh;

    #video-player {
      height: 350px;
    }
    #queue {
      height: calc(100vh - 400px);
      position: relative;
      overflow: scroll;
    }
  }

  .right {
    margin-left: $player-width;
  }
</style>
