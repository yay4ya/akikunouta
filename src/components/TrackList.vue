<template>
  <v-container>

  <draggable
    v-model="tracks"
    tag="ul"
    animation="300"
    class="track-list"
  >
    <li
      v-for="track in tracks"
      v-bind:key="track.id"
      class="track"
    >
      <v-card
        color="white"
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div class="track-info">
            <v-card-title
              class="headline track-info-item"
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
                >
                  <v-icon size="18">mdi-youtube</v-icon>
                  <span>{{ track.video.title }}</span>
                </a>
              </div>
              <div class="track-info-item">
                <a
                  :href="track.video.channel.url"
                  target="_blank"
                >
                  <v-icon size="18">mdi-account</v-icon>
                  <span>{{ track.video.channel.name }}</span>
                </a>
              </div>
            </v-card-text>
          </div>

          <div class="track-thumbnail">
            <div class="ma-3">
            <v-img
              :src="track.video.getThumbnailURL('mqdefault')"
            ></v-img>

            <v-card-actions class="track-actions">
              <v-btn
                class="ml-2 mt-3"
                right
                icon
                height="40px"
                width="40px"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn
                class="ml-2 mt-3"
                right
                icon
                height="40px"
                width="40px"
              >
                <v-icon>mdi-playlist-plus</v-icon>
              </v-btn>
            </v-card-actions>
            </div>
          </div>
        </div>
      </v-card>
    </li>
  </draggable>

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import draggable from 'vuedraggable';
  import {Track} from '@/polyphony/track';

  export default Vue.extend({
    name: 'TrackList',
    props: ['trackList'],
    components: {
      draggable,
    },
    computed: {
      tracks: {
        get(): Track[] {
          return this.trackList.getAllTracks();
        },
        set(tracks: Track[]) {
          this.trackList.setTracks(tracks);
        }
      },
    }
  })
</script>

<style scoped lang="scss">
  .track-list {
    margin: 0;
    padding: 0;
  }

  .track {
    margin: 6px 0;
    list-style: none;
  }

  .track-info {
    width: calc(100% - 120px);
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
    margin: 12px;

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
      }
    }

  }
</style>
