<template>
    <div class="col-md-4 offset-md-1">
        <h2>新增装备</h2>
        <div>
            <div class="row gx-3 gy-2">
                <div class="col-md-6 col-6">
                    <div class="checkbox" title="请返回材料图鉴点击添加" @click="useArmorStore().toggleAddMode"
                        :class="useArmorStore().addMode ? 'selected' : 'unselected'">
                        <img src="/img/attr/maoxianrenwu1_3.png" alt="">
                        <span>添加材料</span>
                    </div>
                </div>
                <div class="col-md-6 col-6">
                    <div class="checkbox checkbox-click" @click="useArmorStore().deleteList">
                        <img src="/img/attr/maoxianrenwu1_4.png" alt="">
                        <span>清除列表</span>
                    </div>
                </div>
                <div class="col-md-2 col-auto" v-for="index in 5" :key="index">
                    <div class="checkbox" @click="useArmorStore().selected_star = index"
                        :class="useArmorStore().selected_star === index ? 'selected' : 'unselected'">
                        <span>{{ index }}星</span>
                    </div>
                </div>
                <div class="col-md-12" v-for="item in useArmorStore().material_list" :key="item.id"
                    v-show="item.slot <= useArmorStore().slot_calc[useArmorStore().material_type.find(a => a.name === item.type)?.word ?? '']">
                    <div class="materials-list" @click="useArmorStore().selectItem(item)">
                        <span class="checkbox checkbox-click">
                            <div>
                                <img :src="`/img/all/${item.icon}.png`" alt="">
                                <span>{{ item.name }}</span>
                            </div>
                            <div class="list-right">
                                <img
                                    :src="`/img/attr/${useArmorStore().material_type.find(a => a.name === item.type)?.icon || ''}.png`">
                                <span>[{{ " " + item.slot + " " }}]</span>
                                <img v-for="attr in item.attribute"
                                    :src="`/img/attr/${useArmorStore().material_attribute.find(a => a.name === attr)?.icon || ''}.png`">
                            </div>
                        </span>
                    </div>
                </div>
                <div class="col-md-12">
                    <hr>
                    <div class="checkbox checkbox-click"
                        v-show="useArmorStore().material_list == null || useArmorStore().material_list.length == 0">
                        <span>暂无可以选择的材料哦~</span>
                    </div>
                    <div class="checkbox checkbox-click"
                        v-show="useArmorStore().material_list != null && useArmorStore().material_list.length != 0 && !useArmorStore().hasValidMaterial">
                        <span>槽位不足~</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "SimulationAdd"
}
</script>

<script lang="ts" setup>
import { useArmorStore } from '../../store/armor';
</script>

<style scoped>
@import '../../assets/css/simulation.css';
@import '../../assets/css/checkbox.css';
</style>