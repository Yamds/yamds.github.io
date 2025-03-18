<template>
    <div id="app" class="container-fluid">
        <Tips ref="tips" />
        <el-container>
            <el-header>
                <h1 id="title">营火查询工具</h1>
            </el-header>
            <el-container>
                <el-aside v-if="isMobile">
                    <NavBar />
                </el-aside>
                <el-main>
                    <NavBar v-if="!isMobile" />
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
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
import { ref, provide, onMounted, onUnmounted } from 'vue'
import emitter from './utils/emitter'
import './assets/css/theme.scss'
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue'
import MaterialsSearch from './pages//MaterialsSearch.vue'
import Info from './pages/Info.vue'
import Settings from './pages/Settings.vue'
import Tips from './utils/Tips.vue'

let tips = ref<any>(null)
let isMobile = ref(true)

function isMobileCalc() {
    isMobile.value = window.innerWidth >= 768
    emitter.emit('send-isMobile', isMobile.value)
}

// 提供全局调用方法
onMounted(() => {
    emitter.on('send-tips', (value: any) => {
        tips.value?.addTips(value.title, value.message, value.type)
    })
    window.addEventListener('resize', isMobileCalc);
    isMobileCalc()
})

onUnmounted(() => {
    window.addEventListener('resize', isMobileCalc);
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

.el-header {
    margin-bottom: 2em;
}
</style>
