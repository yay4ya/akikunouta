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
            class="track-info-item"
            v-text="track.title"
          ></v-card-title>

          <v-card-subtitle
            class="track-info-item"
            v-text="track.artist"
          ></v-card-subtitle>

          <v-card-text class="video-info">
            <div class="track-info-item">
              <a
                :href="track.video.getURL()"
                target="_blank"
                @click.stop=""
              >
                <v-icon size="18">mdi-youtube</v-icon>
                <span>{{ track.video.title }}</span>
              </a>
            </div>
            <div class="track-info-item">
              <a
                :href="track.video.channel.url"
                target="_blank"
                @click.stop=""
              >
                <v-icon size="18">mdi-account</v-icon>
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
              class="ml-2 mt-3"
              dark
              right
              icon
              height="40px"
              width="40px"
              @click.stop=""
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn
              class="ml-2 mt-3"
              dark
              right
              icon
              height="40px"
              width="40px"
              @click.stop=""
            >
              <v-icon>mdi-playlist-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import * as VuexMutation from '@/store/mutation-types';

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
    width: calc(100% - 165px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    .track-info-item {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .v-icon {
        margin-right: 5px;
      }
    }

    .video-info {
      font-size: 0.7em;
    }
  }

  .track-thumbnail {
    margin: 0;

    .v-image {
      margin: 0 !important;
      width: 165px;
      height: 120px;
      align-items: center;
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
        margin: 0;
        padding: 0;
        background-color: rgba(0, 0, 0, 0.4);
      }
    }

  }
</style>
