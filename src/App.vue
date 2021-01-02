<template>
  <v-app>
    <v-app-bar
      app
      color="#ffda6f"
      height="50"
      elevation="0"
      class="header"
    >
      <div class="d-flex align-center">
      </div>

      <v-spacer></v-spacer>

      <v-dialog
        max-width="820px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-on="on"
            v-bind="attrs"
          >
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
          <v-card>
            <Config/>
          </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <v-container class="d-flex main-container">

        <div class="left" v-bind:class="{ show: player, hide: !player }">
          <Player id="video-player"/>
          <Queue id="queue" class="scroll-thin"/>
        </div>

        <div class="right">
          <div id="search">
            <v-icon
              color="rgb(249, 102, 102)"
              size="30"
              class="icon-search"
            >mdi-magnify</v-icon>
            <v-text-field
              v-model="query"
              color="#e55555"
              hint="キーワードで検索: 「歌ってみた コラボ」「歌枠 音源あり」..."
            ></v-text-field>
            <v-btn
              icon
              class="btn-clear-query"
              @click="query = ''"
            >
              <v-icon size="20">mdi-close</v-icon>
            </v-btn>
          </div>
          <div id="nav">
            <router-link to="/videos" class="router-link">
              <v-icon>mdi-youtube</v-icon>
              <span>動画</span>
            </router-link>

            <router-link to="/tracks" class="router-link">
              <v-icon>mdi-music-circle</v-icon>
              <span>曲</span>
            </router-link>

            <router-link to="/covers" class="router-link">
              <v-icon>mdi-record-circle</v-icon>
              <span>歌ってみた</span>
            </router-link>

            <router-link to="/favorites" class="router-link">
              <v-icon>mdi-heart-circle</v-icon>
              <span>いいね</span>
            </router-link>

            <router-link to="/playlists" class="router-link">
              <v-icon>mdi-playlist-music</v-icon>
              <span>プレイリスト</span>
            </router-link>
          </div>

          <keep-alive>
            <router-view id="router-view"/>
          </keep-alive>
        </div>

        <div id="player-toggle" v-on:click="togglePlayer">
          <div class="playing-track-info">
            <div v-if="playingTrack">
              <div class="playing-track-title">
                {{ playingTrack.title + ' / ' + playingTrack.artist}}
              </div>
              <div class="playing-track-singer">
                {{ playingTrack.singer }}
              </div>
            </div>
          </div>
          <v-btn
            icon
          >
            <v-icon size="40">{{ player? 'mdi-chevron-down' : 'mdi-chevron-up'  }}</v-icon>
          </v-btn>
        </div>

        <MessageTray id="message-tray"/>
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
      Config: () => import ('@/components/Config.vue'),
      MessageTray: () => import ('@/components/MessageTray.vue'),
     },
    data() {
      return {
        library: library,
        player: false,
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
      routerPath(): string {
        return this.$route.path;
      },
    },
    methods: {
      ...mapMutations({
        setSearchQuery: VuexMutation.SET_SEARCH_QUERY,
      }),
      togglePlayer() {
        this.player = !this.player;
      },
    },
    watch: {
      playingTrack() {
        this.player = this.playingTrack !== null;
      }
    }
  });
</script>

<style lang="scss">
  .v-main__wrap {
    background-color: #f6f6f6;
    overflow: hidden;
  }

  @media screen and (max-width: 780px) {
    .v-main {
      padding-top: 0 !important;
      height: 100vh;
    }
  }

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
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP');

  .main-container {
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
    transition: all 0.2s ease;
    background-color: inherit;

    #video-player {
      margin-bottom: 15px;
    }

    #queue {
      height: 100%;
      padding: 0;
      overflow: hidden;
      border-radius: 10px 10px 10px 10px;
      background-color: rgba(100, 100, 100, 0.1);
    }
  }

  .right {
    height: 100%;
    width: calc(100% - 400px);
    display: flex;
    flex-direction: column;
    padding-left: 15px;
    transition: all 0.2s ease;

    #search {
      display: flex;
      position: relative;
      width: 100%;
      height: 70px;

      .icon-search {
      }

      .v-input {
        position: absolute;
        left: 40px;
        width: calc(100% - 50px);
        padding: 0;
      }

      .btn-clear-query {
        position: absolute;
        right: 0;
      }
    }

    #nav {
      padding: 0;
      margin-bottom: 9px;
      display: flex;

      .router-link {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        padding: 3px;
        text-decoration: none;
        text-align: center;
        border-radius: 5px 5px 5px 5px;
        overflow: hidden;

        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(100, 100, 100, 0.1);
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        &:hover:after {
          opacity: 1;
        }

        &.router-link-active {
          background-color: rgba(100, 100, 100, 0.1);
        }

        .router-link-content {
          margin: auto;
        }

        .v-icon {
          display: block;
        }

        span {
          display: block;
          color: gray;
          font-size: 0.7em;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          user-select: none;
        }
      }
    }

    #router-view {
      width: 100%;
      padding: 0;
      border-radius: 10px 10px 10px 10px;
      background-color: rgba(100, 100, 100, 0.1);
      overflow: hidden;
    }
  }

  #message-tray {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 350px;
    z-index: 1000;
  }

  #player-toggle {
    display: none;
  }

  @media screen and (max-width: 780px) {
    .main-container {
    }

    .header {
      display: none;
    }

    .left {
      display: flex;
      position: absolute;
      padding: 5px;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: calc(100vh - 50px);

      @keyframes show{
        from{
          transform: translateY(100vh);
          height: calc(100vh - 50px);
        }
        to{
          transform: translateY(0);
          height: calc(100vh - 50px);
        }
      }

      @keyframes hide {
        from{
          transform: translateY(0);
        }
        to{
          transform: translateY(100vh);
        }
      }

      &.hide {
        animation: hide 0.2s ease;
        transform: translateY(100vh);
        overflow: hidden;
        height: 0;
        margin: 0;
        padding: 0;
      }

      &.show {
        animation: show 0.2s ease;
        transform: translateY(0);
      }
    }

    .right {
      width: 100%;
      padding: 0;
    }

    #message-tray {
      bottom: 50px;
    }

    #player-toggle {
      display: flex;
      justify-content: space-between;
      position: fixed;
      bottom: 0;
      left: 0;
      padding: 5px 20px;
      width: 100%;
      height: 50px;
      background-color: #ffda6f;
      z-index: 2;

      .playing-track-info {
        margin: auto;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        .playing-track-title {
          font-size: 0.8em;
          color: #434343;
        }
        .playing-track-singer {
          font-size: 0.7em;
          color: gray;
        }
      }
    }
  }


</style>
