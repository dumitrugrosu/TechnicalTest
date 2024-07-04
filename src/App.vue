<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}
/* In App.vue or a global CSS file */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  flex: 1 1 calc(33.333% - 16px);
  margin: 8px;
}

@media (max-width: 768px) {
  .card {
    flex: 1 1 calc(50% - 16px);
  }
}

@media (max-width: 480px) {
  .card {
    flex: 1 1 calc(100% - 16px);
  }
}

</style>
