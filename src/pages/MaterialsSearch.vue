<template>
    <div class="row">
        <!-- 页面一：材料筛选 -->
        <div class="col-12 col-md-6">
            <MaterialsTypes />
            <MaterialsListShow />
        </div>
        <!-- 展示卡片 -->
        <div class="col-12 col-md-6">
            <MaterialsShowCard />
        </div>
    </div>

</template>

<script lang="ts">
export default {
    name: "MaterialsSearch",
    components: {
        MaterialsTypes,
        MaterialsListShow,
        MaterialsShowCard
    }
}
</script>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import MaterialsTypes from '../components/materials-search/MaterialsTypes.vue'
import MaterialsListShow from '../components/materials-search/MaterialsListShow.vue'
import MaterialsShowCard from '../components/materials-search/MaterialsShowCard.vue';

let theme_color = ref(localStorage.getItem('theme') || 'macchiato')
let customColor = ref(localStorage.getItem('customColor') || 'mauve')

onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme_color.value)
    document.documentElement.style.setProperty('--ctp-custom', `var(--ctp-${customColor.value})`)
})

</script>

<style></style>