<template>
  <v-container>
    <v-card
      v-on:click="() => {}"
      class="mx-auto my-12"
      width="220"
      height="190"
    >
    <div class="video-thumbnail">
      <v-img
        :src="video.getThumbnailURL('hqdefault')"
        height="120"
      ></v-img>
    </div>

      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            v-text="video.getTitle()"
            class="video-info video-title"
          ></v-card-title>

          <v-card-subtitle
            v-text="video.getChannel().name"
            class="video-info video-channel"
          ></v-card-subtitle>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Video',
    props: ['video'],
  })
</script>

<style scoped lang="scss">
  .container {
    padding: 2px;
  }

  .v-card {
    position: relative;
    margin: 5px !important;
    overflow: hidden;

    &:hover:after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: #000000;
      opacity: 0.1;
    }

    .video-info {
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 8px;
    }

    .video-title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 0.8em;
      line-height:1.5em;
      padding-bottom: 0;
      margin-bottom: 1em;
    }

    .video-channel {
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.8em;
      line-height:1em
    }
  }
</style>
