<template>
  <h2>材料筛选</h2>
  <div class="checkbox">
    <h4>等阶</h4>
    <span @click="selectAll('level')" :class="selected_all[0]?'selected':'unselected'">
        <img src="/img/attr/maoxianrenwu1_3.png" alt="">全选
    </span>
    <span v-for="level in material_level" :key="level.id" @click="selectSingle('level', level.name)" :class="selected.level.includes(level.name)?'selected':'unselected'">
      <img :src="`/img/attr/${level.icon}.png`">
      <span>{{ level.name }}</span>
    </span>
  </div>
  <div class="checkbox">
    <h4>类型</h4>
    <span @click="selectAll('type')" :class="selected_all[1]?'selected':'unselected'">
        <img src="/img/attr/maoxianrenwu1_3.png" alt="">全选
    </span>
    <span v-for="type in material_type" :key="type.id" @click="selectSingle('type', type.name)" :class="selected.type.includes(type.name)?'selected':'unselected'">
      <img :src="`/img/attr/${type.icon}.png`">
      <span>{{ type.name }}</span>
    </span>
  </div>
  <div class="checkbox">
    <h4>属性</h4>
    <span @click="selectAll('attribute')" :class="selected_all[2]?'selected':'unselected'">
        <img src="/img/attr/maoxianrenwu1_3.png" alt="">全选
    </span>
    <span @click="andor = !andor" :class="andor?'selected':'unselected'">
        <img src="/img/attr/maoxianrenwu1_3.png" alt="">包含
    </span>
    <span v-for="attribute in material_attribute" :key="attribute.id" @click="selectSingle('attribute', attribute.name)" :class="selected.attribute.includes(attribute.name)?'selected':'unselected'">
      <img :src="`/img/attr/${attribute.icon}.png`">
      <span>{{ attribute.name }}</span>
    </span>
  </div>

</template>

<script lang="ts">
  export default {
    name: "MaterialsTypes",
    
  }
</script>

<script lang="ts" setup>
  import { ref, computed, watch, onMounted } from "vue"
  import material from "../../assets/json/material_type.json"
  import emitter from "../../utils/emitter";
  import { type MaterialsTypesInter } from '../../types'

  // 属性
  let {material_level, material_type, material_attribute} = material
  
  // 从localStorage读取数据，如果没有则使用默认值
  let selected = ref<MaterialsTypesInter>(JSON.parse(localStorage.getItem('materials-selected') || 'null') || {
    level: material_level.map(item => item.name),
    type: material_type.map(item => item.name),
    attribute: material_attribute.map(item => item.name)
  })
  
  let andor = ref(JSON.parse(localStorage.getItem('materials-andor') || 'false'))

  // 计算属性
  let selected_all = computed(() => {
    return [
      selected.value.level.length === material_level.length,
      selected.value.type.length === material_type.length,
      selected.value.attribute.length === material_attribute.length
    ];
  })

  

  // 方法
  function selectAll(type: string) {
    if (type == "level") {
      if(selected.value.level.length > 0) {
        selected.value.level = []
      }else {
        selected.value.level = material_level.map(item => item.name)
      }
    }else if(type == "type") {
      if(selected.value.type.length > 0) {
        selected.value.type = []
      }else {
        selected.value.type = material_type.map(item => item.name)
      }
    }else if(type == "attribute") {
      if(selected.value.attribute.length > 0) {
        selected.value.attribute = []
      }else {
        selected.value.attribute = material_attribute.map(item => item.name)
      }
    }
  }

  function selectSingle(type: string, name: string) {
    if (type == "level") {
      if(selected.value.level.includes(name)) {
        selected.value.level = selected.value.level.filter(item => item!=name)
      }else {
        selected.value.level.push(name)
      }
    }else if(type == "type") {
      if(selected.value.type.includes(name)) {
        selected.value.type = selected.value.type.filter(item => item!=name)
      }else {
        selected.value.type.push(name)
      }
    }else if(type == "attribute") {
      if(selected.value.attribute.includes(name)) {
        selected.value.attribute = selected.value.attribute.filter(item => item!=name)
      }else {
        selected.value.attribute.push(name)
      }
    }
  }

  // 监视对象变化，给MaterialsListShow传值
  onMounted(() => {
    emitter.emit("send-selected", selected.value)
    emitter.emit("send-andor", andor.value)
  })

  // 监听selected和andor的变化，并保存到localStorage
  watch(selected.value, (newValue) => {
    localStorage.setItem('materials-selected', JSON.stringify(newValue))
    emitter.emit("send-selected", newValue)
  }, {deep: true, immediate: true})
  
  watch(andor, (newValue) => {
    localStorage.setItem('materials-andor', JSON.stringify(newValue))
    emitter.emit("send-andor", newValue)
  }, {deep: true, immediate: true})
</script>

<style scoped>
  h4  {
        padding: 10px 0 0 0;
    }
  img {
    width: 1.4em;
  }
  .checkbox>span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    margin-right: 20px;
    cursor: pointer;
    border: 1px solid var(--ctp-custom);
    padding: 4px;
    border-radius: 4px;
    font-size: 14px;
    margin-bottom: 5px;
    user-select: none;  /* 无法选中 */
  }

  .selected {
    background-color: var(--ctp-surface1);
    border: 1px solid var(--ctp-custom);
    transition: all 0.3s ease;
  }

  .unselected {
      background-color: var(--ctp-mantle);
      border: 1px solid var(--ctp-custom);
      transition: all 0.3s ease;
  }
</style>