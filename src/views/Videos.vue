<template>
  <v-container class="d-flex">
    <VideoList
      :list ="library.trackList.getAllUniqueVideos()"
      class="video-list scroll-thin"
      @clicked="onClick"
    />

    <transition name="slide">
      <div v-if="selectedVideo" class="track-list-container">
        <div
          class="video-info-container"
          v-bind:style="{ backgroundImage: 'url(' + selectedVideo.getThumbnailURL('hqdefault') + ')', backgroundPosition: 'center' }"
        >
          <h2 class="video-info-title">
            {{ selectedVideo.title }}
          </h2>
        </div>
        <div class="btn-close-track-list">
          <v-btn
            dark
            icon
            @click="selectedVideo = null"
          >
            <v-icon size="40">mdi-chevron-down</v-icon>
          </v-btn>
        </div>
        <TrackList
          :trackList="library.trackList.getTrackListByVideoId(selectedVideo.id)"
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
  import {library} from '@/models/library';
  import {Video} from '@/models/youtube';

  export default Vue.extend({
    name: 'HelloWorld',
    components: {
      VideoList: () => import ('@/components/VideoList.vue'),
      TrackList: () => import ('@/components/TrackList.vue'),
    },
    data() {
      return {
        library: library,
        selectedVideo: null as Video | null,
      }
    },
    computed: {
    },
    methods: {
      onClick(video: Video) {
        console.log(video);
        this.selectedVideo = video;
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
    margin-top: 10px;
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

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: white;

    .btn-close-track-list {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    .video-info-container {
      content: '';
      height: 130px;
      width: 100%;
      line-height: 300px;
      position: relative;
      background-size: cover;
      overflow: hidden;
      z-index: 0;

      &:before{
        z-index: -1;
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
        background-color: rgba(0, 0, 0, 0.1);
      }

      .video-info-title {
        color: white;
        z-index: 10;
      }
    }

    .track-list {
      height: calc(100%  - 130px);
      overflow-x: none;
      overflow-y: scroll;


    }
  }
</style>
