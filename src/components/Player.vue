<template>
  <v-container>
    <div class="video-screen">
      <youtube
        ref="youtube"
        video-id=""
        :player-vars="playerVars"
        :fitParent="true"
        :resize="true"
        @playing="playing"
        @paused="paused"
      ></youtube>
    </div>

    <v-slider
      v-model="seekbarValue"
      @start="seekStart"
      @end="seekEnd"
      @click="seekEnd"
      min="0"
      :max="seekbarMax"
      class="seekbar"
    ></v-slider>

    <div class="track-time">
      <div class="track-elapsed-time">
        {{ secondsToTime(trackProgress * trackDuration) }}
      </div>
      <div class="track-duration">
        {{ secondsToTime(trackDuration) }}
      </div>
    </div>

    <div class="player-control-buttons">
      <div class="btn-play-pause">
        <button
          v-if="playerState !== 1"
          v-on:click="playVideo()"
        >
          <v-icon size="50">mdi-play</v-icon>
        </button>
        <button
          v-else
          v-on:click="pauseVideo()"
        >
          <v-icon size="50">mdi-pause</v-icon>
        </button>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState} from 'vuex';
  import VueYoutube from 'vue-youtube';
  import {YoutubeIframe,
          YoutubeIframePlayer,
          YoutubePlayerState} from 'youtube-iframe-api';
  import {secondsToTime} from '@/util';

  Vue.use(VueYoutube)

  export default Vue.extend({
    name: 'Player',
    data() {
      return {
        playerVars: {
          controls: 0,
          fs: 0,
          rel: 0,
          enablejsapi: 1,
        },
        videoDuration: 0,
        videoCurrentTime: 0,
        trackProgress: 0,
        playerState: -1,
        seekbarValue: 0,
        seekbarMax: 1000,
        nowSeeking: false,
        processId: null as number | null,
      }
    },
    computed: {
      ...mapState(['playingTrack']),
      player(): YoutubeIframePlayer {
        const youtube = this.$refs.youtube as YoutubeIframe;
        return youtube.player as YoutubeIframePlayer;
      },
      trackDuration(): number {
        if (!this.existsPlayingTrack()) {
          return 0;
        }
        return this.playingTrack.end - this.playingTrack.start;
      }
    },
    mounted () {
      this.player.addEventListener(
        'onStateChange',
        (state: YoutubePlayerState) => {
          this.playerState = state.data;
        }
      );
    },
    methods: {
      async playing() {
        this.videoDuration = await this.player.getDuration();

        this.processId = setInterval(() => {
          this.player.getCurrentTime().then(currentTime => {
            const elapsedTime = currentTime - this.playingTrack.start;
            const trackProgress = elapsedTime / this.trackDuration;

            this.trackProgress = trackProgress < 1 ? trackProgress : 1;
            if (!this.nowSeeking) {
              this.seekbarValue = this.seekbarMax * this.trackProgress;
            }
          });
        }, 100);
      },
      paused() {
        if (this.processId !== null) {
          clearInterval(this.processId);
        }
      },
      existsPlayingTrack(): boolean {
        return this.playingTrack !== null;
      },
      async playVideo() {
        await this.player.playVideo();
      },
      async pauseVideo() {
        await this.player.pauseVideo();
      },
      seekStart() {
        this.nowSeeking = true;
      },
      async seekEnd() {
        this.nowSeeking = false;
        const seekbarProgress = this.seekbarValue / this.seekbarMax;
        const elapsedTime= seekbarProgress * this.trackDuration;
        const time = this.playingTrack.start + elapsedTime;
        await this.player.seekTo(time, true);
      },
      secondsToTime(t: number): string {
        return secondsToTime(t);
      },
    },
    watch: {
      async playingTrack() {
        await this.player.loadVideoById({
          'videoId': this.playingTrack.video.id,
          'startSeconds': this.playingTrack.start,
          'endSeconds': this.playingTrack.end,
        });
      },
    }
  });
</script>

<style scoped lang="scss">
  .seekbar {
    height: 25px;
  }

  .track-time {
    position: relative;
    font-size: 0.7em;
    height: 1em;

    .track-elapsed-time {
      position: absolute;
      left: 0;
    }

    .track-duration {
      position: absolute;
      right: 0;
    }
  }

  .player-control-buttons {
    height: 30px;
    width: 100%;
    position: relative;
    align-content: center;
    margin-top: 15px;

    button {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform : translate(-50%,-50%);
      transform : translate(-50%,-50%);
    }
  }
</style>
