<template>
  <div>
    <CardDetail />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardDetail from '@/components/CardDetail.vue';

export default defineComponent({
  components: {
    CardDetail
  }
});
</script>
