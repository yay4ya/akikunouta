<template>
  <v-container class="d-flex">
    <TrackList
      :tracks="tracks"
      :sort="false"
      :put="false"
      pull='clone'
      :queueing="true"
      :query="searchQuery"
      class="track-list scroll-thin"
    />
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState} from 'vuex';
  import {library} from '@/models/library';
  import {Track} from '@/models/track';

  export default Vue.extend({
    name: 'HelloWorld',
    components: {
      TrackList: () => import ('@/components/TrackList.vue'),
    },
    data() {
      return {
        tracks: library.tracks.map((track: Track) => track),
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
    overflow: scroll;
    overflow-x: hidden;
  }
</style>
