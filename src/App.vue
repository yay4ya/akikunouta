<template>
  <v-app>
    <v-main>
      <v-container class="d-flex main-container">

        <div class="left" v-bind:class="{ show: player, hide: !player }">
          <Player id="video-player"/>
          <Queue id="queue" class="scroll-thin"/>
        </div>

        <div class="right">
          <div id="search-and-info">
            <div id="search">
              <v-icon
                color="accent"
                size="24"
                class="icon-search"
              >mdi-magnify</v-icon>
              <v-text-field
                v-model="query"
                color="accent"
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
            <div class="btn-info">
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
              </div>
        </div>
          <div id="nav">
            <div class="nav-container">
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

      <v-overlay
        v-if="sharedPlayer && urlQuery.tracks"
        opacity="0.3"
        :dark="false"
      >
        <div class="shared-player-overlay">
          <div class="shared-player-controls">
            <v-btn
              icon
              color="white"
              small
              @click="sharedPlayer=false"
            ><v-icon>mdi-close</v-icon></v-btn>
          </div>
          <div id="shared-player">
            <SharedPlayer/>
          </div>
        </div>
      </v-overlay>
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
      SharedPlayer: () => import ('@/components/SharedPlayer.vue'),
     },
    data() {
      return {
        library: library,
        player: false,
        sharedPlayer: true,
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
      urlQuery(): object {
        return this.$route.query;
      }
    },
    methods: {
      ...mapMutations({
        setSearchQuery: VuexMutation.SET_SEARCH_QUERY,
      }),
      togglePlayer() {
        this.player = !this.player;
      },
      toggleSharedPlayer() {
        this.sharedPlayer = !this.sharedPlayer;
      }
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
    background-color: var(--v-background1-base);
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
    height: 100vh;
    max-width: 1390px;
    background-color: var(--v-background2-base);
    font-size: 97%;
    font-family: 'Noto Sans JP', sans-serif;;
    border-radius: 20px;
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
      background-color: white;
      border-radius: 20px;
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

    #search-and-info {
      display: flex;
      position: relative;
      width: 100%;
      height: 70px;
      justify-content: space-between;
      align-items: center;

      #search {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;

        .icon-search {
          padding-bottom: 15px;
        }

        .v-input {
          position: absolute;
          left: 30px;
          width: calc(100% - 50px);
          padding: 0;
        }

        .btn-clear-query {
          position: absolute;
          right: 10px;
          padding: 0;
          margin: 0;
        }
      }

      .btn-info {
        padding-bottom: 15px;
      }
    }

    #nav {
      padding: 0;
      margin-bottom: 5px;
      display: block;

      .nav-container {
        display: flex;
      }

      .router-link {
        display: block;
        position: relative;
        width: 100%;
        height: 100%;
        padding: 2px;
        text-decoration: none;
        text-align: center;
        border-radius: 10px;
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
          font-size: 0.6em;
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
      background-color: var(--v-main-base);
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

  .shared-player-overlay {
    width: 100vw;
    height: 100vh;
    max-height: 490px;
    max-width: 1100px;

    @media screen and (max-width: 780px) {
      max-height: 100vh;
    }

    .shared-player-controls {
      width: 100%;
      height: 32px;
      display: flex;
      justify-content: flex-end;
      .v-btn {
        font-size: 1rem;
        background-color: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        margin-bottom: 5px;
      }
    }

    #shared-player {
      background-color: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      overflow-y: auto;
      width: 100%;
      height: calc(100% - 32px);
    }

  }
</style>
