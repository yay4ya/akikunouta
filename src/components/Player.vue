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
        class="youtube-player"
      ></youtube>
    </div>

    <div class="playing-track-info">
      <v-btn
        icon
        small
        :color="(playingTrack && playingTrack.isFavorite)? 'red' : ''"
        @click="toggleFavorite"
        class="btn-favorite"
      >
        <v-icon size="20">{{ (playingTrack && playingTrack.isFavorite)? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>

      <div class="playing-track-detail-container">
        <v-menu offset-y right nudge-right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs" v-on="on"
              class="playing-track-details"
              retain-focus-on-click
            >
              <div
              >
                <div class="playing-track-title">
                  {{ playingTrack? (playingTrack.title + " / " + playingTrack.artist) : '' }}

                </div>
                <div
                 class="playing-track-singer"
                 target="_blank"
                >
                  {{ playingTrack? playingTrack.singer : ''}}
                </div>
                <div class="share-btn">
                  <v-icon size="18" color="#8f8f8f">mdi-share</v-icon>
                </div>
              </div>
            </v-btn>
          </template>
          <div
            class="sharing-menu"
            v-if="playingTrack"
          >
            <v-btn
              icon
              class="share-btn-x"
              :href="getTwitterUrl()"
              target="_blank"
            ><b>𝕏</b></v-btn>
            <v-btn
              icon
              class="share-btn-link"
              @click="copySharingUrl"
            ><v-icon>mdi-link-variant</v-icon></v-btn>
          </div>
        </v-menu>
      </div>

      <div class="volume-control">
        <div class="volume-slider">
          <v-slider
            max="100"
            min="0"
            dark
            v-model="volume"
          ></v-slider>
        </div>
        <v-btn
          icon
          small
          class="btn-volume"
          @click="toggleMute"
        >
          <v-icon size="20">{{ volumeIcon }}</v-icon>
        </v-btn>
      </div>
    </div>

    <div class="video-controller">
      <div class="seekbar-container">
        <div class="track-elapsed-time">
          {{ secondsToTime((seekbarValue / seekbarMax)* trackDuration) }}
        </div>

        <v-slider
          v-model="seekbarValue"
          @start="seekStart"
          @end="seekEnd"
          @click="seekEnd"
          min="0"
          :max="seekbarMax"
          color="accent"
          track-color="accent lighten-1"
          class="seekbar"
        ></v-slider>

        <div class="track-duration">
          {{ secondsToTime(trackDuration - (seekbarValue / seekbarMax)* trackDuration) }}
        </div>
      </div>

      <div class="player-control-buttons">
        <div class="btn-skip-previous">
          <v-btn
            icon
            @click="playPrev"
          >
            <v-icon size="30">mdi-skip-previous</v-icon>
          </v-btn>
        </div>
        <div class="btn-play-pause">
          <v-btn
            v-if="playerState !== 1"
            @click="playVideo"
            icon
            large
          >
            <v-icon size="50">mdi-play</v-icon>
          </v-btn>
          <v-btn
            v-else
            @click="pauseVideo"
            icon
            large
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
  import {mapActions, mapMutations, mapState} from 'vuex';
  import * as VuexAction from '@/store/action-types';
  import * as VuexMutation from '@/store/mutation-types';
  import VueYoutube from 'vue-youtube';
  import {YoutubeIframe,
          YoutubeIframePlayer,
          YoutubePlayerState} from 'youtube-iframe-api';
  import {secondsToTime} from '@/util';
  import {Track} from '@/models/track';
  import Message from '@/models/message';

  Vue.use(VueYoutube)

  export default Vue.extend({
    name: 'Player',
    data() {
      return {
        playerVars: {
          autoplay: 0,
          controls: 0,
          fs: 0,
          rel: 0,
          enablejsapi: 1,
          origin: window.location.origin,
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
      ...mapState(['playingTrack', 'queuedTracks', 'playerVolume', 'playerMute']),

      player(): YoutubeIframePlayer {
        const youtube = this.$refs.youtube as YoutubeIframe;
        return youtube.player as YoutubeIframePlayer;
      },

      trackDuration(): number {
        if (!this.playingTrack) {
          return 0;
        }
        return this.playingTrack.end - this.playingTrack.start;
      },

      videoTimeOnSeekbar(): number {
        if (!this.playingTrack) return 0;
        const seekbarProgress = this.seekbarValue / this.seekbarMax;
        const elapsedTime= seekbarProgress * this.trackDuration;
        const time = this.playingTrack.start + elapsedTime;
        return time;
      },

      volumeIcon(): string {
        if (this.playerMute) return 'mdi-volume-mute';
        return this.playerVolume === 0 ? 'mdi-volume-mute' : (
          this.playerVolume < 20 ? 'mdi-volume-low' :(
          this.playerVolume < 80 ? 'mdi-volume-medium' : 'mdi-volume-high'
        ));
      },

      volume: {
        get(): number {
          return this.playerVolume;
        },
        set(volume: number) {
          this.setPlayerVolume(volume);
        },
      }
    },

    async mounted () {
      if (this.playingTrack) {
        await this.loadTrack(this.playingTrack);
        await this.player.setVolume(this.playerVolume);
        if (this.playerMute) {
          await this.player.mute();
        } else {
          await this.player.unMute();
        }
      }
      this.player.addEventListener(
        'onStateChange',
        (state: YoutubePlayerState) => {
          this.playerState = state.data;
        }
      );
    },

    methods: {
      ...mapMutations({
        addFavoriteTrack: VuexMutation.ADD_FAVORITE_TRACK,
        removeFavoriteTrack: VuexMutation.REMOVE_FAVORITE_TRACK,
        setPlayerVolume: VuexMutation.SET_PLAYER_VOLUME,
        setPlayerMute: VuexMutation.SET_PLAYER_MUTE,
        addMessage: VuexMutation.ADD_MESSAGE,
      }),

      ...mapActions({
        setNextTrack: VuexAction.SET_NEXT_TRACK,
        setPrevTrack: VuexAction.SET_PREV_TRACK,
      }),

      async playing() {
        if (!this.playingTrack) return;
        this.videoPlayed = true;
        this.videoDuration = await this.player.getDuration();

        this.processId = setInterval(() => {
          if (!this.playingTrack) return;
          this.player.getCurrentTime().then(currentTime => {
            this.videoCurrentTime = currentTime;
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
        if (this.playerState === -1) {
          await this.loadTrack(this.playingTrack)
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

      toggleFavorite() {
        if (!this.playingTrack) return;
        if (this.playingTrack.isFavorite) {
          this.removeFavoriteTrack(this.playingTrack)
          this.playingTrack.isFavorite = false;
        } else {
          this.addFavoriteTrack(this.playingTrack);
          this.playingTrack.isFavorite = true;
        }
      },

      async toggleMute() {
        this.setPlayerMute(!this.playerMute);
      },

      getSharingUrl() {
        return this.playingTrack?.getUrl();
      },

      getTwitterUrl() {
        const message = encodeURIComponent(`『${this.playingTrack?.title}』\n#アキくんのおうた\n${this.getSharingUrl()}`);
        return `https://twitter.com/intent/tweet?text=${message}`;
      },

      copySharingUrl() {
        navigator.clipboard.writeText(this.getSharingUrl());
        this.addMessage(new Message('info', 'URLをコピーしました'));
      },
    },

    watch: {
      async playingTrack() {
        if (!this.playingTrack) {
          if (this.processId !== null) {
            clearInterval(this.processId);
          }
          await this.player.stopVideo();
          await this.player.loadVideoById('');
          return;
        }
        await this.loadTrack(this.playingTrack);
        await this.player.setVolume(this.playerVolume);
        if (this.playerMute) {
          await this.player.mute();
        } else {
          await this.player.unMute();
        }
        await this.player.playVideo();
      },

      async playerVolume() {
        await this.player.setVolume(this.playerVolume);
      },

      async playerMute() {
        if (this.playerMute) {
          await this.player.mute();
        } else {
          await this.player.unMute();
        }
      }
    }
  });
</script>


<style lang="scss">
  .video-screen {
    width: 100%;
    overflow: hidden;
    border-radius: 20px 20px 0px 0px;
    position: relative;

    &:before {
      content:"";
      display: block;
      padding-top: 56.25%;
    }

    iframe {
      position: absolute;
      top: 0;
    }
  }
</style>

<style scoped lang="scss">
  .container {
    width: 100%;
    padding: 0;
    position: relative;
  }

  .playing-track-info {
    width: 100%;
    display: flex;
    gap: 5px;
    position: relative;
    padding: 5px 10px 0 10px;

    justify-content: center;
    align-items: center;

    .btn-favorite {
      flex-shrink: 0;
      width: fit-content;
      &:hover {
        color: red;
      }
    }

    .volume-control {
      flex-shrink: 0;

      &:hover .v-btn {
        color: white;
      }

      .volume-slider {
        position: absolute;
        top: 14px;
        right: 10px;
        width: 120px;
        height: 30px;
        padding-right: 25px;
        background-color: rgba(100, 100, 100, 0.6);
        border-radius: 10px;
        display: none;
      }

      @keyframes show{
          from{
              opacity: 0;
          }
          to{
              opacity: 1;
          }
      }

      &:hover .volume-slider {
        display: block;
        animation: show 0.2s ease 0s;
      }
    }

    .playing-track-detail-container {
      flex-shrink: 1;
      position: relative;
      width: calc(100% - 80px);
      overflow: hidden;

      .playing-track-details {
        background-color: transparent;
        box-shadow: none;
        padding: 5px 30px;
        position: relative;
        border-radius: 10px;
        cursor: pointer;
        overflow: hidden;
        margin: auto;
        height: fit-content;
        width: 100%;

        &:hover .share-btn {
          opacity: 1;
        }

        .playing-track-title, .playing-track-singer {
          margin: 0 0px;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: center;
          white-space: nowrap;
        }

        .playing-track-title {
          color: #3f3f3f;
        }

        .playing-track-singer {
          text-decoration: none;
          font-size: 0.8em;
          color: #8f8f8f;
        }

        .share-btn {
          position: absolute;
          right: -24px;
          top: 5px;
          color: #8f8f8f;
          opacity: 0.3;
          overflow: revert;
        }
      }
    }
  }

  .video-controller {
    padding: 0 10px;
    .seekbar-container {
      display: flex;
      padding-bottom: 5px;

      .seekbar {
        height: 25px;
        width: calc(100% - 50px);
      }

      .track-elapsed-time, .track-duration {
        height: 1em;
        width: 40px;
        padding-top: 8px;
        user-select:none;
        font-size: 0.7em;
        text-align: center;
      }
    }

    .player-control-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: auto;
      padding: 20px 0 15px 0;

      height: 30px;
      width: 150px;
      position: relative;
      align-content: center;
      margin-bottom: 15px;

      .btn-play-pause {
      }
      .btn-skip-next{

      }
      .btn-skip-previous {
      }
    }
  }

  .v-menu__content {
    box-shadow: none;
    overflow: visible !important;
    contain: unset;
    .sharing-menu {
      width: fit-content;
      padding: 5px;
      background-color: white;
      float: right;
      border-radius: 30px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      .share-btn-x {
        font-size: 1.5em;
      }
    }
  }
</style>

<style lang="scss">
    .playing-track-details {
      .v-btn__content {
        display: block;
        width: 100%;
      }
    }
</style>
