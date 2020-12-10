<template>
  <v-container>
    <TrackList :trackList="library.getTrackList()" />
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {mapState} from 'vuex';
  import TrackList from '@/components/TrackList.vue';

  export default Vue.extend({
    name: 'HelloWorld',
    components: {
      TrackList,
    },
    computed: {
      ...mapState(['library']),
    }
  })
</script>
