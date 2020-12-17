<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      height="50"
      elevation="0"
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
          <div id="search">
            <v-icon color="rgb(249, 102, 102)" size="30">mdi-magnify</v-icon>
            <v-text-field
              v-model="query"
              color="#e55555"
            ></v-text-field>
          </div>
          <div id="nav">
            <router-link to="/">Videos</router-link> |
            <router-link to="/tracks">Tracks</router-link> |
            <router-link to="/covers">Covers</router-link> |
            <router-link to="/favorites">Favorites</router-link> |
          </div>
          <keep-alive>
            <router-view id="router-view"/>
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

<style lang="scss">
  .v-main__wrap {
    background-color: #f2f2f2;
  }
</style>

<style scoped lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP');

  .container {
    padding: 10px 15px;
    height: calc(100vh - 50px);
    max-width: 1390px;
    background-color: #fffbe8;
    font-size: 97%;
    font-family: 'Noto Sans JP', sans-serif;;
  }

  .left {
    height: 100%;
    width: 400px;
    display: flex;
    flex-direction: column;

    #video-player {
      height: 500px;
      margin-bottom: 15px;
    }

    #queue {
      height: 100%;
      padding: 0;
      overflow: hidden;
      border-radius: 10px 10px 10px 10px;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .right {
    height: 100%;
    width: calc(100% - 400px);
    display: flex;
    flex-direction: column;
    padding-left: 15px;

    #search {
      display: flex;

      .v-icon {
        padding-right: 10px;
        height: 50px;
      }

      .v-input {
        padding: 0;
      }
    }

    #nav {
      padding: 0;
    }

    #router-view {
      width: 100%;
      padding: 0;
      border-radius: 10px 10px 10px 10px;
      background-color: rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
  }
</style>
