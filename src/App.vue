<template>
  <div id="app" class="container-fluid">
    <!-- 加载动画 -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status" style="color: var(--ctp-custom);"></div>
        <div class="loading-text">稍等，正在加载图标...</div>
      </div>
    </div>
    
    <div class="row" v-show="!loading">
      <div class="col-10 offset-1">
        <h1 id="title">营火查询工具</h1>
        <NavBar />
        <MaterialsSearch v-show="active_web == 1" />
        <Settings v-show="active_web == 2" />
        <Info v-show="active_web == 3" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import './assets/css/theme.scss'
  import 'bootstrap/dist/css/bootstrap.css';
  import NavBar from './components/NavBar.vue'
  import MaterialsSearch from './components/materials-search/MaterialsSearch.vue'
  import Info from './components/info/Info.vue'
  import Settings from './components/settings/Settings.vue'
  import { ref, onMounted } from 'vue'
  import emitter from './utils/emitter';

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
  let active_web = ref(1)
  let loading = ref(true)

  // 预加载图片
  function preloadImages() {
    const images = import.meta.glob('./assets/img/*.(png|jpe?g|svg)', { eager: true })
    const imagePromises = Object.keys(images).map((key) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = key.replace('/src', '')
        img.onload = resolve
        img.onerror = reject
      })
    })

    return Promise.all(imagePromises)
  }

  onMounted(async () => {
    try {
      await preloadImages()
    } catch (error) {
      console.error('图片预加载失败:', error)
    } finally {
      loading.value = false
    }
  })

  // 从NavBar接收目前浏览的标签
  emitter.on("send-active_web", (value: any) => {
    active_web.value = value
    console.log("Active web:", active_web.value); // 调试
  })
</script>

<style scoped>
  #app {
    background-color: var(--ctp-base);
  }
  #title {
    margin: 0.67em 0;
    /* font-size: 2em */
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--ctp-base);
    z-index: 9999;
  }

  .loading-content {
    text-align: center;
  }

  .loading-text {
    margin-top: 1rem;
    color: var(--ctp-text);
    font-size: 1.2rem;
  }
</style>