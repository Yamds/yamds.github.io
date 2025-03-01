<template>
    <!-- 导航栏 -->
    <div class="navbar col-md-12">
        <ul>
            <li :class="{ active: active_web == 1 }">
                <keep-alive>
                    <RouterLink :to="{ name: 'materials-search' }">查询材料</RouterLink>
                </keep-alive>
            </li>
            <li :class="{ active: active_web == 2 }">
                <keep-alive>
                    <RouterLink :to="{ name: 'simulation' }">装备模拟</RouterLink>
                </keep-alive>
            </li>
            <li :class="{ active: active_web == 3 }">
                <keep-alive>
                    <RouterLink :to="{ name: 'settings' }">设置</RouterLink>
                </keep-alive>
            </li>
            <li :class="{ active: active_web == 4 }">
                <keep-alive>
                    <RouterLink :to="{ name: 'info' }">说明</RouterLink>
                </keep-alive>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
export default {
    name: 'NavBar'
}
</script>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import emitter from "../utils/emitter";
let active_web = ref(1)
let route = useRoute()

// 根据当前路由设置active_web
const setActiveWebByRoute = () => {
    switch (route.name) {
        case 'materials-search':
            active_web.value = 1;
            break;
        case 'simulation':
            active_web.value = 2;
            break;
        case 'settings':
            active_web.value = 3;
            break;
        case 'info':
            active_web.value = 4;
            break;
        default:
            active_web.value = 1;
    }
};

// 初始化时设置
onMounted(() => {
    setActiveWebByRoute();
});

// 监听路由变化
watch(() => route.name, () => {
    setActiveWebByRoute();
});

// 向app传递选择的web
watch(active_web, (value) => {
    emitter.emit("send-active_web", value)
})
</script>

<style scoped>
.navbar ul {
    border-bottom: 1px solid var(--ctp-custom);
    width: 100%;
    padding: 0;
}

.navbar li {
    list-style: none;
    display: inline-block;
    border-radius: 5px 5px 0 0;
    cursor: pointer;
}

.navbar li:not(.active):hover {
    background-color: var(--ctp-surface0);
    border: 1px solid var(--ctp-custom);
    border-bottom: none;
    margin: 0 -1px;
    transition: background-color 0.3s ease;
}

.navbar li a {
    display: inline-block;
    padding: 0.7em 0.7em 0.3em 0.7em;
    text-decoration: none !important;
    font-size: 1.3em;
    color: var(--ctp-text);
    text-align: center;
    line-height: 1.4;
}

.active {
    border: 1px solid var(--ctp-custom);
    border-bottom: none;
    box-shadow: 0 2px 0 0 var(--ctp-base);
    margin: 0 -1px;
}
</style>
