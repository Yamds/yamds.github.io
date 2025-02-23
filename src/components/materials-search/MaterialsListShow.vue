<template>
    <ul>
        <!-- 判断条件 1. 等阶和种类  2. 属性包含 3. 输入框 -->
        <li class="col-md-4 col-6" v-for="item in materialList" @click="showItem(item)"
            v-show="
                item.name.includes(search_input) && 
                selected.level.includes(item.level) && 
                selected.type.includes(item.type) && 
                (!andor ? item.attribute.some((attr: string) => selected.attribute.includes(attr)) : selected.attribute.every((attr: string) => item.attribute.includes(attr)))">
            <img :src="`/img/all/${item.icon}.png`">
            <span>{{item.name}}</span>
        </li>
    </ul>
</template>

<script lang="ts">
  export default {
    name: "MaterialsListShow"
  }
</script>

<script lang="ts" setup>
  import { ref } from 'vue'
  import materials from "../../assets/json/materials.json"
  import emitter from "../../utils/emitter";
  import { type MaterialsTypesInter } from '../../types'

  // 属性
  let materialList = materials
  let search_input = ref('')
  let selected = ref<MaterialsTypesInter>({
    level: [],
    type: [],
    attribute: []
  })
  let andor = ref('')

  // 绑定emit事件，从MaterialsInput和MaterialsType两个组件传值进来
  emitter.on("send-selected", (value:any) => {
    selected.value = value
  })
  emitter.on("send-andor", (value:any) => {
    andor.value = value
  })
  emitter.on("send-materials_input", (value:any) => {
    search_input.value = value
  })
  
  // showItem，传值给材料展示卡片
  function showItem(item: any) {
    emitter.emit("send-clickItem", item)
  }
</script>

<style scoped>
  ul {
    width: 100%;
  }
  li {
    display: inline-block;
    user-select: none;  /* 无法选中 */
    cursor: pointer;
  }
  li:hover >span {
    color: var(--ctp-custom) !important;
  }
  li img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    vertical-align: middle;
  }
  li span {
    vertical-align: middle;
  }
</style>