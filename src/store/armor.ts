import { defineStore } from 'pinia'
import armortype from '../assets/json/armor_type.json'
import { ref, computed, watch } from 'vue'
import { type MaterialsInter, type ArmorInter, type SelectedArmorMaterialInter, type SkillInter, type SimulationListInter } from '../types'
import { material_type, material_attribute, material_skill } from '../assets/json/material_type.json'
import emitter from '../utils/emitter'

export const useArmorStore = defineStore('armor', () => {   
    // 添加过来的所有材料
    // 修改初始化逻辑，确保是数组类型
    let material_list = ref < MaterialsInter[] > (JSON.parse(localStorage.getItem('simulation-material-list') || '[]'))
    // 所有材料中 选中的材料
    let selected_list = ref<MaterialsInter[]>([])
    // 获取装备类型
    let armor_type = ref(armortype)
    // 选中的装备
    let selected_armor = ref({
        armor: armortype.helmet as ArmorInter,
        // 选中的材料
        material: [] as SelectedArmorMaterialInter[]
    } as SimulationListInter)
    // 选中的星级
    let selected_star = ref<number>(5)
    // 添加模式
    let addMode = ref(Boolean(JSON.parse(localStorage.getItem('add-mode') || 'false')))

    // 方案列表
    let simulation_list = ref<SimulationListInter[]>(JSON.parse(localStorage.getItem('simulation-list') || '[]'))

    // *计算 - 剩余槽位计算
    let slot_calc = computed(() => {
        const result: Record<string, number> = {
            silk: 0,
            rope: 0,
            shard: 0,
            relic: 0,
            core: 0
        };

        // 从选中的装备中获取 sum 数组
        const sumArray = selected_armor.value.armor.sum || [];

        // 计算共通的槽位
        sumArray.forEach(group => {
            // 计算该组已使用的槽位总数
            const usedSlots = group.reduce((total, key) => {
                return total + selected_list.value
                    .filter(item => material_type.find(a => a.word === key)?.name === item.type)
                    .reduce((sum, item) => sum + item.slot, 0);
            }, 0);

            // 计算该组的总槽位并平均分配
            const totalSlots = group.reduce((total, key) => {
                return total + (selected_armor.value.armor.material_type[key as 'silk' | 'rope' | 'shard' | 'relic' | 'core'] || 0);
            }, 0);
            const remainingSlots = (totalSlots / group.length - usedSlots);

            group.forEach(key => {
                result[key] = remainingSlots;
            });
        });

        return result;
    })

    // *计算 - 选择的材料，按照星级拿到属性值 累加
    let selected_material_attribute = computed(() => {
        // [{"属性": number}, ...]      此处的[item.name]并非数组索引，而是计算数值
        let attribute_list = material_attribute.map(item => ({
            "name": item.name,
            "value": 0
        }));

        // 摘取所选材料(材料，星级)
        selected_armor.value.material.forEach(({ material, star }) => {
            let star_data = material.star[star - 1];
            // 遍历选中材料的属性值
            Object.entries(star_data).forEach(attr => {
                // 将attr对应的数值添加到attribute_list里去
                // 这里的target是浅拷贝，操作target可以影响attribute_list
                const target = attribute_list.find(item => item.name === attr[0]);
                if (target) {
                    target.value += attr[1];
                }
            });
        });

        return attribute_list.filter(item => item.value != 0);
    });

    let selected_material_skill = computed(() => {
        // [{"技能": "技能描述"}, ...]      此处的[item.name]并非数组索引，而是计算数值
        let skill_list = [] as SkillInter[]
        selected_armor.value.material.forEach(({ material }) => {
            if (material.skill) {
                skill_list.push({
                    "name": material.skill.split("：")[0],
                    "desc": material.skill.split("：")[1]
                })
            }
        })
        // 去重
        return skill_list.filter((obj, index) => skill_list.findIndex(item => item.name === obj.name) === index);
    })

    // 添加一个计算属性，判断是否有满足条件的元素
    const hasValidMaterial = computed(() => {
        return material_list.value.some(item =>
            item.slot <= slot_calc.value[material_type.find(a => a.name === item.type)?.word ?? '']
        );
    });

    // 添加方案
    function addArmorToList() {
        // 判断是否所有槽位都满了
        if(Object.values(slot_calc.value).every(item => item == 0)) {
            emitter.emit('send-tips', {
                title: '提示',
                message: '方案添加成功~',
                type: 'success'
            })
            
            let id = parseInt(localStorage.getItem('simulation-list-id') || '0')
            id++
            localStorage.setItem('simulation-list-id', id.toString())

            simulation_list.value.push({
                id: id,
                name: '方案' + id,
                desc: '方案' + id + ': ' + '描述',
                armor: selected_armor.value.armor,
                material: selected_armor.value.material
            })
            localStorage.setItem('simulation-list', JSON.stringify(simulation_list.value))
            selected_armor.value.material = []
            selected_list.value = []
        } else {
            emitter.emit('send-tips', {
                title: '提示',
                message: '请先将所有槽位填满~',
                type: 'warning'
            })
        }
    }
    function delArmorList() {
        simulation_list.value = []
        localStorage.removeItem('simulation-list')
        
        emitter.emit('send-tips', {
            title: '提示',
            message: '方案列表已清空~',
            type: 'info'
        })
    }

    // 切换 添加材料 模式
    function toggleAddMode() {
        addMode.value = !addMode.value
        localStorage.setItem("add-mode", addMode.value.toString())
        if (addMode.value) {
            emitter.emit('send-tips', {
                title: '添加模式已开启',
                message: '请返回材料图鉴选择材料吧~',
                type: 'info'
            })
        }else {
            emitter.emit('send-tips', {
                title: '添加模式已关闭',
                message: '材料预览面板重新启用~',
                type: 'info'
            })
        }
    }
    // 删除材料列表
    function deleteList() {
        material_list.value = []
        localStorage.removeItem('simulation-material-list')
        emitter.emit('send-tips', {
            title: '提示',
            message: '材料列表已清空~',
            type: 'info'
        })
    }
    // 选材料
    function selectItem(item_input: MaterialsInter) {
        selected_list.value.push(item_input)
        selected_armor.value.material.push({
            material: item_input,
            star: selected_star.value
        })
        localStorage.setItem('simulation-selected-list', JSON.stringify(selected_list.value))
    }

    watch(() => addMode, (value) => {
        if (value) {
            emitter.on("send-clickItem", (value: any) => {
                if (!material_list.value.includes(value)) {
                    material_list.value.push(value)
                }
                // 修改存储逻辑，直接存储数组
                localStorage.setItem('simulation-material-list', JSON.stringify(material_list.value))
            })
        } else {
            emitter.off("send-clickItem")
        }
    }, { immediate: true })


    return {
        material_list,
        selected_list,
        armor_type,
        selected_armor,
        addMode,
        material_attribute,
        material_type,
        material_skill,
        slot_calc,
        selected_material_attribute,
        selected_material_skill,
        hasValidMaterial,
        selected_star,
        simulation_list,
        toggleAddMode,
        deleteList,
        selectItem,
        addArmorToList,
        delArmorList
    }
})
