<template>
  <v-container>

  <div class="queue-actions">
    <v-btn
      icon
      small
      class="btn-shuffle"
      @click="shuffle"
    >
      <v-icon>mdi-shuffle-variant</v-icon>
    </v-btn>

    <span class="num-queued-tracks">
    {{ playingTrackIndex }} / {{ queuedTracks.length }}
    </span>

    <v-btn
      icon
      small
      class="btn-delete"
      @click="clean"
    >
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </div>

  <div class="queue-list">
    <div class="queue-background">
      <v-icon dark color="rgba(255, 255, 255, 0.6)" size="120">mdi-tray-plus</v-icon>
    </div>

    <TrackList
      :tracks="queuedTracks"
      :deletable="true"
      :queueing="false"
      :sort="true"
      pull="clone"
      nowPlayingId="uuid"
      @changed="onChange"
      @deleted="onDeleted"
      class="queued-tracks scroll-thin"
    />
  </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import {Track} from '@/models/track';
  import * as VuexMutation from '@/store/mutation-types';
  import * as util from '@/util';

  export default Vue.extend({
    name: 'Queue',
    components: {
      TrackList: () => import('@/components/TrackList.vue'),
    },
    computed: {
      ...mapState(['playingTrack', 'queuedTracks']),
      playingTrackIndex() {
        if (!this.playingTrack) return 0;
        return this.queuedTracks.map((track: Track) => track.uuid).indexOf(this.playingTrack.uuid) + 1;
      },
    },
    methods: {
      ...mapMutations({
        setQueue: VuexMutation.SET_QUEUE,
        setPlayingTrack: VuexMutation.SET_PLAYING_TRACK,
      }),
      cloneTrack(track: Track): Track {
        return track.clone();
      },
      onChange(tracks: Track[]) {
        this.setQueue(tracks.map((track: Track) => track));
      },
      onDeleted(targetTrack: Track) {
        this.setQueue(this.queuedTracks.filter(
          (track: Track) => track.uuid !== targetTrack.uuid
        ))
      },
      clean() {
        this.setQueue([]);
      },
      shuffle() {
        let tracks = util.shuffle(this.queuedTracks as Track[]);
        if (
          this.playingTrack
          && tracks.map(track => track.uuid).indexOf(this.playingTrack.uuid) >= 0
        ) {
          tracks = tracks.filter(track => track.uuid !== this.playingTrack.uuid);
          tracks.unshift(this.playingTrack);
        }
        this.setQueue(tracks);

        // scroll the top track on the queue into view
        const queueElement = document.getElementById("queue") as Element;
        const nowPlayingTrackElement = queueElement.getElementsByClassName("track")[0];
        if (nowPlayingTrackElement) {
          nowPlayingTrackElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
    },
  })
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    width: 100%;
    position: relative;
    padding: 0;
  }

  .queue-actions {
    display: flex;
    height: 35px;
    width: 100%;
    justify-content: space-between;
    user-select: none;

    .num-queued-tracks {
      margin: auto;
      color: rgba(100, 100, 100, 0.7);
    }

    .v-btn {
      margin: auto 5px;
      color: rgba(100, 100, 100, 0.5);

      &:hover {
        color: rgba(100, 100, 100, 1.0);
      }
    }

    .btn-delete {
      float: right;
    }
  }

  .queue-list {
    height: calc(100% - 35px);

    .queued-tracks {
      overflow-x: hidden;
      overflow-y: scroll;
    }

    .queue-background {
      position: absolute;
      width: 100%;
      height: 100;
      top: 50%;

      .v-icon {
        top: 50%;
        left: 50%;
        -webkit-transform : translate(-50%,-50%);
        transform : translate(-50%,-50%);
      }
    }
  }
</style>
