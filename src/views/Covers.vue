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
      class="track-list"
    />
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState} from 'vuex';
  import {library} from '@/models/library';
  import Search from '@/models/search';
  import * as util from '@/util';

  export default Vue.extend({
    name: 'Covers',
    components: {
      TrackList: () => import ('@/components/TrackList.vue'),
    },
    data() {
      return {
        tracks: new Search(util.sortTracksByDate(library.tracks, true)).getTracksByTag("歌ってみた"),
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
</style>
