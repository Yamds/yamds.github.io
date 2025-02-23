<template>
    <!-- 导航栏 -->
    <div class="navbar col-md-12">
        <ul>
            <li @click="active_web=1" :class="{active:active_web==1}">
                查询材料
            </li>
            <li @click="active_web=2" :class="{active:active_web==2}">
                设置
            </li>
            <li @click="active_web=3" :class="{active:active_web==3}">
                说明
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
  import { ref, watch } from "vue";
  import emitter from "../utils/emitter";
  let active_web = ref(1)
  
  // 向app传递选择的web
  watch(active_web, (value) => {
    emitter.emit("send-active_web", value)
  })
</script>

<style scoped>
  .navbar ul{
    border-bottom: 1px solid var(--ctp-custom);
    width: 100%;
    padding: 0;
  }
  .navbar li{
    list-style: none;
    display: inline-block;
    padding: 0.7em 0.7em 0.3em 0.7em;
    border-radius: 5px 5px 0 0;
    font-size: 1.3em;
    text-align: center;
    line-height: 1.4;
    cursor: pointer;
  }
  .navbar li:not(.active):hover {
    background-color: var(--ctp-surface0);
    border: 1px solid var(--ctp-custom);
    border-bottom: none;
    margin: 0 -1px;
    transition: background-color 0.3s ease;
  }
  .active{
      border: 1px solid var(--ctp-custom);
      border-bottom: none;
      box-shadow: 0 2px 0 0 var(--ctp-base);
      margin: 0 -1px;
  }
</style>
