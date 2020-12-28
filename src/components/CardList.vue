<template>
  <v-container class="card-list-container">
    <div class="card-list scroll-thin">
      <div
        v-for="card in cards"
        v-bind:key="card.id"
        class="card-list-item"
        v-bind:style = "{ display: matchQuery(card)? 'block': 'none' }"
      >
        <Card
          :card="card"
          @clicked="onClick"
          class="card"
        />
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Card from '@/models/card';

  export default Vue.extend({
    name: 'CardList',
    props: ['cards', 'query', 'cardWidth'],
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
        let match = true;
        for (const keyword of this.query.toLowerCase().split(/\s/)) {
          match = match && (target.indexOf(keyword) >= 0);
        }
        return match;
      }
    },
  })
</script>

<style scoped lang="scss">
  .card-list-container {
    width: 100%;
    height: 100%;
  }
  .card-list{
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    width: 100%;
    max-height: 100%;
    padding-right: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .card {
    width: 100%;
    height: 100%;
  }
</style>
