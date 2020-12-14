import Vue from 'vue';
import Vuex from 'vuex';
import {Track} from '@/polyphony/track';
import * as VuexAction from '@/store/action-types';
import * as VuexMutation from '@/store/mutation-types';
import * as Model from '@/model';

Vue.use(Vuex);

function getInitialState(): Model.State {
  const state: Model.State = {
    queuedTracks: [],
    playingTrack: null,
  };
  return state;
}

export default new Vuex.Store({
  state: getInitialState(),
  mutations: {
    [VuexMutation.SET_PLAYING_TRACK](state: Model.State, track: Track | null) {
      state.playingTrack = track;
    },
    [VuexMutation.SET_QUEUE](state: Model.State, tracks: Track[]) {
      state.queuedTracks = tracks;
    },
  },
  actions: {
    [VuexAction.SET_NEXT_TRACK]({ commit }) {
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

      const nextTrackIndex = playingTrackIndex + 1;
      const nextTrack = this.state.queuedTracks[nextTrackIndex];

      if (!nextTrack) {
        return;
      }

      commit(VuexMutation.SET_PLAYING_TRACK, nextTrack);
    },
    [VuexAction.SET_PREV_TRACK]({ commit }) {
      if (this.state.playingTrack === null) {
        return;
      }

      const playingTrack = this.state.playingTrack;
      const playingTrackIndex = this.state.queuedTracks.findIndex(
        track => track.uuid === playingTrack.uuid
      );

      if (playingTrackIndex < 0) {
        return;
      }

      const prevTrackIndex = playingTrackIndex - 1;
      const prevTrack = this.state.queuedTracks[prevTrackIndex];

      if (!prevTrack) {
        return;
      }

      commit(VuexMutation.SET_PLAYING_TRACK, prevTrack);
    },
  },
  modules: {
  }
});
