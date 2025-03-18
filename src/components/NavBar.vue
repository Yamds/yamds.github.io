<template>
    <!-- 导航栏 -->
    <el-row>
        <el-col :span="isMobile==true? 12: 24">
            <el-menu
                active-text-color=var(--ctp-text)
                background-color=var(--ctp-base)
                :mode="isMobile==true? 'vertical':'horizontal'"
                :class="isMobile==true? 'el-menu':'el-menu-xs'"
                default-active="materials-search"
                text-color="#fff"
                @select="handleMenuSelect"
            >
                <el-menu-item v-for="item in guide" :key="item.name" :index="item.name">
                    <span>{{item.desc}}</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script lang="ts">
export default {
    name: 'NavBar'
}
</script>

<script setup lang="ts">
import { ref, watch, computed, onMounted} from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import emitter from "../utils/emitter";
let router = useRouter()
let isMobile = ref(false)
let guide = [
    {name: "materials-search", desc: "查询材料", icon: "Search"},
    {name: "simulation", desc: "装备模拟", icon: "Edit"},
    {name: "map", desc: "地图", icon: "Guide"},
    {name: "settings", desc: "设置", icon: "Setting"},
    {name: "info", desc: "说明", icon: "Star"},
]

// 设置当前激活的web
function handleMenuSelect(routeName:any) {
    router.push({ name: routeName})
}

emitter.on('send-isMobile', (value:any) => {
    isMobile.value = value
})
</script>

<style scoped>
.el-menu>.el-menu-item:hover {
    background-color: var(--ctp-surface0);
}

.el-menu>.el-menu-item span {
    font-size: 1.3em;
    margin-left: 0.7em;
}
.el-menu>.el-menu-item.is-active {
    background-color: var(--ctp-surface1);
}
.el-menu-xs {
    height: 30px;
    margin-bottom: 20px;
}
.el-menu-xs>.el-menu-item {
    /* margin-left: 0.1em !important; */
    padding: 5px;
    border-radius: 4px 4px 0 0;
}
.el-menu-xs>.el-menu-item span {
    font-size: 1em !important;
    line-height: 26px;
    margin: 0;
    padding: 10px;
}
</style>
