<template>
  <v-container>
    <transition-group name="slide" tag="div" class="message-list">
      <div
        v-for="message in messages"
        v-bind:key="message.uuid"
        v-on:click="removeMessage(message)"
      >
        <v-banner
          elevation="20"
          rounded
        >
          <v-icon
            v-if="message.type === 'error'"
            slot="icon"
            color="error"
          >
            mdi-alert-octagram
          </v-icon>
          <v-icon
            v-else-if="message.type === 'warning'"
            slot="icon"
            color="warning"
          >
            mdi-alert
          </v-icon>
          <v-icon
            v-else
            slot="icon"
          >
            mdi-information
          </v-icon>
          {{ message.text }}
        </v-banner>
      </div>
    </transition-group>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {mapState, mapMutations} from 'vuex';
  import * as VuexMutation from '@/store/mutation-types';

  export default Vue.extend({
    name: 'DataManager',
    computed: {
      ...mapState(['messages']),
    },
    methods: {
      ...mapMutations({
        removeMessage: VuexMutation.REMOVE_MESSAGE,
      }),
    },
  });
</script>

<style lang="scss" scoped>
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s ease;
  }

  .slide-enter, .slide-leave-to {
    transform: translateX(100%);
  }


  .message-list {
    .v-banner {
      margin-top: 5px;
      background-color: #ffffff !important;
    }
  }
</style>
