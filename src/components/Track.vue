<template>
  <v-container>
    <v-card
      flat
      tile
      @click="onClick"
      v-bind:class="{ nowplayingtrack: nowPlaying }"
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div class="track-info">
          <v-card-title
            class="track-info-item track-title"
            v-text="track.title + ' / ' + track.artist"
          ></v-card-title>

          <v-card-subtitle
            class="track-info-item track-artist"
            v-text="track.singer"
          ></v-card-subtitle>

          <v-card-text class="track-info-item video-info">
            <div class="track-info-item">
              <a
                :href="track.video.getURL()"
                target="_blank"
                @click.stop=""
              >
                <v-icon
                 size="15"
                 class="icon-youtube"
                >mdi-youtube</v-icon>
              </a>
              <span>{{ track.video.title }}</span>
            </div>
            <div class="track-info-item">
              <a
                :href="track.hasVideoInfo()? track.video.channel.url : ''"
                target="_blank"
                @click.stop=""
              >
                <v-icon size="15">mdi-account</v-icon>
              </a>
              <span>{{ track.hasVideoInfo()? track.video.channel.name : '' }}</span>
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
      <div
        v-if="deletable"
        class="btn-delete-track"
      >
        <v-btn
          dark
          right
          icon
          width="22"
          height="22"
          @click.stop="onDelete(track)"
        >
          <v-icon size="15">mdi-close</v-icon>
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState} from 'vuex';
  import {secondsToTime} from '@/util';

  export default Vue.extend({
    name: 'Track',
    props: ['track', 'deletable', 'nowPlayingId'],
    async created() {
      await this.track.fetchVideoInfo();
    },
    data() {
      return {
        nowPlaying: false,
      }
    },
    computed: {
      ...mapState(['playingTrack']),
    },
    methods: {
      secondsToTime(t: number): string {
        return secondsToTime(t);
      },
      onClick() {
        this.$emit('clicked', this.track);

        // The following statement suppose that the first element with
        // `nowPlayingTrack` class is in the queue.
        const nowPlayingTrackElement = document.getElementsByClassName("nowPlayingTrack")[0];
        if (nowPlayingTrackElement) {
          nowPlayingTrackElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
      onDelete() {
        this.$emit('deleted', this.track);
      }
    },
    watch: {
      playingTrack() {
        if (this.nowPlayingId === "uuid") {
          this.nowPlaying = this.playingTrack.uuid === this.track.uuid;
        } else {
          this.nowPlaying = this.playingTrack.id === this.track.id;
        }
      },
    },
  })
</script>

<style scoped lang="scss">
  .container {
    margin: 0;
    padding: 0;
  }

  .nowplayingtrack {
  }

  .v-card {
    position: relative;

    &:before {
      transition: opacity 0.3s;
      opacity: 0;
    }

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

    .btn-delete-track {
      position: absolute;
      top: 0;
      left: 0px;
      display: none;

      .v-btn:hover {
        color: #F96C4F;
      }
    }

    &:hover .btn-delete-track {
      display: block;
      background-color: rgba(0, 0, 0, 0.5);
    }

    &:hover .track-actions {
      display: block;
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
        &:hover {
          color: #F96C4F;
        }
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
      color: #5d5d5d;

      a{
        text-decoration: none;
      }
    }
  }

  .track-thumbnail {
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
      display: none;
      position: absolute;
      margin: 0;
      padding: 0;
      top: 2px;
      right: 2px;
      transition: display 2s;

      .v-btn {
        float: flex;
        margin: 0;
        padding: 0;
        width: 30px;
        height: 30px;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.6);

        &:hover {
          color: #f96c4f;
        }
      }
    }

    .track-duration {
      position: absolute;
      bottom: 0px;
      right: 0px;
      padding: 0 5px;
      font-size: 0.65em;
      color: white;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
</style>
