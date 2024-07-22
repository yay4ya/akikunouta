import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        main: '#ffda6f',
        sub: '#c4ff9c',
        accent: {
          base: '#f96666',
          lighten1: '#ffd1d1',
        },
        // background1: '#fffbe8',
        background1: '#ffefbf',
        background2: '#fffbe8',
      },
    },
    options: { customProperties: true },
  }
});
