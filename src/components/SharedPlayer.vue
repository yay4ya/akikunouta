<template>
  <v-container>
    <div class="player-container">
      <div class="video-container">
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
      <div class="player-controls">
        <div class="track-controls">
          <v-btn
            icon
            small
            :color="(playingTrack && playingTrack.isFavorite)? 'red' : ''"
            @click="toggleFavorite"
            class="btn-favorite"
          >
            <v-icon size="20">{{ (playingTrack && playingTrack.isFavorite)? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          </v-btn>
          <div class="track-info">
            <div class="track-title">
              {{ playingTrack?.title }} / {{ playingTrack?.artist }}
            </div>
            <div class="track-singer">
              {{ playingTrack?.singer }}
            </div>
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
        <div class="seekbar-container">
          <div class="track-elapsed-time">
            {{ secondsToTime((seekbarValue / seekbarMax)* trackDuration) }}
          </div>
          <v-slider
            v-model="seekbarValue"
            @start="seekStart"
            @end="seekEnd"
            @click="seekEnd"
            track-color="accent lighten-1"
            color="accent"
            min="0"
            :max="seekbarMax"
            class="seekbar"
          ></v-slider>
          <div class="track-duration">
            {{ secondsToTime(trackDuration - (seekbarValue / seekbarMax) * trackDuration) }}
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
    </div>
    <div class="tracklist-container scroll-thin">
      <div
        v-if="playlistName"
        class="playlist-info"
      >
        <v-icon>mdi-playlist-music</v-icon>
        <span
          class="playlist-name"
        >
          {{ playlistName }}
        </span>
        <v-dialog
          v-model="savePlaylistDialog"
          max-width="450"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-download</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>プレイリストを保存</v-card-title>
            <v-alert
              v-if="newPlaylistErrorMessage"
              :type="newPlaylistErrorMessage.type"
              @click="newPlaylistErrorMessage = null"
            >
              {{ newPlaylistErrorMessage.text }}
            </v-alert>
            <v-card-text>
              <v-text-field
                v-model="newPlaylistName"
                label="プレイリスト名"
                outlined
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="blue"
                @click="savePlaylist"
              >
                保存
              </v-btn>
              <v-btn
                text
                @click="savePlaylistDialog = false"
              >
                キャンセル
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <ul class="track-list">
        <li
          v-for="track in tracks"
          v-bind:key="track.uuid"
          class="track-container"
          v-bind:class="{ nowPlayingTrack: isNowPlaying(track) }"
        >
          <Track
            :track="track"
            :deletable="false"
            :nowPlayingId="playingTrack?.id"
            :queueing="false"
            :nohandle="true"
            @clicked="loadTrack"
          />
        </li>
      </ul>
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapMutations, mapState} from 'vuex';
  import VueYoutube from 'vue-youtube';
  import {YoutubeIframe,
          YoutubeIframePlayer,
          YoutubePlayerState} from 'youtube-iframe-api';
  import * as VuexMutation from '@/store/mutation-types';
  import {Track} from '@/models/track';
  import {library} from '@/models/library';
  import Message from '@/models/message';
  import {secondsToTime} from '@/util';

  const emptyPlaylistNameErrorMessage = new Message(
    'error',
    'プレイリスト名が空欄です',
  );


  Vue.use(VueYoutube)

  export default Vue.extend({
    name: 'SharedPlayer',
    components: {
      Track: () => import('@/components/Track.vue'),
    },
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
        playerState: -1,
        trackDuration: 0,
        trackCurrentTime: 0,
        trackProgress: 0,
        seekbarValue: 0,
        seekbarMax: 1000,
        nowSeeking: false,
        trackPlayed: false,
        playingTrack: null as Track | null,
        processId: null as number | null,
        savePlaylistDialog: false,
        newPlaylistName: '',
        newPlaylistErrorMessage: null as string | null,
        videoPlayed: false,
      }
    },

    computed: {
      ...mapState(['playerVolume', 'playerMute']),

      player(): YoutubeIframePlayer {
        const youtube = this.$refs.youtube as YoutubeIframe;
        return youtube.player as YoutubeIframePlayer;
      },

      tracks: {
        get(): Track[] {
          const query = this.$route.query;
          let tracks: Track[] = [];
          try {
            const trackIds = (query.tracks ? query.tracks.split('-') : []).map((id: string) => parseInt(id));
            tracks = library.getTracksByIds(trackIds);
          } catch (e) {
            window.alert('Invalid track ids');
          }
          return tracks;
        },
      },

      playlistName: {
        get(): string {
          const query = this.$route.query;
          return query.name;
        }
      },

      trackTimeOnSeekbar(): number {
        if (!this.playingTrack) return 0;
        const seekbarProgress = this.seekbarValue / this.seekbarMax;
        const elapsedTime= seekbarProgress * this.trackDuration;
        const time = this.playingTrack.start + elapsedTime;
        return time;
      },

      volume: {
        get(): number {
          return this.playerVolume;
        },
        set(volume: number) {
          this.setPlayerVolume(volume);
        },
      },

      volumeIcon(): string {
        if (this.playerMute) return 'mdi-volume-mute';
        return this.playerVolume === 0 ? 'mdi-volume-mute' : (
          this.playerVolume < 20 ? 'mdi-volume-low' :(
          this.playerVolume < 80 ? 'mdi-volume-medium' : 'mdi-volume-high'
        ));
      },
    },

    methods: {
      ...mapMutations({
        addFavoriteTrack: VuexMutation.ADD_FAVORITE_TRACK,
        removeFavoriteTrack: VuexMutation.REMOVE_FAVORITE_TRACK,
        setPlayerVolume: VuexMutation.SET_PLAYER_VOLUME,
        setPlayerMute: VuexMutation.SET_PLAYER_MUTE,
        addPlaylist: VuexMutation.ADD_PLAYLIST,
        addMessage: VuexMutation.ADD_MESSAGE,
      }),


      async loadTrack(track: Track) {
        this.playingTrack = track;
        await this.player.loadVideoById({
          'videoId': track.video.id,
          'startSeconds': track.start,
          'endSeconds': track.end,
        });
        this.trackDuration = track.end - track.start;
      },

      async playing() {
        if (!this.playingTrack) return;
        this.videoPlayed = true;
        this.trackPlayed = true;
        this.trackDuration = this.playingTrack.end - this.playingTrack.start;

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
        this.playNext();
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

      playNext() {
        if (!this.playingTrack) return;
        const index = this.tracks.findIndex(track => track.uuid === this.playingTrack.uuid);
        if (index === -1) return;
        const nextIndex = index + 1;
        if (nextIndex === this.tracks.length) {
          return;
        }
        this.loadTrack(this.tracks[nextIndex]);
      },

      playPrev() {
        if (!this.playingTrack) return;
        const index = this.tracks.findIndex(track => track.uuid === this.playingTrack.uuid);
        if (index === -1) return;
        const prevIndex = index - 1;
        if (prevIndex < 0) {
          return;
        }
        this.loadTrack(this.tracks[prevIndex]);
      },

      seekStart() {
        this.nowSeeking = true;
      },

      async seekEnd() {
        this.nowSeeking = false;
        await this.player.seekTo(this.trackTimeOnSeekbar, true);
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

      savePlaylist() {
        if (!this.newPlaylistName) {
          this.newPlaylistErrorMessage = emptyPlaylistNameErrorMessage.message;
          return;
        }
        const name = this.newPlaylistName;
        const tracks = this.tracks;
        const playlist = { name, tracks };
        try {
          this.addPlaylist(playlist);
        } catch(error) {
          this.newPlaylistErrorMessage = new Message(
            'error',
            error.message,
          );
          return;
        }
        this.savePlaylistDialog = false;
        this.addMessage(new Message(
          'info',
          `プレイリスト「${name}」を保存しました`,
        ));
      }
    },

    async mounted() {
      this.newPlaylistName = this.playlistName;

      await this.$nextTick(() => {
        this.player.addEventListener(
          'onStateChange',
          (state: YoutubePlayerState) => {
            this.playerState = state.data;
          }
        );
      });
      if (this.tracks.length > 0) {
        await this.loadTrack(this.tracks[0]);
      }
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
      },
    }
  })
