import Vue from 'vue';
import Vuex from 'vuex';
import Library from '@/polyphony/library';
import {Track} from '@/polyphony/track';
import * as VuexMutation from '@/store/mutation-types';
import * as Model from '@/model';

Vue.use(Vuex);

const initialState: Model.State = {
  library: new Library(),
  playingTrack: null,
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    [VuexMutation.SET_PLAYING_TRACK](state: Model.State, track: Track) {
      state.playingTrack = track;
    }
  },
  actions: {
  },
  modules: {
  }
});
