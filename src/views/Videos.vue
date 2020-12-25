<template>
  <v-container class="d-flex">
    <CardList
      :cards="videoCards"
      class="video-list scroll-thin"
      @clicked="onClick"
    />

    <transition name="slide">
      <div v-if="selectedVideo" class="track-list-container">
        <div
          class="video-info-container"
          @click="selectedVideo = null"
        >
          <div
            class="video-info-background"
            v-bind:style="{ backgroundImage: 'url(' + selectedVideo.getThumbnailURL('hqdefault') + ')'}"
          >
          </div>

          <div class="video-info-content">
            <div class="video-info">
              <h2 class="video-info-title">
                {{ selectedVideo.title }}
              </h2>
              <h4 class="video-info-channel">
                {{ selectedVideo.channel.name }}
              </h4>
            </div>

            <div class="btn-close-track-list">
              <v-btn
                dark
                icon
              >
                <v-icon size="40">mdi-chevron-down</v-icon>
              </v-btn>
            </div>

            <div class="video-actions">
              <v-btn
                icon
                dark
                @click.stop="addTracksToQueue"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn
                icon
                dark
                @click.stop="shuffleAndQueue"
              >
                <v-icon>mdi-shuffle-variant</v-icon>
              </v-btn>
            </div>
          </div>
        </div>

        <TrackList
          :tracks="getTracksByVideoId(selectedVideo.id)"
          :sort="false"
          :put="false"
          pull='clone'
          :queueing="true"
          class="track-list scroll-thin"
        />
      </div>
    </transition>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapMutations} from 'vuex';
  import * as VuexMutation from '@/store/mutation-types';
  import * as util from '@/util';
  import {library} from '@/models/library';
  import {Video} from '@/models/youtube';
  import {Track} from '@/models/track';
  import Card from '@/models/card';

  export default Vue.extend({
    name: 'Videos',
    components: {
      CardList: () => import ('@/components/CardList.vue'),
      TrackList: () => import ('@/components/TrackList.vue'),
    },
    data() {
      return {
        library: library,
        videos: [] as Video[],
        selectedVideo: null as Video | null,
      }
    },
    async created() {
      const videoIdToVideo = new Map(library.tracks.map(track => [track.video.id, track.video]));
      const videos = [...videoIdToVideo.values()];
      await Promise.all(videos.map(video => video.fetchVideoInfo()));
      this.videos = videos;
    },
    computed: {
      videoCards: function(): Card[] {
        return this.videos.map(video => {
          return {
            id: video.id,
            title: video.getTitle() || '',
            subtitle: (video.getChannel() || {}).name  || '',
            thumbnailUrl: video.getThumbnailURL('mqdefault'),
          }
        })
      },
    },
    methods: {
      ...mapMutations({
        addToQueue: VuexMutation.ADD_TO_QUEUE,
      }),
      onClick(videoCard: Card) {
        this.selectedVideo = this.videos.find(video => video.id == videoCard.id) || null;
      },
      getTracksByVideoId(videoId: string): Track[] {
        return library.tracks.filter(track => track.video.id === videoId);
      },
      addTracksToQueue() {
        if (!this.selectedVideo) {
          throw Error("no video selected");
        }
        const tracks = this.getTracksByVideoId(this.selectedVideo.id);
        tracks.map(track => this.addToQueue(track.clone()));
      },
      shuffleAndQueue() {
        if (!this.selectedVideo) {
          throw Error("no video selected");
        }
        const tracks = util.shuffle(this.getTracksByVideoId(this.selectedVideo.id));
        tracks.map(track => this.addToQueue(track.clone()));
      }
    }
  });
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .video-list {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
  }

  .slide-enter, .slide-leave-to {
    transform: translateY(100%);
  }

  .track-list-container {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: white;

    .video-info-container {
      position: relative;
      width: 100%;
      height: 130px;

      .video-info-background {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 100%;
        height: 100%;
        line-height: 300px;
        background-size: cover;
        background-position: center;
        text-align: center;
        overflow: hidden;

        &:before{
          content: '';
          background: inherit;
          filter:blur(15px);
          position: absolute;
          top: -30px;
          left: -30px;
          right: -30px;
          bottom: -30px;
        }

        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.3);
        }
      }

      .video-info-content {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 10px;

        .v-btn {
          color: rgba(255, 255, 255, 0.5);

          &:hover {
            color: rgba(255, 255, 255, 1.0);
          }
        }

        .video-info {
          color: #ffffff;

          .video-info-title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }
          .vide-info-channel {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
          }
        }

        .btn-close-track-list {
          position: absolute;
          top: 5px;
          right: 5px;
        }

        .video-actions {
          position: absolute;
          padding: 5px;
          bottom: 0;
          left: 0;
        }
      }
    }

    .track-list {
      height: calc(100%  - 130px);
      overflow-x: none;
      overflow-y: scroll;
    }
  }
</style>
