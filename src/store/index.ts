import Vue from 'vue';
import Vuex from 'vuex';
import Library from '@/polyphony/library';
import {Track} from '@/polyphony/track';
import * as VuexAction from '@/store/action-types';
import * as VuexMutation from '@/store/mutation-types';
import * as Model from '@/model';

Vue.use(Vuex);

const initialState: Model.State = {
  library: new Library(),
  queue: [],
  history: [],
  playingTrack: null,
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    [VuexMutation.SET_PLAYING_TRACK](state: Model.State, track: Track) {
      state.playingTrack = track;
      state.history.push(track);
    },
    [VuexMutation.SET_QUEUE](state: Model.State, tracks: Track[]) {
      state.queue = tracks;
    },
  },
  actions: {
    [VuexAction.SET_NEXT_TRACK]({ commit }) {
      console.log("set next")
      const nextTrack = this.state.queue[0];
      if (nextTrack !== undefined) {
        // Set null to surely change the playing track.
        commit(VuexMutation.SET_PLAYING_TRACK, null);
        commit(VuexMutation.SET_PLAYING_TRACK, nextTrack);
        commit(VuexMutation.SET_QUEUE, this.state.queue.slice(1));
      }
    },
  },
  modules: {
  }
});
