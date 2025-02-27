<template>
    <div class="row">
        <h2>新增装备</h2>
        <div class="col-md-4">
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
                <div class="deletebox col-md-3" v-for="index in 5" :key="index">
                    <span @click="selected_star = index" :class="selected_star === index ? 'selected' : 'unselected'">
                        {{ index }}星
                    </span>
                </div>
            </div>
            <div class="checkbox materials-list" v-for="item in material_list" :key="item.id" @click="selectItem(item)">
                <span class="unselected" v-if="item.slot <= slot_calc[material_type.find(a => a.name === item.type)?.word]">
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
            <div class="checkbox materials-list" v-show="material_list.length==0">
                <span class="unselected">
                    暂无可以选择的材料哦~
                </span>
            </div>
            <div class="checkbox materials-list" v-show="material_list.length != 0 && !hasValidMaterial">
                <span class="unselected">
                    槽位不足~
                </span>
            </div>
        </div>
        <div class="col-md-8">
            <h4>锻造面板</h4>
            <h5>锻造内容</h5>
            <div class="armor-type-list">
                <div class="armor-checkbox armor-checkbox-delete" @click="selected_list = []; selected_armor.selected_material = []">
                    <img src="/img/attr/maoxianrenwu1_4.png">
                    <span>清除</span>
                </div>
                <div class="armor-checkbox" v-for="item in armor_type" :key="item.id" @click="selected_armor.armor = item" :class="selected_armor.armor.id === item.id ? 'selected' : ''">
                    <img :src="`/img/armor/${item.icon}.png`">
                    <span>{{ item.name }}</span>
                </div>
            </div>
            <div class="row">
                <!-- 槽位展示 -->
                <div class="col-md-6 slot-show">
                    <h5>剩余材料槽位：</h5>
                    <div>
                        <div v-for="(value, key) in slot_calc">
                            <img :src="`/img/attr/${material_type.find(a => a.word === key)?.icon || ''}.png`">
                            <span>{{ "[ " + slot_calc[key] + " ]" }}</span>
                            <span v-for="item in selected_list" :key="item.id" v-show="item.type === material_type.find(a => a.word === key)?.name">
                                <img :src="`/img/all/${item.icon}.png`" v-for="count in item.slot">
                            </span>
                            <hr v-if="selected_armor.armor.sum.some(subArray => subArray[subArray.length - 1] === key)">
                        </div>
                    </div>
                </div>
                <!-- 属性展示 -->
                <div class="col-md-6 attribute-show-card">
                    <div class="row">
                        <div class="col-md-5 attribute-show">
                            <h5 v-if="selected_material_attribute.length != 0">装备属性: <small style="color: var(--ctp-surface2);">(非成品)</small></h5>
                            <div v-for="attr in selected_material_attribute" :key="attr.name" v-show="attr.value != 0">
                                <img :src="`/img/attr/${material_attribute.find(a => a.name == attr.name)?.icon}.png`" alt="">
                                {{ attr.name }} : {{ attr.value }}
                            </div>
                        </div>
                        <div class="col-md-7 skill-show">
                            <h5 v-if="selected_material_skill.length != 0 && selected_armor.armor.name != '精工锭'">技能: </h5>
                            <div v-for="skill in selected_material_skill" v-show="selected_armor.armor.name != '精工锭'">
                                <img :src="`/img/skill/${material_skill.find(a => a.desc == skill.desc)?.icon}.png`" alt="">
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
        name: "SimulationAdd"
    }
</script>

<script lang="ts" setup>
    import emitter from '../../utils/emitter';
    import { ref, watch, computed } from 'vue';
    import { type MaterialsInter, type ArmorInter, type SelectedArmorMaterialInter, type SkillInter } from '../../types';
    import materialTypes from '../../assets/json/material_type.json'
    import armortype from '../../assets/json/armor_type.json'


    // 修改初始化逻辑，确保是数组类型
    // 添加过来的所有材料
    let material_list = ref<MaterialsInter[]>(JSON.parse(localStorage.getItem('simulation-material-list') || '[]'))
    // 所有材料中 选中的材料
    let selected_list = ref<MaterialsInter[]>([])
    // 选中的星级
    let selected_star = ref<number>(5)

    let addMode = ref(Boolean(JSON.parse(localStorage.getItem('add-mode') || 'false')))
    let { material_attribute, material_type, material_skill } = materialTypes

    // 获取装备类型
    let armor_type = ref(armortype)

    // 选中的装备
    let selected_armor = ref({
        armor: armortype.helmet as ArmorInter,
        // 选中的材料
        selected_material: [] as SelectedArmorMaterialInter[]
    })

    // 检查 material_list 是否有数据
    console.log('material_list:', material_list.value);

    // 监听 选中的装备 变化
    watch(() => selected_armor.value.armor, () => {
        selected_armor.value.selected_material = [] as SelectedArmorMaterialInter[]
        selected_list.value = []
    }, {deep: true, immediate: true})

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
        selected_armor.value.selected_material.forEach(({ material, star }) => {
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
        selected_armor.value.selected_material.forEach(({ material }) => {
            if(material.skill) {
                skill_list.push({
                "name": material.skill.split("：")[0],
                "desc": material.skill.split("：")[1]
            })
            }
            
        })
        // 去重
        return skill_list.filter((obj, index) => skill_list.findIndex(item => item.name === obj.name) === index);
    })

    // 切换 添加材料 模式
    function toggleAddMode() {
        addMode.value = !addMode.value
        localStorage.setItem("add-mode", addMode.value.toString())
    }
    // 删除材料列表
    function deleteList() {
        material_list.value = []
        localStorage.removeItem('simulation-material-list')
    }
    // 选材料
    function selectItem(item_input: MaterialsInter) {
        selected_list.value.push(item_input)
        selected_armor.value.selected_material.push({
            material: item_input,
            star: selected_star.value
        })
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

    // 添加一个计算属性，判断是否有满足条件的元素
    const hasValidMaterial = computed(() => {
        return material_list.value.some(item => 
            item.slot <= slot_calc.value[material_type.find(a => a.name === item.type)?.word]
        );
    });
</script>

<style scoped>
    li {
        list-style: none;
    }
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
    .deletebox>span {
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
    .armor-checkbox,
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
        margin-right: 10px;
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
    .armor-checkbox-delete:active {
        background-color: var(--ctp-surface1);
        border: 1px solid var(--ctp-custom);
        transition: all 0.2s ease;
    }
    .attribute-show-card .attribute-show,
    .attribute-show-card .skill-show {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .slot-show img,
    .attribute-show img {
        width: 1.6em;
    }
</style>