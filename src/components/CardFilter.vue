<template>
    <div>
      <input type="text" v-model="filter" @input="onFilterChange" placeholder="Filter by name" />
      <select v-model="sort" @change="onSortChange">
        <option value="asc">Sort by name (A-Z)</option>
        <option value="desc">Sort by name (Z-A)</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filter: '',
        sort: 'asc'
      };
    },
    methods: {
      onFilterChange() {
        this.$emit('filter', this.filter);
      },
      onSortChange() {
        this.$emit('sort', this.sort);
      }
    }
  };
  </script>
  
  <style scoped>
  input, select {
    margin: 8px;
    padding: 8px;
  }
  </style>
  