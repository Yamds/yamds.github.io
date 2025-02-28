<template>
    <h2>材料筛选</h2>
    <div class="row gx-2 gy-2">
        <h4>等阶</h4>
        <div class="col-md-auto">
            <span @click="useMaterialStore().selectAll('level')"
                :class="['checkbox', useMaterialStore().selected_all[0] ? 'selected' : 'unselected']">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">全选
            </span>
        </div>
        <div class="col-md-auto" v-for="level in useMaterialStore().material_level" :key="level.id">
            <span @click="useMaterialStore().selectSingle('level', level.name)"
                :class="['checkbox', useMaterialStore().selected.level.includes(level.name) ? 'selected' : 'unselected']">
                <img :src="`/img/attr/${level.icon}.png`">
                <span>{{ level.name }}</span>
            </span>
        </div>
    </div>
    <div class="row gx-2 gy-2">
        <h4>类型</h4>
        <div class="col-md-auto">
            <span @click="useMaterialStore().selectAll('type')"
                :class="['checkbox', useMaterialStore().selected_all[1] ? 'selected' : 'unselected']">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">全选
            </span>
        </div>
        <div class="col-md-auto" v-for="type in useMaterialStore().material_type" :key="type.id">
            <span @click="useMaterialStore().selectSingle('type', type.name)"
                :class="['checkbox', useMaterialStore().selected.type.includes(type.name) ? 'selected' : 'unselected']">
                <img :src="`/img/attr/${type.icon}.png`">
                <span>{{ type.name }}</span>
            </span>
        </div>
    </div>
    <div class="row gx-2 gy-2">
        <h4>属性</h4>
        <div class="col-md-auto">
            <span @click="useMaterialStore().selectAll('attribute')"
                :class="['checkbox', useMaterialStore().selected_all[2] ? 'selected' : 'unselected']">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">全选
            </span>
        </div>
        <div class="col-md-auto">
            <span @click="useMaterialStore().andor = !useMaterialStore().andor"
                :class="['checkbox', useMaterialStore().andor ? 'selected' : 'unselected']">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">包含
            </span>
        </div>
        <div class="col-md-auto" v-for="attribute in useMaterialStore().material_attribute"
            :key="attribute.id">
            <span @click="useMaterialStore().selectSingle('attribute', attribute.name)"
                :class="['checkbox', useMaterialStore().selected.attribute.includes(attribute.name) ? 'selected' : 'unselected']">
                <img :src="`/img/attr/${attribute.icon}.png`">
                <span>{{ attribute.name }}</span>
            </span>
        </div>
    </div>
    <div class="materials-input">
        <h4>材料名称</h4>
        <input type="text" placeholder="请输入材料名称" v-model="useMaterialStore().materials_input">
    </div>
</template>

<script lang="ts">
export default {
    name: "MaterialsTypes",

}
</script>

<script lang="ts" setup>
import { useMaterialStore } from '../../store/material'
</script>

<style scoped>
@import '../../assets/css/material.css';
@import '../../assets/css/checkbox.css';

img {
    width: 1.4em;
}
</style>