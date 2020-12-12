<template>
  <v-container>

  <draggable
    v-model="tracks"
    tag="ul"
    animation="300"
    class="track-list"
  >
    <li
      v-for="track in tracks"
      v-bind:key="track.id"
      class="track"
    >
      <Track :track="track"/>
    </li>
  </draggable>

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import draggable from 'vuedraggable';
  import Track from '@/components/Track.vue';

  export default Vue.extend({
    name: 'TrackList',
    props: ['trackList'],
    components: {
      draggable,
      Track,
    },
    data() {
      return {
        tracks: [],
      };
    },
    async created() {
      await this.trackList.fetchAllVideoInfo();
      this.tracks = this.trackList.getAllTracks();
    },
  })
</script>

<style scoped lang="scss">
  .container {
    min-width: 400px;
  }

  .track-list {
    margin: 0;
    padding: 0;
  }

  .track {
    margin: 0;
    list-style: none;
    border-bottom: solid 2px #f2f2f2;
  }

  .track-info {
    width: calc(100% - 120px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .track-info-item {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .v-icon {
        margin-right: 5px;
      }
    }

    .video-info {
      font-size: 0.7em;
    }
  }

  .track-thumbnail {
    margin: 12px;

    .v-image {
      margin: 0 !important;
      width: 165px;
      height: 120px;
      align-items: center;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      overflow: hidden;
    }

    .track-actions {
      position: absolute;
      margin: 0;
      padding: 0;
      top: 0;
      right: 0;

      .v-btn {
        margin: 0;
        padding: 0;
      }
    }

  }
</style>
