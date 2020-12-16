<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      height="50"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container class="d-flex main-container">

        <div class="left">
          <Player id="video-player"/>
          <Queue id="queue" class="scroll-thin"/>
        </div>

        <div class="right">
            <v-text-field
              v-model="query"
            ></v-text-field>
          <div id="nav">
            <router-link to="/">Videos</router-link> |
            <router-link to="/tracks">Tracks</router-link> |
            <router-link to="/covers">Covers</router-link> |
          </div>
          <keep-alive>
            <router-view class="router-view"/>
          </keep-alive>
        </div>

      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import * as VuexMutation from '@/store/mutation-types';
  import {library} from '@/models/library';

  export default Vue.extend({
    name: 'App',
    components: {
      Queue: () => import ('@/components/Queue.vue'),
      Player: () => import ('@/components/Player.vue'),
     },
    data() {
      return {
        library: library,
      }
    },
    computed: {
      ...mapState(['playingTrack', 'searchQuery']),
      query: {
        get(): string {
          return this.searchQuery;
        },
        set(query: string) {
          this.setSearchQuery(query);
        }
      },
    },
    methods: {
      ...mapMutations({
        setSearchQuery: VuexMutation.SET_SEARCH_QUERY,
      }),
    },
  });
</script>

<style lang="scss">
  .scroll-thin {
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        width: 7px;
        height: 0;
        background-color: #f0f0f0;
      }

      &::-webkit-scrollbar-thumb {
        background: #cdcdcd;
      }
  }
</style>

<style scoped lang="scss">
  .container {
    padding: 3px 15px;
    max-width: 1400px;
    height: calc(100vh - 50px);
  }
  .main-container {
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  }

  .left {
    width: 400px;

    #video-player {
      margin-bottom: 10px;
      height: 320px;
      overflow: hidden;
    }

    #queue {
      padding: 0;
      height: calc(100% - 335px);
      background-color: #f3f3f3;
    }
  }

  .right {
    margin-left: 20px;
    min-width: 270px;
    width: 100%;

    #nav {
      height: 150px;
      padding: 0;
    }

    .router-view {
      padding: 0;
      height: calc(100% - 230px);
    }
  }
</style>