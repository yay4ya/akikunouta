import Vue from 'vue';
import Vuex from 'vuex';
import * as VuexAction from '@/store/action-types';
import * as VuexMutation from '@/store/mutation-types';
import State from '@/models/state';
import {library} from '@/models/library';
import {Track} from '@/models/track';
import {Playlist} from '@/models/playlist';
import {PlayerState, PlayerRepeat} from '@/models/player';
import Message from '@/models/message';

Vue.use(Vuex);

function getInitialState(): State {
  const playerState = library.loadPlayerState();
  const state: State = {
    queuedTracks: playerState.queuedTracks,
    playingTrack: playerState.playingTrack,
    searchQuery: '',
    favoriteTracks: library.loadFavoriteTracks(),
    playlists: library.loadPlaylists(),
    playerRepeat: playerState.repeat,
    playerVolume: playerState.volume,
    playerMute: playerState.mute,
    messages: [],
    historyTracks: playerState.playingTrack? [playerState.playingTrack] : [],
    historyIndex: 0,
  };
  return state;
}

function getPlayerState(state: State): PlayerState {
  return {
    playingTrack: state.playingTrack,
    queuedTracks: state.queuedTracks,
    repeat: state.playerRepeat,
    volume: state.playerVolume,
    mute: state.playerMute,
  }
}

export default new Vuex.Store({
  state: getInitialState(),
  mutations: {
    [VuexMutation.SET_PLAYING_TRACK](state: State, track: Track | null) {
      state.playingTrack = track;
      library.savePlayerState(getPlayerState(state));
      if (track) {
        state.historyTracks = state.historyTracks.slice(state.historyIndex);
        state.historyTracks.unshift(track)
        state.historyIndex = 0;
      }
    },
    [VuexMutation.MOVE_PREV_TRACK](state: State) {
      if (state.historyIndex >= state.historyTracks.length - 1) return;
      state.historyIndex += 1;
      state.playingTrack = state.historyTracks[state.historyIndex];
      library.savePlayerState(getPlayerState(state));
    },
    [VuexMutation.MOVE_NEXT_TRACK](state: State) {
      if (state.historyIndex < 1) return;
      state.historyIndex -= 1;
      state.playingTrack = state.historyTracks[state.historyIndex];
      library.savePlayerState(getPlayerState(state));
    },
    [VuexMutation.SET_QUEUE](state: State, tracks: Track[]) {
      state.queuedTracks = tracks;
      library.savePlayerState(getPlayerState(state));
    },
    [VuexMutation.SET_SEARCH_QUERY](state: State, query: string) {
      state.searchQuery = query;
    },
    [VuexMutation.ADD_TO_QUEUE](state: State, track: Track) {
      state.queuedTracks.push(track);
      library.savePlayerState(getPlayerState(state));
    },
    [VuexMutation.ADD_FAVORITE_TRACK](state: State, track: Track) {
      library.addFavoriteTrack(track);
      const favoriteTracks = state.favoriteTracks.map(x => x);
      favoriteTracks.unshift(track);
      state.favoriteTracks = favoriteTracks;
    },
    [VuexMutation.REMOVE_FAVORITE_TRACK](state: State, targetTrack: Track) {
      library.removeFavoriteTrack(targetTrack);
      state.favoriteTracks = state.favoriteTracks.filter(
        track => track.id !== targetTrack.id
      );
    },
    [VuexMutation.ADD_PLAYLIST](state: State, playlist: Playlist) {
      library.addPlaylist(playlist);
      state.playlists.unshift(playlist);
    },
    [VuexMutation.REMOVE_PLAYLIST](state: State, targetPlaylist: Playlist) {
      library.removePlaylist(targetPlaylist);
      state.playlists = state.playlists.filter(playlist => playlist.name != targetPlaylist.name);
    },
    [VuexMutation.SET_PLAYER_REPEAT](state: State, repeat: PlayerRepeat) {
      state.playerRepeat = repeat;
      library.savePlayerState(getPlayerState(state));
    },
    [VuexMutation.SET_PLAYER_VOLUME](state: State, volume: number) {
      state.playerVolume = volume;
      library.savePlayerState(getPlayerState(state));
    },
    [VuexMutation.SET_PLAYER_MUTE](state: State, mute: boolean) {
      state.playerMute = mute;
      library.savePlayerState(getPlayerState(state));
    },
    [VuexMutation.CLEAN_ALL](state: State) {
      state.playingTrack = null;
      state.queuedTracks = [];
      state.playerVolume = 50;
      state.playerMute = false;
      state.favoriteTracks = [];
      state.playlists = [];
      library.clean();
    },
    [VuexMutation.ADD_MESSAGE](state: State, message: Message) {
      state.messages.unshift(message);
      if (message.type === 'info') {
        window.setTimeout(() => {
          state.messages = state.messages.filter(m => m.uuid !== message.uuid)
        }, 5000);
      }
    },
    [VuexMutation.REMOVE_MESSAGE](state: State, targetMessage: Message) {
      state.messages = state.messages.filter(message => message.uuid !== targetMessage.uuid);
    },
  },
  actions: {
    [VuexAction.SET_NEXT_TRACK]({ commit }) {
      if (this.state.historyIndex > 0) {
        commit(VuexMutation.MOVE_NEXT_TRACK);
        return;
      }

      if (this.state.playingTrack === null) {
        commit(VuexMutation.SET_PLAYING_TRACK, this.state.queuedTracks[0] || null);
        return;
      }

      const playingTrack = this.state.playingTrack;
      const playingTrackIndex = this.state.queuedTracks.findIndex(
        track => track.uuid === playingTrack.uuid
      );

      // If the playing track is not found in the queue, the top track
      // in the queue will be selected, because playingTrackIndex
      // is -1 so that nextTrackIndex will be 0.

      let nextTrackIndex = playingTrackIndex + 1;
      if (this.state.playerRepeat === 'repeat') {
        nextTrackIndex = nextTrackIndex % this.state.queuedTracks.length;
      } else if (this.state.playerRepeat === 'repeat-once') {
        nextTrackIndex = playingTrackIndex;
      }
      const nextTrack = this.state.queuedTracks[nextTrackIndex];

      if (!nextTrack) {
        return;
      }

      // This statement is needed to notify other components that the
      // playing track is changed.
      if (nextTrack.uuid === this.state.playingTrack.uuid) {
        commit(VuexMutation.SET_PLAYING_TRACK, null);
      }

      commit(VuexMutation.SET_PLAYING_TRACK, nextTrack);
    },
    [VuexAction.SET_PREV_TRACK]({ commit }) {
      commit(VuexMutation.MOVE_PREV_TRACK);
    },
  },
  modules: {
  }
});
