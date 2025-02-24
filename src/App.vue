<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-10 offset-1">
        <h1 id="title">营火查询工具</h1>
        <NavBar />
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import './assets/css/theme.scss'
  import 'bootstrap/dist/css/bootstrap.css';
  import { RouterView } from 'vue-router';

  import NavBar from './components/NavBar.vue'
  import MaterialsSearch from './pages//MaterialsSearch.vue'
  import Info from './pages/Info.vue'
  import Settings from './pages/Settings.vue'

  export default {
    name: 'App',
    components: {
      NavBar,
      MaterialsSearch,
      Info,
      Settings
    }
  }
</script>

<script lang="ts" setup>
  
</script>

<style scoped>
  #app {
    background-color: var(--ctp-base);
  }
  #title {
    margin: 0.67em 0;
    /* font-size: 2em */
  }
</style>