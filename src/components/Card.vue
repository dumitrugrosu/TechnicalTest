<template>
    <div class="card">
      <h3 @click="goToDetail">{{ card.name }}</h3>
      <p>{{ card.data ? formatData(card.data) : 'No data available' }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      card: Object,
    },
    methods: {
      goToDetail() {
        this.$router.push(`/detail/${this.card.id}`);
      },
      formatData(data) {
        return Object.entries(data).map(([key, value]) => `${key}: ${value}`).join(', ');
      }
    },
  };
  </script>
  
  <style scoped>
  .card {
    border: 1px solid #ccc;
    padding: 16px;
    margin: 8px;
  }
  h3 {
    cursor: pointer;
  }
  </style>
  