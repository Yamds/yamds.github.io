import { defineStore } from 'pinia'
import { type MaterialsInter } from '../types'
import { ref, watch, computed } from 'vue';
import emitter from '../utils/emitter'
import materials from "../assets/json/materials.json"
import { type MaterialsTypesInter } from '../types'
import material from "../assets/json/material_type.json"

export const useMaterialStore = defineStore('material', () => {
    // 属性
    let { material_level, material_type, material_attribute } = material
    let showCardPos = 1;
    let showCardValueType = ref([1, 1]);
    let showItemCard = ref<{ item1: MaterialsInter, item2: MaterialsInter }>(JSON.parse(localStorage.getItem('showItemCard') || '{"item1": {}, "item2": {}}'))
    let version = ref({ item1: 1, item2: 1 })

    // 属性
    let materialList = materials
    let search_input = ref('')
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

    let materials_input = ref("")

    // 方法
    function selectAll(type: string) {
        if (type == "level") {
            if (selected.value.level.length > 0) {
                selected.value.level = []
            } else {
                selected.value.level = material_level.map(item => item.name)
            }
        } else if (type == "type") {
            if (selected.value.type.length > 0) {
                selected.value.type = []
            } else {
                selected.value.type = material_type.map(item => item.name)
            }
        } else if (type == "attribute") {
            if (selected.value.attribute.length > 0) {
                selected.value.attribute = []
            } else {
                selected.value.attribute = material_attribute.map(item => item.name)
            }
        }
    }

    function selectSingle(type: string, name: string) {
        if (type == "level") {
            if (selected.value.level.includes(name)) {
                selected.value.level = selected.value.level.filter(item => item != name)
            } else {
                selected.value.level.push(name)
            }
        } else if (type == "type") {
            if (selected.value.type.includes(name)) {
                selected.value.type = selected.value.type.filter(item => item != name)
            } else {
                selected.value.type.push(name)
            }
        } else if (type == "attribute") {
            if (selected.value.attribute.includes(name)) {
                selected.value.attribute = selected.value.attribute.filter(item => item != name)
            } else {
                selected.value.attribute.push(name)
            }
        }
    }

    // showItem，传值给材料展示卡片
    function showItem(item: any) {
        let addMode = localStorage.getItem("add-mode")
        if (addMode == "true") {
            emitter.emit("send-clickItem", item)
            emitter.emit("send-tips", {
                title: '提示',
                message: '材料已添加至锻造面板~',
                type: 'info'
            })
        }else {
            if (showCardPos == 1) {
                version.value.item1++
                showItemCard.value.item1 = item

            }
            else {
                version.value.item2++
                showItemCard.value.item2 = item

            }
            showCardPos *= -1
        }
    }

    // 方法
    function getValueType(index: any) {
        if (index == "item1") {
            return showCardValueType.value[0];
        } else if (index == "item2") {
            return showCardValueType.value[1];
        }
    }
    // 设置完整数值或平均数值
    function setValueType(index: any, value: number) {
        if (index == "item1") {
            showCardValueType.value[0] = value;
        } else if (index == "item2") {
            showCardValueType.value[1] = value;
        }
    }

    // 监听showItemCard的变化并保存到localStorage
    watch(showItemCard, (newValue) => {
        localStorage.setItem('showItemCard', JSON.stringify(newValue))
    }, { deep: true, immediate: true })

    // 监视对象变化，给MaterialsListShow传值
    watch(materials_input, (newValue) => {
        emitter.emit("send-materials_input", newValue)
    })

    // 监听selected和andor的变化，并保存到localStorage
    watch(selected.value, (newValue) => {
        localStorage.setItem('materials-selected', JSON.stringify(newValue))
        emitter.emit("send-selected", newValue)
    }, { deep: true, immediate: true })

    watch(andor, (newValue) => {
        localStorage.setItem('materials-andor', JSON.stringify(newValue))
        emitter.emit("send-andor", newValue)
    }, { deep: true, immediate: true })


    return {
        showItemCard,
        version,
        material_attribute,
        material_level,
        material_type,
        selected,
        andor,
        search_input,
        materialList,
        selected_all,
        materials_input,
        getValueType,
        setValueType,
        showItem,
        selectAll,
        selectSingle,
        
    }
})
