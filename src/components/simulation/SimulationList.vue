<template>
    <div>
        <h2>装备方案列表</h2>
        <div class="row gx-2 gy-2">
            <div class="col-md-12 checkbox checkbox-left checkbox-click" @click="useArmorStore().addArmorToList()">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">
                <span>将面板装备添加至方案</span>
            </div>
            <div class="col-md-12 checkbox checkbox-left checkbox-click" data-clipboard-target="#simulation-data">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">
                <span>将面板方案复制至剪切板</span>
            </div>
            <div class="col-md-12 checkbox checkbox-left checkbox-click copy-input">
                <img src="/img/attr/maoxianrenwu1_3.png" alt="">
                <input type="text" v-model="importData" @keydown.enter="addImportData" placeholder="请输入复制的方案(回车)">
            </div>
            <div class="col-md-12 checkbox checkbox-left checkbox-click" @click="useArmorStore().delArmorList()">
                <img src="/img/attr/maoxianrenwu1_4.png" alt="">
                <span>删除所有方案</span>
            </div>
            <hr>
            <div :class="[useArmorStore().select_index == index ? 'selected' : 'unselected', 'col-md-12 checkbox checkbox-left']"
                v-for="(item, index) in useArmorStore().simulation_list" :key="item.id" @click="showArmor(item, index)">
                <!-- 装备图标 -->
                <div class="armor-list-left">
                    <!-- <span>{{ index + 1 }}</span> -->
                    <img :src="`/img/armor/${item.armor.icon}.png`" alt="">

                    <span v-show="!changeMode || useArmorStore().select_index != index"
                        @click="changeModeClick(index)">{{ item.name
                        }}</span>
                    <input type="text" v-model="input_name" v-if="changeMode && useArmorStore().select_index == index"
                        @click.stop @focus="changeNameStart(item.name)" @blur="changeNameEnd(item)"
                        @keydown.enter="changeNameEnd(item)">
                </div>
                <div class="armor-list-right" @click="useArmorStore().deleteArmor(item.id)">
                    <span>x</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 复制数据用的隐藏输入框 -->
    <textarea id="simulation-data" style="position: absolute; left: -9999px;">{{ copyData }}</textarea>
</template>

<script lang="ts">
export default {
    name: "SimulationList"
}
</script>

<script lang="ts" setup>
import { useArmorStore } from '../../store/armor';
import { ref, watch, computed, onMounted } from 'vue';
import { type MaterialsInter, type SelectedArmorMaterialInter } from '../../types';
import ClipboardJS from 'clipboard';
import armor_type from '../../assets/json/armor_type.json';
import materials from '../../assets/json/materials.json';
import emitter from '../../utils/emitter';


let changeMode = ref<boolean>(false)
let importData = ref<string>("")
let input_name = ref<string>("")


function changeNameStart(name: string) {
    input_name.value = name
}

function changeNameEnd(item: any) {
    changeMode.value = false
    item.name = input_name.value
    input_name.value = ""
}

// 导入内容
function addImportData() {
    // 方案60 项链 荆棘逆鳞5x*1 魔法树皮5x*3 哥布林法师兽核5x*1 臭臭菇孢子5x*2
    if (importData.value != "") {
        // [荆棘逆鳞5x*1, 魔法树皮5x*3, 哥布林法师兽核5x*1, 臭臭菇孢子5x*2]
        // console.log(importData.value.split(" ").splice(0, 2))
        const material = importData.value.split(" ").splice(2).map((m: string) => {
            // 分割出材料名称和数量 [魔法树皮5x, 3]
            const [materialWithStar, count] = m.split("*");
            // console.log(materialWithStar, count)
            // 提取star和material名称
            const star = parseInt(materialWithStar.slice(-2, -1)); // 提取倒数第二个字符作为star
            const materialName = materialWithStar.slice(0, -2); // 去掉最后两个字符得到material名称

            // 从materials.json中获取材料对象
            const materialObj = materials.find((item: any) => item.name === materialName);

            if (!materialObj) {
                console.error("材料不存在", materialName)
            }

            // 返回包含star和material对象的数组
            return Array(parseInt(count)).fill({ material: materialObj, star: star });
        }).flat();
        let data = {
            // 方案60 项链 荆棘逆鳞5x*1 魔法树皮5x*3 哥布林法师兽核5x*1 臭臭菇孢子5x*2
            name: importData.value.split(" ")[0],
            desc: "导入的数据",
            armor: Object.values(armor_type).find((item: any) => item.name == importData.value.split(" ")[1]),
            // [荆棘逆鳞5x*1, 魔法树皮5x*3, 哥布林法师兽核5x*1, 臭臭菇孢子5x*2]
            material: material
        }
        // console.log(data)

        Object.assign(useArmorStore().selected_armor, {
            name: data.name,
            desc: data.desc,
            armor: data.armor,
            material: data.material.map((m: any) => ({ material: m.material, star: m.star })) as SelectedArmorMaterialInter[]
        })

        useArmorStore().selected_list = data.material.map((m: any) => m.material) as MaterialsInter[]
        useArmorStore().addArmorToList()
        useArmorStore().select_index = -1
        importData.value = ""
    }
}


// 要复制的内容
const copyData = computed(() => {
    if (useArmorStore().simulation_list[useArmorStore().select_index] != null) {
        let materialString = useArmorStore().simulation_list[useArmorStore().select_index].material
            .map((m: any) => m.material.name + m.star + "x")
            .reduce((acc: { [key: string]: number }, curr: string) => {
                acc[curr] = (acc[curr] || 0) + 1;
                return acc;
            }, {});
        return (useArmorStore().simulation_list[useArmorStore().select_index].name + " " +
            useArmorStore().simulation_list[useArmorStore().select_index].armor.name + " " +
            Object.entries(materialString).map(([key, value]) => `${key}*${value}`).join(" "));
    }
});



function changeModeClick(index: number) {
    if (useArmorStore().select_index == index) {
        changeMode.value = true
    } else {
        changeMode.value = false
    }
}

function showArmor(item: any, index: number) {
    if (useArmorStore().select_index != index) {
        Object.assign(useArmorStore().selected_armor, {
            id: item.id,
            name: item.name,
            desc: item.desc,
            armor: item.armor,
            material: item.material.map((m: any) => ({ material: m.material, star: m.star })) as SelectedArmorMaterialInter[]
        })
        useArmorStore().selected_list = item.material.map((m: any) => m.material) as MaterialsInter[]
    }
    if (useArmorStore().select_index != index) {
        changeMode.value = false
    }
    useArmorStore().select_index = index
}

watch(useArmorStore().simulation_list, (newVal: any) => {
    localStorage.setItem('simulation-list', JSON.stringify(newVal))
})

onMounted(() => {
    const clipboard = new ClipboardJS('.checkbox-click[data-clipboard-target]');

    clipboard.on('success', (e) => {
        emitter.emit('send-tips', {
            title: '提示',
            message: '方案已成功复制到剪贴板',
            type: 'success'
        })
        e.clearSelection();
    });

    clipboard.on('error', (e) => {
        console.error('无法复制到剪贴板:', e);
        emitter.emit('send-tips', {
            title: '提示',
            message: '复制失败，请手动复制',
            type: 'warning'
        })
    });
});

</script>

<style scoped>
@import '../../assets/css/simulation.css';
@import '../../assets/css/checkbox.css';
</style>