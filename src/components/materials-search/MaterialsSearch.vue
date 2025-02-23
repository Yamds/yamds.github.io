<template>
  <div class="row">
    <!-- 页面一：材料筛选 -->
    <div class="col-12 col-md-6">
      <MaterialsTypes />
      <MaterialsInput /> 
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
      MaterialsInput,
      MaterialsListShow,
      MaterialsShowCard
    }
  }
</script>

<script lang="ts" setup>
  import MaterialsTypes from './MaterialsTypes.vue'
  import MaterialsInput from './MaterialsInput.vue'
  import MaterialsListShow from './MaterialsListShow.vue'
  import MaterialsShowCard from './MaterialsShowCard.vue';

</script>

<style>

</style>