<template>
  <v-container class="d-flex">
    <TrackList
      :tracks="library.tracks"
      :sort="false"
      :put="false"
      pull='clone'
      :queueing="true"
      class="track-list scroll-thin"
    />
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {library} from '@/models/library';

  export default Vue.extend({
    name: 'HelloWorld',
    components: {
      TrackList: () => import ('@/components/TrackList.vue'),
    },
    data() {
      return {
        library: library,
      }
    },
    computed: {
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
