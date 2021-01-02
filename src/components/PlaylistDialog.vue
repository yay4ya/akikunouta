<template>
  <v-card>
    <v-card-title>
      プレイリストに追加
    </v-card-title>

    <v-alert
        v-if="errorMessage"
        :type="errorMessage.type"
        @click="errorMessage = null"
      >
      {{ errorMessage.text }}
    </v-alert>

    <v-card-subtitle>
      {{ track.title }} / {{ track.artist }}
    </v-card-subtitle>

    <v-divider></v-divider>

    <v-card-text style="height: 300px;">
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            v-for="playlist in playlists"
            :key="playlist.name"
            @click="addTrackToPlaylist(playlist)"
          >

            <v-list-item-content>
              <v-list-item-title
              >
                {{ playlist.name }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon
              v-if="playlist.tracks.find(t => t.id === track.id)"
            >
              <v-icon
                color="green"
                size="18"
              >
              mdi-checkbox-marked-circle-outline
              </v-icon>
            </v-list-item-icon>

          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-dialog
        max-width="400"
        persistent
        v-model="newPlaylistDialog"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
            新しいプレイリストを作成
          </v-btn>
        </template>
        <v-card>
          <v-card-title>新しいプレイリストを作成</v-card-title>

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
              label="新しいプレイリスト名"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="blue"
              text
              @click="createPlaylist"
            >
              作成
            </v-btn>
            <v-btn
              color="red"
              text
              @click="newPlaylistDialog = false; newPlaylistName = ''"
            >
              キャンセル
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapMutations, mapState} from 'vuex';
  import * as VuexMutation from '@/store/mutation-types';
  import {Playlist} from '@/models/playlist';
  import Message from '@/models/message';

  const emptyPlaylistNameErrorMessage = new Message(
    'error',
    'プレイリスト名が空欄です',
  );

  export default Vue.extend({
    name: 'PlaylistDialog',
    props: ['track'],
    data() {
      return {
        newPlaylistDialog: false,
        newPlaylistName: '',
        newPlaylistErrorMessage: null as Message | null,
        errorMessage: null as Message | null,
      };
    },
    computed: {
      ...mapState(['playlists']),
    },
    methods: {
      ...mapMutations({
        addPlaylist: VuexMutation.ADD_PLAYLIST,
        updatePlaylist: VuexMutation.UPDATE_PLAYLIST,
        addMessage: VuexMutation.ADD_MESSAGE,
      }),
      createPlaylist() {
        if (!this.newPlaylistName) {
          this.newPlaylistErrorMessage = emptyPlaylistNameErrorMessage;
          return;
        }
        const playlist = {
          name: this.newPlaylistName,
          tracks: [],
        };
        try {
          this.addPlaylist(playlist);
        } catch(error) {
          this.newPlaylistErrorMessage = new Message(
            'error',
            error.message,
          );
          return;
        }
        this.newPlaylistName = '';
        this.newPlaylistDialog = false;
      },
      addTrackToPlaylist(playlist: Playlist) {
        playlist.tracks.unshift(this.track.clone());
        try {
          this.updatePlaylist(playlist);
        } catch(error) {
          this.errorMessage = new Message(
            'error',
            error.message,
          );
          return;
        }
        this.addMessage(new Message('info', '"' + this.track.title + '" をプレイリスト "' + playlist.name + '" に追加しました'))
        this.$emit('addedTrackToPlaylist')
      },
    },
  })
</script>

<style scoped lang="scss">
</style>
