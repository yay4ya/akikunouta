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
        @ended="ended"
      ></youtube>
    </div>

    <div class="video-controller">
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
          {{ secondsToTime(trackDuration - trackProgress * trackDuration) }}
        </div>
      </div>

      <div class="player-control-buttons">
        <div class="btn-skip-previous">
          <v-btn
            icon
            @click="playPrev()"
          >
            <v-icon size="30">mdi-skip-previous</v-icon>
          </v-btn>
        </div>
        <div class="btn-play-pause">
          <v-btn
            v-if="playerState !== 1"
            @click="playVideo()"
            icon
          >
            <v-icon size="50">mdi-play</v-icon>
          </v-btn>
          <v-btn
            v-else
            @click="pauseVideo()"
            icon
          >
            <v-icon size="50">mdi-pause</v-icon>
          </v-btn>
        </div>
        <div class="btn-skip-next">
          <v-btn
            icon
            rounded
            @click="playNext()"
          >
            <v-icon size="30">mdi-skip-next</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapActions, mapState} from 'vuex';
  import * as VuexAction from '@/store/action-types';
  import VueYoutube from 'vue-youtube';
  import {YoutubeIframe,
          YoutubeIframePlayer,
          YoutubePlayerState} from 'youtube-iframe-api';
  import {secondsToTime} from '@/util';
  import {Track} from '@/polyphony/track';

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
        videoPlayed: false,
      }
    },
    computed: {
      ...mapState(['playingTrack', 'queuedTracks']),
      player(): YoutubeIframePlayer {
        const youtube = this.$refs.youtube as YoutubeIframe;
        return youtube.player as YoutubeIframePlayer;
      },
      trackDuration(): number {
        if (this.playingTrack === null) {
          return 0;
        }
        return this.playingTrack.end - this.playingTrack.start;
      },
      videoTimeOnSeekbar(): number {
        const seekbarProgress = this.seekbarValue / this.seekbarMax;
        const elapsedTime= seekbarProgress * this.trackDuration;
        const time = this.playingTrack.start + elapsedTime;
        return time;
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
      ...mapActions({
        setNextTrack: VuexAction.SET_NEXT_TRACK,
        setPrevTrack: VuexAction.SET_PREV_TRACK,
      }),
      async playing() {
        this.videoPlayed = true;
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
      ended() {
        if (!this.videoPlayed) return;
        this.videoPlayed = false;
        this.setNextTrack();
      },
      playNext() {
        this.setNextTrack();
      },
      playPrev() {
        this.setPrevTrack();
      },
      async loadTrack(track: Track) {
        await this.player.loadVideoById({
          'videoId': track.video.id,
          'startSeconds': track.start,
          'endSeconds': track.end,
        });
      },
      async playVideo() {
        if (!this.playingTrack) {
          this.playNext();
          return;
        }
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
        await this.player.seekTo(this.videoTimeOnSeekbar, true);
      },
      secondsToTime(t: number): string {
        return secondsToTime(t);
      },
    },
    watch: {
      async playingTrack() {
        if (this.playingTrack === null) {
          return;
        }
        await this.player.loadVideoById({
          'videoId': this.playingTrack.video.id,
          'startSeconds': this.playingTrack.start,
          'endSeconds': this.playingTrack.end,
        });
        await this.playVideo();
        const nowPlayingTrackElement = document.getElementsByClassName("nowPlayingTrack")[0];
        if (nowPlayingTrackElement) {
          nowPlayingTrackElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
    }
  });
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
  }

  .video-screen {
    width: 400px;
  }

  .video-controller {
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
      display: flex;
      align-content: space-between;
      height: 30px;
      width: 100%;
      position: relative;
      align-content: center;

      .btn-play-pause {
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform : translate(-50%,-50%);
        transform : translate(-50%,-50%);
      }
      .btn-skip-next{
        position: absolute;
        top: 50%;
        left: 80%;
        -webkit-transform : translate(-50%,-50%);
        transform : translate(-50%,-50%);

      }
      .btn-skip-previous {
        position: absolute;
        top: 50%;
        left: 20%;
        -webkit-transform : translate(-50%,-50%);
        transform : translate(-50%,-50%);
      }
    }
  }
</style>
