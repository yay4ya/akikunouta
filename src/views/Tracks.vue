<template>
  <v-container class="d-flex">

    <TrackList
      :tracks="tracks"
      :sort="false"
      :put="false"
      pull='clone'
      :queueing="true"
      :query="searchQuery"
      :listActions="true"
      class="track-list scroll-thin"
    />
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState} from 'vuex';
  import {library} from '@/models/library';
  import {Track} from '@/models/track';
  import * as util from '@/util';

  export default Vue.extend({
    name: 'Tracks',
    components: {
      TrackList: () => import ('@/components/TrackList.vue'),
    },
    data() {
      return {
        tracks: util.sortTracksByData(library.tracks as Track[], true),
      }
    },
    computed: {
      ...mapState(['searchQuery']),
    },
  });
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
  }
  .track-list {
    overflow: hidden;
  }
</style>
