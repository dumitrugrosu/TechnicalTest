<template>
    <div>
      <CardFilter @filter="applyFilter" @sort="applySort" />
      <div class="card-list">
        <Card v-for="card in filteredCards.slice(0, displayedCount)" :key="card.id" :card="card" />
      </div>
      <button @click="loadMore" v-if="displayedCount < filteredCards.length">Load More</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Card from './Card.vue';
  import CardFilter from './CardFilter.vue';
  
  export default {
    components: { Card, CardFilter },
    data() {
      return {
        cards: [],
        filter: '',
        sortDirection: 'asc',
        displayedCount: 10,
      };
    },
    computed: {
      filteredCards() {
        let filtered = this.cards.filter(card => card.name.toLowerCase().includes(this.filter.toLowerCase()));
        return this.sortDirection === 'asc' 
          ? filtered.sort((a, b) => a.name.localeCompare(b.name)) 
          : filtered.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
    created() {
      this.fetchCards();
    },
    methods: {
      fetchCards() {
        axios.get('https://api.restful-api.dev/objects')
          .then(response => {
            this.cards = response.data;
          });
      },
      loadMore() {
        this.displayedCount += 10;
      },
      applyFilter(filter) {
        this.filter = filter;
      },
      applySort(direction) {
        this.sortDirection = direction;
      }
    }
  };
  </script>
  
  <style scoped>
  .card-list {
    display: flex;
    flex-wrap: wrap;
  }
  button {
    margin-top: 16px;
    padding: 8px 16px;
  }
  </style>
  