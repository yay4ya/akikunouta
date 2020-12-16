<template>
  <v-container>
    <v-card
      flat
      tile
      :ripple="false"
      @click="onClick"
      v-bind:class="{ nowplayingtrack: nowPlaying }"
    >
      <div class="d-flex flex-no-wrap justify-space-between track-content">
        <div class="handle">
          <v-icon size="20">mdi-drag</v-icon>
        </div>
        <div class="track-info">
          <v-btn
            right
            icon
            width="25"
            height="25"
            :color="track.isFavorite? 'red' : ''"
            @click.stop="toggleFavorite"
            class="btn-favorite"
          >
            <v-icon size="17">{{ track.isFavorite? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          </v-btn>
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
              v-if="queueing"
              dark
              right
              icon
              @click.stop="addToQueue(track)"
            >
              <v-icon size="18">mdi-plus</v-icon>
            </v-btn>
            <v-btn
              dark
              right
              icon
              @click.stop=""
            >
              <v-icon size="18">mdi-playlist-plus</v-icon>
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
          width="20"
          height="20"
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
  import {mapState, mapMutations} from 'vuex';
  import {secondsToTime} from '@/util';
  import * as VuexMutation from '@/store/mutation-types';

  export default Vue.extend({
    name: 'Track',
    props: ['track', 'deletable', 'nowPlayingId', 'queueing'],
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
    mounted() {
      if (this.playingTrack && this.playingTrack.uuid === this.track.uuid) {
        this.scrollIntoView();
      }
    },
    methods: {
      ...mapMutations({
        addFavoriteTrack: VuexMutation.ADD_FAVORITE_TRACK,
        removeFavoriteTrack: VuexMutation.REMOVE_FAVORITE_TRACK,
        addToQueue: VuexMutation.ADD_TO_QUEUE,
      }),
      secondsToTime(t: number): string {
        return secondsToTime(t);
      },
      onClick() {
        this.$emit('clicked', this.track);
        this.scrollIntoView()
      },
      onDelete() {
        this.$emit('deleted', this.track);
      },
      scrollIntoView() {
        // scroll into view for queued track
        const queueElement = document.getElementById("queue") as Element;
        const nowPlayingTrackElement = queueElement.getElementsByClassName("nowPlayingTrack")[0];
        if (nowPlayingTrackElement) {
          nowPlayingTrackElement.scrollIntoView({ behavior: 'smooth' });
        }
      },
      toggleFavorite() {
        if (this.track.isFavorite) {
          this.removeFavoriteTrack(this.track)
          this.track.isFavorite = false;
        } else {
          this.addFavoriteTrack(this.track);
          this.track.isFavorite = true;
        }
      }
    },
    watch: {
      playingTrack() {
        if (this.nowPlayingId === "uuid") {
          this.nowPlaying = this.playingTrack.uuid === this.track.uuid;
        } else {
          this.nowPlaying = this.playingTrack.id === this.track.id;
        }
        this.scrollIntoView();
      },
    },
  })
</script>

<style scoped lang="scss">
  .container {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
  }

  .nowplayingtrack {
  }

  .v-card {
    position: relative;
    user-select:none;
    align-items: center;
    height: 100%;

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

    .v-icon {
      &:hover {
        color: #F96C4F;
      }
    }

    .track-content {
      height: 100%;
    }

    .handle {
      height: 100%;
      width: 30px;
      position: relative;
      transition: background-color 0.2s;
      cursor: move;


      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      .v-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        -webkit-transform: translateY(-50%) translateX(-50%);
      }
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
      padding: 2px 0px 2px 3px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1.5em;
    }

    .btn-favorite {
      display: inline;
      float: left;
      margin-top: 7px;
      margin-left: 1px;
    }

    .track-title {
      font-size: 0.9em;
      padding-bottom: 12px;
    }

    .track-artist {
      font-size: 0.7em;
    }

    .video-info {
      font-size: 0.7em;
      color: #5d5d5d;

      .v-icon {
        padding-right: 7px;
      }

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
      border-radius: 10px 10px 10px 10px;
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
      bottom: 3px;
      right: 3px;
      padding: 0 5px;
      font-size: 0.65em;
      color: white;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 5px 5px 5px 5px;
    }
  }
</style>
