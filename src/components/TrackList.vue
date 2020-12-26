<template>
  <v-container>
    <div class="list-actions" v-if="listActions">
      <div class="list-actions-left">
        <v-btn
          v-if="queueing"
          icon
          small
          class="btn-shuffle"
          @click="addFilteredTracksToQueue"
        >
          <v-icon size="20">mdi-plus</v-icon>
        </v-btn>

        <v-btn
          icon
          small
          class="btn-shuffle"
          @click="shuffle"
        >
          <v-icon size="20">mdi-shuffle-variant</v-icon>
        </v-btn>

        <v-btn
          icon
          small
          class="btn-repeat"
          @click="repeat"
        >
          <v-icon size="20"> mdi-repeat </v-icon>
        </v-btn>
      </div>

      <div class="list-actions-center">
        <span> {{ filteredTracks.length }} 曲 </span>
      </div>

      <div class="list-actions-right">
        <v-btn
          icon
          small
          class="btn-repeat"
          @click="loadedTracks.reverse()"
        >
          <v-icon size="20"> mdi-swap-vertical </v-icon>
        </v-btn>
      </div>
    </div>

    <div class="track-list-container scroll-thin">
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
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations, mapActions} from 'vuex';
  import draggable from 'vuedraggable';
  import * as VuexMutation from '@/store/mutation-types';
  import * as VuexAction from '@/store/action-types';
  import * as util from '@/util';
  import {Track} from '@/models/track';

  export default Vue.extend({
    name: 'TrackList',
    props: ['tracks', 'put', 'pull', 'sort', 'queueing',
            'deletable', 'nowPlayingId', 'query', 'listActions'],
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
        addToQueue: VuexMutation.ADD_TO_QUEUE,
        setPlayerRepeat: VuexMutation.SET_PLAYER_REPEAT,
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
      addFilteredTracksToQueue() {
        this.filteredTracks.map(track => this.addToQueue(track.clone()));
      },
      shuffle() {
        if (this.filteredTracks.length < 1) return;
        const tracks = util.shuffle(this.filteredTracks.map(track => track.clone()));
        this.setPlayingTrack(tracks[0] || null);
        this.setQueue(tracks);
      },
      repeat() {
        if (this.filteredTracks.length < 1) return;
        const tracks = this.filteredTracks.map(track => track.clone());
        this.setPlayerRepeat('repeat');
        this.setPlayingTrack(tracks[0] || null);
        this.setQueue(tracks);
      }
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
    display: flex;
    flex-direction: column;
  }

  .list-actions {
    display: flex;
    height: 35px;
    width: 100%;
    justify-content: space-between;
    user-select: none;
    color: rgba(100, 100, 100, 0.7);

    div {
      margin: auto 5px;
      width: 30%;
    }

    .list-actions-center {
      text-align: center;
    }

    .v-btn {
      color: rgba(100, 100, 100, 0.5);

      &:hover {
        color: rgba(100, 100, 100, 1.0);
      }
    }

    .list-actions-right{
      text-align: right;
      float: right;
    }
  }


  .track-list-container {
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
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
