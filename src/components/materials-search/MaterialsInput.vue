<template>
    <div class="materials-input">
        <h4>材料名称</h4>
        <input type="text" placeholder="请输入材料名称" v-model="materials_input">
    </div>
  
</template>

<script lang="ts">
  export default {
    name: 'MaterialsInput'
  }
</script>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import emitter from '@/utils/emitter';

  let materials_input = ref("")

  // 监视对象变化，给MaterialsListShow传值
  watch(materials_input, (newValue) => {
    emitter.emit("send-materials_input", newValue)
  })
</script>

<style scoped>
    h4  {
        padding: 12px 0 0 0;
    }
    .materials-input {
        margin-bottom: 10px;
    }
    .materials-input input {
        width: 100%;
        padding: 5px 10px;
        border: 1px solid var(--ctp-custom);
        border-radius: 5px;
        background-color: var(--ctp-base);
        font-size: 14px;
    }
    .materials-input input:focus {
        outline: none;
        box-shadow: 0 0 5px 0 var(--ctp-custom), inset 0 0 1px 0 var(--ctp-custom);
    }
</style>
