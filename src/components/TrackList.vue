<template>
  <v-container>

  <draggable
    :list="tracks"
    tag="ul"
    animation="200"
    :group="{name: 'tracks', put: put, pull: pull}"
    :clone="cloneTrack"
    :sort="sort"
    @change="onChange"
    class="track-list"
  >
    <li
      v-for="track in tracks"
      v-bind:key="track.uuid"
      class="track"
      v-bind:class="{ nowPlayingTrack: isNowPlaying(track), nowPlayingSticky: isSticky(track) }"
    >
      <Track
        :track="track"
        :deletable="deletable"
        :nowPlayingId="nowPlayingId"
        :stick="sticky"
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
  import {Track, TrackList} from '@/polyphony/track';
  import * as VuexMutation from '@/store/mutation-types';
  import * as VuexAction from '@/store/action-types';

  export default Vue.extend({
    name: 'TrackList',
    props: ['trackList', 'put', 'pull', 'sort', 'queueing',
            'deletable', 'nowPlayingId', 'sticky'],
    components: {
      draggable,
      Track: () => import('@/components/Track.vue'),
    },
    data() {
      return {
        tracks: [] as Track[],
      };
    },
    computed: {
      ...mapState(['playingTrack']),
    },
    async created() {
      const trackList = this.trackList as TrackList;
      const tracks = trackList.getAllTracks();

      await Promise.all(
        tracks.map(
          track => track.fetchVideoInfo()
        )
      ).then(
        () => this.tracks = tracks.map((track: Track) => track)
      );
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
      isSticky(track: Track): boolean {
        return this.isNowPlaying(track) && this.sticky;
      },
      cloneTrack(track: Track): Track {
        return track.clone();
      },
      onChange() {
        this.$emit('changed', this.tracks);
      },
      onClick(targetTrack: Track) {
        this.setPlayingTrack(targetTrack);
        if (!this.queueing) {
          return;
        }
        this.setQueue(this.tracks.map((track: Track) => track));
      },
      deleteTrack(targetTrack: Track) {
        this.tracks = this.tracks.filter(
          (track: Track) => track.uuid !== targetTrack.uuid
        );
        this.$emit('deleted', targetTrack);
      },
    }
  })
</script>

<style lang="scss">
  .track-list {
    .nowPlayingSticky {
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .nowPlayingTrack {
      .v-card:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        pointer-events: none;
      }
    }
  }
</style>

<style scoped lang="scss">
  .container {
    min-width: 350px;
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
</style>
