<template>
  <v-container>

  <ul class="list">
    <li
      v-for="video in videos"
      v-bind:key="video.id"
      class="item"
    >
      <Video
        :video="video"
        @clicked="onClick"
      />
    </li>
  </ul>

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Video} from '@/models/youtube';

  export default Vue.extend({
    name: 'VideoList',
    props: ['list'],
    components: {
      Video: () => import ('@/components/Video.vue'),
    },
    data() {
      return {
        videos: [],
      }
    },
    async created() {
      await Promise.all(this.list.map(
       (video: Video) => video.fetchVideoInfo()
      )).then(() => this.videos = this.list);
    },
    methods: {
      onClick(video: Video) {
        this.$emit('clicked', video);
      }
    }
  })
</script>

<style scoped lang="scss">
  .list{
    padding: 0;

    &:after {
      clear: both;
      content: '';
      display: block;
    }
  }

  .item {
    list-style: none;
    float: left;
  }
</style>
