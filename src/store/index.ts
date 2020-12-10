import Vue from 'vue';
import Vuex from 'vuex';
import Library from '@/polyphony/library';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    library: new Library(),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
