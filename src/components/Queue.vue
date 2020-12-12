<template>
  <v-container>

  <div class="queue-background">
  </div>

  <draggable
    :list="tracks"
    tag="ul"
    animation="300"
    :group="{name: 'tracks', pull: false}"
    :clone="cloneTrack"
    @change="onChange()"
    class="track-list"
  >
    <li
      v-for="trackWithId in tracks"
      v-bind:key="trackWithId.draggableId"
      v-on:click="onClick(trackWithId)"
      class="track"
    >
      <Track
        :track="trackWithId.track"
      />
      <div class="btn-delete-track">
        <v-btn
          dark
          right
          icon
          width="22"
          height="22"
          @click.stop="deleteTrack(trackWithId)"
        >
          <v-icon size="15">mdi-close</v-icon>
        </v-btn>
      </div>
    </li>
  </draggable>

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import draggable from 'vuedraggable';
  import {Track} from '@/polyphony/track';
  import * as VuexMutation from '@/store/mutation-types';

  let globalDraggableId = 0;

  interface TrackWithId {
    draggableId: number;
    track: Track;
  }

  export default Vue.extend({
    name: 'Queue',
    components: {
      draggable,
      Track: () => import('@/components/Track.vue'),
    },
    data() {
      return {
        tracks: [] as TrackWithId[],
      };
    },
    computed: {
      ...mapState(['playingTrack', 'queue']),
    },
    async created() {
      await Promise.all(this.queue.map(
        (track: Track) => track.fetchVideoInfo()
      )).then(() => this.tracks = this.queue.map(
        (track: Track) => {
          return {
            draggableId: globalDraggableId++,
            track: track,
          };
        }
      ));
    },
    methods: {
      ...mapMutations({
        setPlayingTrack: VuexMutation.SET_PLAYING_TRACK,
        setQueue: VuexMutation.SET_QUEUE,
      }),
      cloneTrack({ track }: TrackWithId): TrackWithId {
        return {
          draggableId: globalDraggableId++,
          track: track,
        };
      },
      onClick({ draggableId, track }: TrackWithId) {
        if (
          this.playingTrack === null
          || this.playingTrack.id !== track.id
        ) {
          this.setPlayingTrack(track);
        }
        this.tracks = this.tracks.filter(
          (trackWithId: TrackWithId) => trackWithId.draggableId !== draggableId
        )
      },
      onChange() {
        this.setQueue(this.tracks.map(
          (trackWithId: TrackWithId) => trackWithId.track
        ));
      },
      deleteTrack({ draggableId }: TrackWithId) {
        this.tracks = this.tracks.filter(
          (trackWithId: TrackWithId) => trackWithId.draggableId !== draggableId
        );
        this.setQueue(this.tracks.map(
          (trackWithId: TrackWithId) => trackWithId.track
        ));
      },
    },
    watch: {
      queue() {
        const tracks = this.queue.map(
          (track: Track) => {
            return {
              draggableId: globalDraggableId++,
              track: track,
            };
          }
        );
        this.tracks = tracks;
      }
    },
  })
</script>

<style scoped lang="scss">
  .container {
    min-width: 350px;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .track-list {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .track {
    margin: 0;
    list-style: none;
    border-bottom: solid 2px #f2f2f2;
    position: relative;

    .btn-delete-track {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
    }

    &:hover .btn-delete-track {
      display: block;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }


</style>
