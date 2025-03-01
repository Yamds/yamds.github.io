<template>
    <div id="app" class="container-fluid">
        <Tips ref="tips" />
        <div class="row">
            <div class="col-10 offset-1">
                <h1 id="title">营火查询工具</h1>
                <!-- <button @click="addTips('测试title', '测试tips', 'info')">添加tips</button>
                <button @click="addTips('测asdaswertle', 'asdasddwqe', 'error')">添加error</button> -->
                <NavBar />
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import './assets/css/theme.scss'
import { RouterView } from 'vue-router';

import NavBar from './components/NavBar.vue'
import MaterialsSearch from './pages//MaterialsSearch.vue'
import Info from './pages/Info.vue'
import Settings from './pages/Settings.vue'
import Tips from './utils/Tips.vue'

export default {
    name: 'App',
    components: {
        NavBar,
        MaterialsSearch,
        Info,
        Settings,
        Tips
    }
}
</script>

<script lang="ts" setup>
import { ref, provide, onMounted } from 'vue'
import emitter from './utils/emitter'

const tips = ref<any>(null)

// 提供全局调用方法
onMounted(() => {
    emitter.on('send-tips', (value: any) => {
        tips.value?.addTips(value.title, value.message, value.type)
    })
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
</style>