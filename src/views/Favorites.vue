<template>
  <v-container class="d-flex">
    <TrackList
      :tracks="favoriteTracks"
      :put="false"
      :sort="false"
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

  export default Vue.extend({
    name: 'Favorite',
    components: {
      TrackList: () => import ('@/components/TrackList.vue'),
    },
    data() {
      return {
        tracks: library.loadFavoriteTracks(),
      }
    },
    computed: {
      ...mapState(['searchQuery', 'favoriteTracks']),
    },
  });
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
  }
</style>
