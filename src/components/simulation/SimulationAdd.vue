<template>
    <div class="row">
        <h2>新增装备</h2>
        <div>
            <div class="checkbox">
                <span @click="toggleAddMode" :class="addMode?'selected':'unselected'">
                    <img src="/img/attr/maoxianrenwu1_3.png" alt="">添加(请返回材料图鉴点击材料)
                </span>
            </div>
            <div class="col-md-4">
                <div v-for="item in material_list" :key="item.id">
                    <img :src="`/img/all/${item.icon}.png`" alt="">
                    <span>{{ item.name }}</span>
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
    import emitter from '../../utils/emitter';
    import { ref, reactive, watch } from 'vue';
    import { type MaterialsInter } from '@/types'; '../../types'

    // let material_list = ref<MaterialsInter[]>([]);

    let material_list = ref<MaterialsInter[]>(JSON.parse(localStorage.getItem('simulation-material-list') || 'null') || {})

    let addMode = ref(Boolean(JSON.parse(localStorage.getItem('add-mode') || 'false')))

    function toggleAddMode() {
        addMode.value = !addMode.value
        localStorage.setItem("add-mode", addMode.value.toString())
    }

    watch(addMode, (value) => {
        if(value) {
            emitter.on("send-clickItem", (value:any) => {
                console.log(111)
                material_list.value.push(value)
                localStorage.setItem('simulation-material-list', JSON.stringify(material_list))
            })
        }else {
            emitter.off("send-clickItem")
        }
    }, {immediate: true})
</script>

<style>
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