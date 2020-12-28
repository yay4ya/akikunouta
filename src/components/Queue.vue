<template>
  <v-container>

  <div class="queue-actions">
    <div class="queue-actions-left">
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
        class="btn-loop"
        @click="togglePlayerRepeat"
      >
        <v-icon size="20"> {{ repeatIcon }} </v-icon>
      </v-btn>
    </div>

    <div class="queue-actions-center">
      <span class="num-queued-tracks" v-on:click="scrollPlayingTrackIntoView">
      {{ playingTrackIndex }} / {{ queuedTracks.length }}
      </span>
    </div>

    <div class="queue-actions-right">
      <v-btn
        icon
        small
        class="btn-delete"
        @click="clean"
      >
        <v-icon size="20">mdi-delete</v-icon>
      </v-btn>
    </div>
  </div>

  <div class="queue-list">
    <div class="queue-background">
      <v-icon dark color="rgba(255, 255, 255, 0.6)" size="100">mdi-tray-plus</v-icon>
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
      ...mapState(['playingTrack', 'queuedTracks', 'playerRepeat']),
      playingTrackIndex(): number {
        if (!this.playingTrack) return 0;
        return this.queuedTracks.map((track: Track) => track.uuid).indexOf(this.playingTrack.uuid) + 1;
      },
      repeatIcon(): string {
        if (this.playerRepeat === 'repeat-off') return 'mdi-repeat-off';
        else if (this.playerRepeat === 'repeat') return 'mdi-repeat';
        else if (this.playerRepeat === 'repeat-once') return 'mdi-repeat-once';
        else throw new Error('invalid repeat option');
      }
    },
    methods: {
      ...mapMutations({
        setQueue: VuexMutation.SET_QUEUE,
        setPlayingTrack: VuexMutation.SET_PLAYING_TRACK,
        setPlayerRepeat: VuexMutation.SET_PLAYER_REPEAT,
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
      scrollPlayingTrackIntoView() {
        const queueElement = document.getElementById("queue") as Element;
        const nowPlayingTrackElement = queueElement.getElementsByClassName("nowPlayingTrack")[0];
        if (nowPlayingTrackElement) {
          nowPlayingTrackElement.scrollIntoView({ behavior: 'smooth' });
        }
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
      togglePlayerRepeat() {
        if (this.playerRepeat === 'repeat-off') {
          this.setPlayerRepeat('repeat');
        } else if (this.playerRepeat === 'repeat') {
          this.setPlayerRepeat('repeat-once');
        } else if (this.playerRepeat === 'repeat-once'){
          this.setPlayerRepeat('repeat-off');
        } else {
          throw new Error('invalid repeat option');
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

    div {
      margin: auto 5px;
      width: 30%;
    }

    .queue-actions-center {
      text-align: center;
    }

    .queue-actions-right {
      text-align: right;
    }


    .num-queued-tracks {
      color: rgba(100, 100, 100, 0.7);
      cursor: pointer;
    }


    .v-btn {
      color: rgba(100, 100, 100, 0.5);

      &:hover {
        color: rgba(100, 100, 100, 1.0);
      }
    }
  }

  .queue-list {
    height: calc(100% - 35px);

    .queue-background {
      position: absolute;
      width: 100%;
      height: calc(100% - 35px);
      overflow: hidden;

      .v-icon {
        top: 50%;
        left: 50%;
        margin: auto;
        transform : translate(-50%,-50%);
      }
    }
  }
</style>
