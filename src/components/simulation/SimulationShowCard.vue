<template>
    <div class="col-md-6 offset-md-1">
        <h2>锻造面板</h2>
        <div class="row gx-2 gy-2">
            <div class="col-md-auto col-auto">
                <div class="checkbox checkbox-click" @click="useArmorStore().selected_list = []; useArmorStore().selected_armor.material = []">
                    <img src="/img/attr/maoxianrenwu1_4.png">
                    <span>清除</span>
                </div>
            </div>
            <div class="col-md-auto col-auto" v-for="item in useArmorStore().armor_type">
                <div class="checkbox" @click="clickArmorType(item)" :class="useArmorStore().selected_armor.armor.id === item.id ? 'selected' : ''">
                    <img :src="`/img/armor/${item.icon}.png`">
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <div class="row gx-4 gy-2">
                <!-- 槽位展示 -->
                <div class="col-md-12 slot-show" v-for="(value, key, index) in useArmorStore().slot_calc">
                    <div :class="[
                        useArmorStore().selected_armor.armor.sum.some(subArray => subArray[subArray.length - 1] === key)? 'slot-group-border-bottom' : '',
                        index == 0 ? 'slot-group-border-top' : ''
                    ]">
                        <img :src="`/img/attr/${useArmorStore().material_type.find(a => a.word === key)?.icon || ''}.png`">
                        <span>{{ "[ " + useArmorStore().slot_calc[key] + " ]" }}</span>
                        <span v-for="item in useArmorStore().selected_list" v-show="item.type === useArmorStore().material_type.find(a => a.word === key)?.name">
                            <img :src="`/img/all/${item.icon}.png`" v-for="count in item.slot">
                        </span>
                    </div>
                </div>
                <!-- 属性展示 -->
                <div class="col-md-12 attribute-show-card">
                    <div class="row">
                        <div class="col-md-4 col-4 attribute-show">
                            <h5 v-if="useArmorStore().selected_material_attribute.length != 0">装备属性: <small style="color: var(--ctp-surface2);">(非成品)</small></h5>
                            <div v-for="attr in useArmorStore().selected_material_attribute" v-show="attr.value != 0">
                                <img :src="`/img/attr/${useArmorStore().material_attribute.find(a => a.name == attr.name)?.icon}.png`" alt="">
                                {{ attr.name }} : {{ attr.value }}
                            </div>
                        </div>
                        <div class="col-md-8 col-8 skill-show">
                            <h5 v-if="useArmorStore().selected_material_skill.length != 0 && useArmorStore().selected_armor.armor.name != '精工锭'">技能: </h5>
                            <div v-for="skill in useArmorStore().selected_material_skill" v-show="useArmorStore().selected_armor.armor.name != '精工锭'">
                                <img :src="`/img/skill/${useArmorStore().material_skill.find(a => a.desc == skill.desc)?.icon}.png`" alt="">
                                {{ skill.name }} : {{ skill.desc }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "SimulationShowCard"
    }
</script>

<script lang="ts" setup>
    import { useArmorStore } from '../../store/armor';
    
    function clickArmorType(item: any) {
        useArmorStore().selected_armor.armor = item
        useArmorStore().selected_list = []
        useArmorStore().selected_armor.material = []
    }
</script>

<style scoped>
@import '../../assets/css/simulation.css';
@import '../../assets/css/checkbox.css';
</style>