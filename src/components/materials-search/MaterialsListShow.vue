<template>
    <ul>
        <!-- 判断条件 1. 等阶和种类  2. 属性包含 3. 输入框 -->
        <li class="col-md-4 col-6" v-for="item in useMaterialStore().materialList" @click="useMaterialStore().showItem(item)"
            v-show="
                item.name.includes(useMaterialStore().search_input) && 
                useMaterialStore().selected.level.includes(item.level) && 
                useMaterialStore().selected.type.includes(item.type) && 
                (!useMaterialStore().andor ? item.attribute.some((attr: string) => useMaterialStore().selected.attribute.includes(attr)) : useMaterialStore().selected.attribute.every((attr: string) => item.attribute.includes(attr)))">
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
  import { useMaterialStore } from '../../store/material'
</script>

<style scoped>
@import '../../assets/css/material.css';
@import '../../assets/css/checkbox.css';
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