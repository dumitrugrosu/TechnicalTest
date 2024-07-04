<template>
  <div>
    <h1>Home</h1>
    <CardList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardList from '@/components/CardList.vue';

export default defineComponent({
  components: {
    CardList
  }
});
</script>
