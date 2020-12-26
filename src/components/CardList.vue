<template>
  <v-container>

  <ul class="card-list">
    <li
      v-for="card in cards"
      v-bind:key="card.id"
      class="card-list-item"
      v-bind:style = "{ display: matchQuery(card)? 'block': 'none' }"
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
    props: ['cards', 'query'],
    components: {
      Card: () => import ('@/components/Card.vue'),
    },
    methods: {
      onClick(card: Card) {
        this.$emit('clicked', card);
      },
      matchQuery(card: Card): boolean {
        const target = [
          card.title,
          card.subtitle,
          card.metadata,
        ].join('  ').toLowerCase();
        return target.indexOf(this.query.toLowerCase()) >= 0;
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
