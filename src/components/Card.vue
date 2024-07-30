<template>
  <v-container>
    <v-card
      rounded
      @click="onClick"
    >
      <div class="card-thumbnail">
        <v-img
          :src="card.thumbnailUrl"
          height="120"
        ></v-img>
      </div>

      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title
            v-text="card.title"
            class="card-info card-title"
          ></v-card-title>

          <v-card-subtitle
            v-if="card.subtitle"
            v-text="card.subtitle"
            class="card-info card-subtitle"
          ></v-card-subtitle>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Card',
    props: ['card', 'width', 'height'],
    methods: {
      onClick() {
        this.$emit('clicked', this.card);
      },
    },
  })
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    padding: 0;
    border-radius: 10px;
    overflow: hidden;
  }

  .v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: none;
  }

  .v-card {
    width: 100%;
    height: 100%;
    max-height: 190px;
    position: relative;
    overflow: hidden;
    user-select: none;

    &:after {
      transition: opacity 0.3s;
      opacity: 0;
    }

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

    .card-info {
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 8px;
    }

    .card-title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 0.8em;
      line-height:1.5em;
      padding-bottom: 0;
      margin-bottom: 1em;
    }

    .card-subtitle {
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.8em;
      line-height:1em
    }
  }
</style>
