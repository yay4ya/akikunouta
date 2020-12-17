<template>
  <v-container>

  <draggable
    :list="loadedTracks"
    tag="ul"
    animation="200"
    :group="{name: 'tracks', put: put, pull: pull}"
    :clone="cloneTrack"
    :sort="sort"
    handle=".handle"
    @change="onChange"
    class="track-list"
  >
    <li
      v-for="track in loadedTracks"
      v-bind:key="track.uuid"
      class="track"
      v-bind:class="{ nowPlayingTrack: isNowPlaying(track) }"
      v-bind:style="{ display: track.match(updatedQuery)? 'block' : 'none' }"
    >
      <Track
        :track="track"
        :deletable="deletable"
        :nowPlayingId="nowPlayingId"
        :queueing="queueing"
        @clicked="onClick"
        @deleted="deleteTrack"
      />
    </li>
  </draggable>

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations, mapActions} from 'vuex';
  import draggable from 'vuedraggable';
  import * as VuexMutation from '@/store/mutation-types';
  import * as VuexAction from '@/store/action-types';
  import {Track} from '@/models/track';

  export default Vue.extend({
    name: 'TrackList',
    props: ['tracks', 'put', 'pull', 'sort', 'queueing',
            'deletable', 'nowPlayingId', 'query'],
    components: {
      draggable,
      Track: () => import('@/components/Track.vue'),
    },
    data() {
      return {
        loadedTracks: [] as Track[],
        updatedQuery: "",
      };
    },
    computed: {
      ...mapState(['playingTrack']),
      filteredTracks(): Track[] {
        return this.loadedTracks.filter(track => track.match(this.updatedQuery));
      },
    },
    async created() {
      const tracks = this.tracks as Track[];
      const videoMap = new Map(tracks.map(track => [track.video.id, track.video]));
      const videos = [...videoMap.values()];
      await Promise.all(videos.map(video => video.fetchVideoInfo()));
      await Promise.all(tracks.map(track => track.fetchVideoInfo()));
      this.loadedTracks = tracks.map(track => track);

    },
    methods: {
      ...mapMutations({
        setPlayingTrack: VuexMutation.SET_PLAYING_TRACK,
        setQueue: VuexMutation.SET_QUEUE,
      }),
      ...mapActions({
        setNextTrack: VuexAction.SET_NEXT_TRACK,
      }),
      isNowPlaying(track: Track): boolean {
        if (!this.playingTrack) {
          return false;
        }
        let isNowPlaying = false;
        if (this.nowPlayingId === "uuid") {
          isNowPlaying = track.uuid === this.playingTrack.uuid;
        } else {
          isNowPlaying = track.id === this.playingTrack.id;
        }
        return isNowPlaying;
      },
      cloneTrack(track: Track): Track {
        return track.clone();
      },
      onChange() {
        this.$emit('changed', this.filteredTracks.map(track => track));
      },
      onClick(targetTrack: Track) {
        this.setPlayingTrack(targetTrack);
        if (!this.queueing) {
          return;
        }
        this.setQueue(this.filteredTracks.map((track: Track) => track));
      },
      deleteTrack(targetTrack: Track) {
        this.loadedTracks= this.loadedTracks.filter(
          (track: Track) => track.uuid !== targetTrack.uuid
        );
        this.$emit('deleted', targetTrack);
      },
    },
    watch: {
      query() {
        this.updatedQuery = this.query;
      },
      async tracks() {
        const tracks = this.tracks as Track[];
        const videoMap = new Map(tracks.map(track => [track.video.id, track.video]));
        const videos = [...videoMap.values()];
        await Promise.all(videos.map(video => video.fetchVideoInfo()));
        await Promise.all(tracks.map(track => track.fetchVideoInfo()));
        this.loadedTracks = tracks.map(track => track);
      }
    },
  })
</script>

<style lang="scss">
  .track-list {
    height:100%;

    .nowPlayingTrack {
      .v-card:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(196, 255, 156, 0.2);
        pointer-events: none;
      }
    }
  }
</style>

<style scoped lang="scss">
  .container {
  }

  .track-list {
    margin: 0;
    padding: 0;
  }

  .track {
    margin: 0;
    list-style: none;
    border-bottom: solid 2px #f2f2f2;
    height: 85px;
  }
</style>
