<template>
  <v-container>
    <div class="card-list-container">
      <CardList
        :cards="playlistCards"
        :query="searchQuery"
        class="playlist-list"
        @clicked="onClick"
      />
    </div>

    <transition name="slide">
      <div v-if="selectedPlaylist" class="track-list-container">
        <div
          class="playlist-info-container"
          @click="selectedPlaylist = null"
        >
          <div
            class="playlist-info-background"
            v-bind:style="{ backgroundImage: 'url(' + selectedPlaylistThumbnail + ')'}"
          >
          </div>

          <div class="playlist-info-content">
            <div class="playlist-info">
              <h2 class="playlist-info-title">
                {{ selectedPlaylist.name }}

              <v-dialog
                v-model="renameDialog"
                max-width="400px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                    small
                    @click="renamedPlaylistName = selectedPlaylist.name"
                  >
                    <v-icon size="18">mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>プレイリスト名を変更</v-card-title>
                  <v-alert
                    v-if="renamePlaylistErrorMessage"
                    :type="renamePlaylistErrorMessage.type"
                    @click="renamePlaylistErrorMessage = null"
                  >
                    {{ renamePlaylistErrorMessage.text }}
                  </v-alert>
                  <v-card-text>
                    <v-text-field
                      v-model="renamedPlaylistName"
                      class="text-field-rename"
                    ></v-text-field>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      text
                      color="blue"
                      @click="renameSelectedPlaylist"
                    >変更</v-btn>
                    <v-btn
                      text
                      color="red"
                      @click="renameDialog = false"
                    >キャンセル</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              </h2>

              <h4 class="playlist-info-subtitle">
                {{ selectedPlaylist.tracks.length + ' 曲' }}
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

            <div class="playlist-actions">
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
              <v-btn
                icon
                dark
                @click.stop="queueAndRepeat"
              >
                <v-icon>mdi-repeat</v-icon>
              </v-btn>
              <v-dialog
                max-width="300px"
                v-model="deleteDialog"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click.stop=""
                    class="btn-delete"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    プレイリストを削除しますか？
                  </v-card-title>
                  <v-card-subtitle>
                  {{ selectedPlaylist.name }}
                  </v-card-subtitle>
                  <v-card-actions>
                    <v-btn
                      text
                      color="blue"
                      @click="deleteSeledtedPlaylist"
                    >はい</v-btn>
                    <v-btn
                      text
                      color="red"
                      @click="deleteDialog = false"
                    >いいえ</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </div>

        <TrackList
          :tracks="selectedPlaylist.tracks"
          :sort="true"
          :put="true"
          pull='clone'
          :deletable="true"
          :queueing="true"
          class="track-list scroll-thin"
          @deleted="deleteTrack"
          @changed="updatePlaylistTracks"
        />
      </div>
    </transition>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import * as VuexMutation from '@/store/mutation-types';
  import * as util from '@/util';
  import {Track} from '@/models/track';
  import {Playlist} from '@/models/playlist';
  import Message from '@/models/message';
  import Card from '@/models/card';

  export default Vue.extend({
    name: 'Playlists',
    components: {
      CardList: () => import ('@/components/CardList.vue'),
      TrackList: () => import ('@/components/TrackList.vue'),
    },
    data() {
      return {
        selectedPlaylist: null as Playlist | null,
        renameDialog: false,
        deleteDialog: false,
        renamedPlaylistName: '',
        renamePlaylistErrorMessage: null as Message | null,
      }
    },
    computed: {
      ...mapState(['playlists', 'searchQuery']),
      playlistCards: function(): Card[] {
        return this.playlists.map((playlist: Playlist) => {
          return {
            id: playlist.name,
            title: playlist.name,
            subtitle: playlist.tracks.length + ' 曲',
            thumbnailUrl: playlist.tracks.length ? playlist.tracks[0].video.getThumbnailURL('hqdefault') : '',
            metadata: '',
          }
        })
      },
      selectedPlaylistThumbnail(): string {
        const track = this.selectedPlaylist && this.selectedPlaylist.tracks.length ? this.selectedPlaylist.tracks[0] : null;
        return track ? track.video.getThumbnailURL('hqdefault') : '';
      }
    },
    methods: {
      ...mapMutations({
        addPlaylist: VuexMutation.ADD_PLAYLIST,
        removePlaylist: VuexMutation.REMOVE_PLAYLIST,
        updatePlaylist: VuexMutation.UPDATE_PLAYLIST,
        renamePlaylist: VuexMutation.RENAME_PLAYLIST,
        addToQueue: VuexMutation.ADD_TO_QUEUE,
        setQueue: VuexMutation.SET_QUEUE,
        setPlayingTrack: VuexMutation.SET_PLAYING_TRACK,
        setPlayerRepeat: VuexMutation.SET_PLAYER_REPEAT,
        addMessage: VuexMutation.ADD_MESSAGE,
      }),
      onClick(playlistCard: Card) {
        this.selectedPlaylist = this.playlists.find(
          (playlist: Playlist) => playlist.name == playlistCard.id
        ) || null;
      },
      deleteTrack(targetTrack: Track) {
        if (!this.selectedPlaylist) {
          throw Error("no playlist selected");
        }
        this.selectedPlaylist.tracks = this.selectedPlaylist.tracks.filter(track => track.uuid !== targetTrack.uuid);
        this.updatePlaylist(this.selectedPlaylist);
      },
      updatePlaylistTracks(tracks: Track[]) {
        if (!this.selectedPlaylist) {
          throw Error("no playlist selected");
        }
        this.selectedPlaylist.tracks = tracks;
        this.updatePlaylist(this.selectedPlaylist)
      },
      renameSelectedPlaylist() {
        if (!this.selectedPlaylist) {
          throw Error("no playlist selected");
        }
        if (
          this.selectedPlaylist.name !== this.renamedPlaylistName
          && this.playlists.find((playlist: Playlist) => playlist.name === this.renamedPlaylistName)
        ) {
          this.renamePlaylistErrorMessage = new Message(
            'error',
            'プレイリストが既に存在します'
          );
          return;
        }
        this.renamePlaylist({targetPlaylist: this.selectedPlaylist, newName: this.renamedPlaylistName});
        this.renameDialog = false;
      },
      deleteSeledtedPlaylist() {
        if (!this.selectedPlaylist) {
          throw Error("no playlist selected");
        }
        this.removePlaylist(this.selectedPlaylist);
        this.addMessage(new Message('info', 'プレイリスト "' + this.selectedPlaylist.name + '" を削除しました'));
        this.selectedPlaylist = null;
        this.deleteDialog = false;
      },
      addTracksToQueue() {
        if (!this.selectedPlaylist) {
          throw Error("no playlist selected");
        }
        this.selectedPlaylist.tracks.map(track => this.addToQueue(track.clone()));
      },
      shuffleAndQueue() {
        if (!this.selectedPlaylist) {
          throw Error("no playlist selected");
        }
        const tracks = util.shuffle(this.selectedPlaylist.tracks);
        if (tracks.length > 0) {
          this.setPlayingTrack(tracks[0]);
          this.setQueue(tracks);
        }
      },
      queueAndRepeat() {
        if (!this.selectedPlaylist) {
          throw Error("no playlist selected");
        }
        const tracks = this.selectedPlaylist.tracks;
        if (tracks.length > 0) {
          this.setPlayingTrack(tracks[0]);
          this.setQueue(tracks);
          this.setPlayerRepeat('repeat');
        }
      },
    },
    watch: {
      renameDialog() {
        if(!this.renameDialog) this.renamePlaylistErrorMessage = null;
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

  .card-list-container {
    position: relative;
    max-height: 100%;
    height: 100%;
    width: 100%;
  }

  .playlist-list {
    height: 100%;
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
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: white;

    .playlist-info-container {
      position: relative;
      width: 100%;
      height: 130px;
      overflow: hidden;

      .playlist-info-background {
        position: absolute;
        padding: 0;
        margin: 0;
        content: '';
        top: 0;
        left: 0;
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

      .playlist-info-content {
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

        .playlist-info {
          position: relative;
          color: #ffffff;

          .playlist-info-title {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
          }

          .playlist-info-subtitle {
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

        .playlist-actions {
          position: absolute;
          width: 100%;
          padding: 5px;
          bottom: 0;
          left: 0;

          .btn-delete {
            float: right;
          }
        }
      }
    }

    .track-list {
      height: calc(100%  - 130px);
    }
  }
</style>
