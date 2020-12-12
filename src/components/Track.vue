<template>
  <v-container>
    <v-card
      v-on:click="setPlayingTrack(track)"
      :color="nowPlaying ? 'red':'white' "
      flat
      tile
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div class="track-info">
          <v-card-title
            class="track-info-item track-title"
            v-text="track.title + ' / ' + track.artist"
          ></v-card-title>

          <v-card-subtitle
            class="track-info-item track-artist"
            v-text="track.singers.join(', ')"
          ></v-card-subtitle>

          <v-card-text class="track-info-item video-info">
            <div class="track-info-item">
              <a
                :href="track.video.getURL()"
                target="_blank"
                @click.stop=""
              >
                <v-icon size="15">mdi-youtube</v-icon>
                <span>{{ track.video.title }}</span>
              </a>
            </div>
            <div class="track-info-item">
              <a
                :href="track.video.channel.url"
                target="_blank"
                @click.stop=""
              >
                <v-icon size="15">mdi-account</v-icon>
                <span>{{ track.video.channel.name }}</span>
              </a>
            </div>
          </v-card-text>
        </div>

        <div class="track-thumbnail ma-3">
          <v-img
            :src="track.video.getThumbnailURL('mqdefault')"
          ></v-img>
          <v-card-actions class="track-actions">
            <v-btn
              dark
              right
              icon
              @click.stop=""
            >
              <v-icon size="13">mdi-heart</v-icon>
            </v-btn>
            <v-btn
              dark
              right
              icon
              @click.stop=""
            >
              <v-icon size="13">mdi-playlist-plus</v-icon>
            </v-btn>
          </v-card-actions>
          <div class="track-duration">
            {{ secondsToTime(track.getDuration()) }}
          </div>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import * as VuexMutation from '@/store/mutation-types';
  import {secondsToTime} from '@/util';

  export default Vue.extend({
    name: 'Track',
    props: ['track'],
    data() {
      return {
        nowPlaying: false,
      }
    },
    computed: {
      ...mapState(['playingTrack']),
    },
    methods: {
      ...mapMutations({
        setPlayingTrack: VuexMutation.SET_PLAYING_TRACK,
      }),
      secondsToTime(t: number): string {
        return secondsToTime(t);
      },
    },
    watch: {
      playingTrack() {
        this.nowPlaying = this.playingTrack.id === this.track.id;
      },
    },
  })
</script>

<style scoped lang="scss">
  .container {
    margin: 0;
    padding: 0;
  }

  .v-card {
    &:hover:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: #000000;
      opacity: 0.1;
    }
  }

  .track-info {
    width: calc(100% - 50px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .track-info-item {
      padding: 2px 0px 2px 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1.5em;

      .v-icon {
        margin-right: 5px;
      }
    }

    .track-title {
      font-size: 0.9em;
      padding-bottom: 12px;
    }

    .track-artist {
      font-size: 0.7em;
    }

    .video-info {
      padding: 0;
      font-size: 0.7em;
    }
  }

  .track-thumbnail {
    display: block;
    position: relative;
    width: calc((16 / 9) * 60px);
    height: 60px;
    margin: 0;

    .v-image {
      margin: 0 !important;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      overflow: hidden;
    }

    .track-actions {
      position: absolute;
      margin: 0;
      padding: 0;
      top: 0;
      right: 0;

      .v-btn {
        float: flex;
        margin: 0;
        width: 20px;
        height: 20px;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }

    .track-duration {
      position: absolute;
      bottom: 0px;
      left: 0px;
      padding: 0 5px;
      font-size: 0.65em;
      color: white;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
