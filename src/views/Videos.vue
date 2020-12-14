<template>
  <v-container class="d-flex">
    <VideoList
      :list ="library.trackList.getAllUniqueVideos()"
      class="video-list scroll-thin"
    />
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {library} from '@/polyphony/library';

  export default Vue.extend({
    name: 'HelloWorld',
    components: {
      VideoList: () => import ('@/components/VideoList.vue'),
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
  }
</style>
