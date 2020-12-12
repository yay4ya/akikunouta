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
    <div class="btn-play-pause">
      <button
        v-if="playerState !== 1"
        v-on:click="playVideo()"
      >
        <v-icon>mdi-play</v-icon>
      </button>
      <button
        v-else
        v-on:click="pauseVideo()"
      >
        <v-icon>mdi-pause</v-icon>
      </button>
    </div>

    <v-slider
      v-model="seekbarValue"
      @start="seekStart"
      @end="seekEnd"
      @click="seekEnd"
      min="0"
      :max="seekbarMax"
    ></v-slider>

    <div >
    {{ trackProgress * trackDuration }} / {{ trackDuration }}
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
      }
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
  .video-screen {

  }
</style>