</script>

<style scoped lang="scss">
  .container {
    display: flex;
    gap: 10px;
    width: 100%;
    height: 100%;
    margin: 0;

    max-width: 100%;

    @media screen and (max-width: 780px) {
      flex-direction: column;
    }
  }

  .player-container {
    width: 100%;
    height: 100%;
    max-width: 50%;
    color: #3f3f3f;

    @media screen and (max-width: 780px) {
      width: 100%;
      max-width: 100%;
    }

    .video-container {
      overflow: hidden;
      border-radius: 20px;
      aspect-ratio: 16/9;

      .youtube-player {
        border-radius: 20px;
        overflow: hidden;
      }
    }

    .player-controls {
      margin-top: 10px;

      .track-controls {
        display: flex;
        width: 100%;
        gap: 10px;
        justify-content: center;
        align-items: center;
        padding-left: 8px;
        padding-right: 8px;

        .btn-favorite {
          flex-shrink: 0;
          color: #8f8f8f;
          &:hover {
            color: red;
          }
        }

        .track-info {
          color: #3f3f3f;
          width: 100%;
          max-width: 100%;
          text-align: center;
          overflow: hidden;

          .track-title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .track-singer {
            font-size: 0.8em;
            color: #6f6f6f;
          }
        }

        .volume-control {
          position: relative;
          flex-shrink: 0;

          .btn-volume {
            color: #5f5f5f;
          }

          &:hover .btn-volume {
            color: white;
          }

          .volume-slider {
            position: absolute;
            top: -1px;
            right: 0;
            width: 120px;
            height: 30px;
            padding-right: 25px;
            background-color: rgba(140, 140, 140, 0.6);
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
      }
      .seekbar-container {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 0.8em;
        color: #3f3f3f;
        gap: 8px;
        padding-left: 8px;
        padding-right: 8px;

        .seekbar {
          width: 100%;
          height: 32px;
        }
      }
      .player-control-buttons {
        display: flex;
        gap: 16px;
        justify-content: center;
        align-items: center;
        width: 100%;

        .v-btn {
          color: #5f5f5f;
        }
      }
    }
  }

  .tracklist-container {
    flex-grow: 1;
    height: 100%;
    widht: 100%;
    min-height: 100px;
    max-width: 50%;
    overflow: hidden;
    padding: 0;
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 16px;

    @media screen and (max-width: 780px) {
      width: 100%;
      max-width: 100%;
    }

    .playlist-info {
      flex-shrink: 0;
      display: flex;
      gap: 8px;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 43px;
      overflow: hidden;
      border-bottom: 1px solid #f0f0f0;
      padding: 5px 10px;

      .playlist-name {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1rem;
        color: #3f3f3f;

        .v-icon {
          margin-right: 8px;
        }
      }
    }

    .track-list {
      position: relative;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      list-style: none;
      padding: 0;
      margin: 0;

      .track-container {
        width: 100%;
        border-bottom: 2px solid #f2f2f2;
      }

      .nowPlayingTrack {
        .v-card:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.2;
          background-color: var(--v-sub-base);
          pointer-events: none;
        }
      }
    }
  }
</style>
