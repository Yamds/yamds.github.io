<template>
    <div class="row">
        <h2>新增装备</h2>
        <div class="col-md-3">
            <h4>材料列表</h4>
            <div class="row">
                <div class="checkbox col-md-6" title="请返回材料图鉴点击添加">
                    <span @click="toggleAddMode" :class="addMode?'selected':'unselected'">
                        <img src="/img/attr/maoxianrenwu1_3.png" alt="">添加材料
                    </span>
                </div>
                <div class="deletebox col-md-6">
                    <span @click="deleteList" class="unselected">
                        <img src="/img/attr/maoxianrenwu1_4.png" alt="">清除列表
                    </span>
                </div>
            </div>
            <div class="checkbox materials-list" v-for="item in material_list" :key="item.id" @click="selectItem(item)">
                <span :class="selected_list.includes(item)?'selected':'unselected'">
                    <div>
                        <img :src="`/img/all/${item.icon}.png`" alt="">
                        <span>{{ item.name }}</span>
                    </div>
                    <div class="list-right">
                        <img :src="`/img/attr/${material_type.find(a => a.name === item.type)?.icon || ''}.png`">
                        <span>[{{" " + item.slot + " " }}]</span>
                        <img v-for="attr in item.attribute" :src="`/img/attr/${material_attribute.find(a => a.name === attr)?.icon || ''}.png`">
                        
                    </div>
                </span>
            </div>
        </div>
        <div class="col-md-9">
            <h4>锻造面板</h4>
            <h5>锻造内容</h5>
            <div>
                <div class="armor-checkbox">
                    <img src="">
                    <span></span>
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
    import { ref, watch } from 'vue';
    import { type MaterialsInter } from '@/types';
    import materialTypes from '../../assets/json/material_type.json'
    import armortype from '../../assets/json/armor_type.json'

    // 修改初始化逻辑，确保是数组类型
    let material_list = ref<MaterialsInter[]>(JSON.parse(localStorage.getItem('simulation-material-list') || '[]'))
    let selected_list = ref<MaterialsInter[]>([])

    let addMode = ref(Boolean(JSON.parse(localStorage.getItem('add-mode') || 'false')))
    let { material_attribute, material_type } = materialTypes

    function toggleAddMode() {
        addMode.value = !addMode.value
        localStorage.setItem("add-mode", addMode.value.toString())
    }
    function deleteList() {
        material_list.value = []
        localStorage.removeItem('simulation-material-list')
    }
    function selectItem(item_input: MaterialsInter) {
        if(selected_list.value.includes(item_input)) {
            selected_list.value = selected_list.value.filter((item)=> item != item_input)
        }else {
            selected_list.value.push(item_input)
        }
        localStorage.setItem('simulation-selected-list', JSON.stringify(selected_list.value))
    }

    watch(addMode, (value) => {
        if(value) {
            emitter.on("send-clickItem", (value: any) => {
                if(!material_list.value.includes(value)) {
                    material_list.value.push(value)
                }
                // 修改存储逻辑，直接存储数组
                localStorage.setItem('simulation-material-list', JSON.stringify(material_list.value))
            })
        }else {
            emitter.off("send-clickItem")
        }
    }, {immediate: true})
</script>

<style scoped>
    h2 {
        margin-bottom: 10px;
    }
    img {
        width: 1.4em;
    }
    /* .checkbox:nth-child(2),
    .deletebox {
        display: inline !important;
    } */
    .checkbox:nth-child(1)>span,
    .deletebox >span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        cursor: pointer;
        border: 1px solid var(--ctp-custom);
        padding: 4px;
        border-radius: 4px;
        font-size: 14px;
        margin-bottom: 5px;
        user-select: none;
        width: 100%;
    }
    .checkbox:not(:nth-child(1))>span {
        display: inline-flex;
        gap: 4px;
        margin-right: 0;
        cursor: pointer;
        border: 1px solid var(--ctp-custom);
        padding: 4px;
        border-radius: 4px;
        font-size: 14px;
        margin-bottom: 5px;
        user-select: none;
    }
    .materials-list>span {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .list-right {
        display: flex;
        flex-direction: row-reverse;
        gap: 4px;
        /* flex-shrink: 0; */
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
    .unselected:active {
        background-color: var(--ctp-surface1);
        border: 1px solid var(--ctp-custom);
        transition: all 0.2s ease;
    }
</style>