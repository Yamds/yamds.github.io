<template>
    <div>
        <h2>装备方案列表</h2>
        <div class="row gx-2 gy-2">
            <div class="col-md-12 checkbox checkbox-left checkbox-click" @click="useArmorStore().addArmorToList()">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">
                <span>将面板装备添加至方案</span>
            </div>
            <div class="col-md-12 checkbox checkbox-left checkbox-click">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">
                <span>从剪切板导入方案</span>
            </div>
            <div class="col-md-12 checkbox checkbox-left checkbox-click">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">
                <span>将面板方案复制至剪切板</span>
            </div>
            <div class="col-md-12 checkbox checkbox-left checkbox-click" @click="useArmorStore().delArmorList()">
                <img src="/img/attr/maoxianrenwu1_4.png" alt="">
                <span>删除所有方案</span>
            </div>
            <hr>
            <div class="col-md-12 checkbox checkbox-left" v-for="(item, index) in useArmorStore().simulation_list" :key="item.id"
                @click="showArmor(item, index)">
                <!-- 装备图标 -->
                <div class="armor-list-left">
                    <img :src="`/img/armor/${item.armor.icon}.png`" alt="">
                    <span>{{ item.name }}</span>
                </div>

            </div>
        </div>
    </div>


</template>

<script lang="ts">
    export default {
        name: "SimulationList"
    }
</script>

<script lang="ts" setup>
    import { useArmorStore } from '../../store/armor';
    import { ref } from 'vue';
    import { type MaterialsInter, type SelectedArmorMaterialInter } from '../../types';
    let select_index = ref<number>(0)

    function showArmor(item: any, index: number) {
        Object.assign(useArmorStore().selected_armor, {
            id: item.id,
            name: item.name,
            desc: item.desc,
            armor: item.armor,
            material: item.material.map((m: any) => ({ material: m.material, star: m.star })) as SelectedArmorMaterialInter[]
        })
        useArmorStore().selected_list = item.material.map((m: any) => m.material) as MaterialsInter[]
        select_index.value = index
    }

</script>

<style scoped>
@import '../../assets/css/simulation.css';
@import '../../assets/css/checkbox.css';

</style>