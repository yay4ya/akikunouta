<template>
  <v-container>

  <ul class="card-list">
    <li
      v-for="card in cards"
      v-bind:key="card.id"
      class="card-list-item"
    >
      <Card
        :card="card"
        @clicked="onClick"
      />
    </li>
  </ul>

  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Card from '@/models/card';

  export default Vue.extend({
    name: 'CardList',
    props: ['cards'],
    components: {
      Card: () => import ('@/components/Card.vue'),
    },
    methods: {
      onClick(card: Card) {
        this.$emit('clicked', card);
      }
    }
  })
</script>

<style scoped lang="scss">
  .card-list{
    padding: 0;

    display: flex;
    justify-content: stretch;
    flex-wrap: wrap;
  }

  .card-list-item {
    list-style: none;
  }
</style>
