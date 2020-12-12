<template>
  <v-container>
    <v-row>
      <v-col cols="5" class="left">
        <Player />
        <TrackList
          :trackList="library.getTrackList()"
          id="queue"
        />
      </v-col>
      <v-col cols="7" class="right">
        <TrackList
          :trackList="library.getTrackList()"
        />
      </v-col>
    </v-row>
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
    width: 100%;
  }
</style>
