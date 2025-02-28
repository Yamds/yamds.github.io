<template>
  <div class="row">
    <div v-for="(item, item_index) in useMaterialStore().showItemCard" class="col-md-6 col-12 itemShowCard">
      <transition name="fade" mode="out-in">
        <table v-if="item.name?.length > 0" :key="useMaterialStore().version[item_index]">
          <tbody>
            <!-- 1. 名称 -->
            <tr>
              <td class="name" colspan="3">
                  <h4 style="font-weight: bold;">{{item.name}}</h4>
              </td>
            </tr>
            <!-- 2. 图标 -->
            <tr>
              <td class="img" colspan="3">
                  <img :src="`/img/all/${item.icon}.png`" alt="">
              </td>
            </tr>
            <!-- 3. 等阶 -->
            <tr>
              <td>
                  <span>等阶</span>
              </td>
              <td colspan="2">
                  <span>{{item.level}}</span>
              </td>
            </tr>
            <!-- 4. 属性 -->
            <tr>
              <td>
                  <span>种类</span>
              </td>
              <td colspan="2">
                  <span>{{item.type}}</span>
              </td>
            </tr>
            <!-- 5. 属性 -->
            <tr>
              <td>
                  <span>属性</span>
              </td>
              <td colspan="2">
                  <span v-for="attr in item.attribute">
                      <img style="margin-right: 2px;"
                          :src="`/img/attr/${useMaterialStore().material_attribute.find(a => a.name === attr)?.icon || ''}.png`"
                          alt="">
                      <span style="margin-right: 4px;">{{attr + " "}}</span>
                  </span>
              </td>
            </tr>
            <!-- 6. 占位 -->
            <tr>
              <td>
                  <span>占位</span>
              </td>
              <td colspan="2">
                  <span>{{item.slot}}格</span>
              </td>
            </tr>
            <!-- 7. 星级 + 设置数值格式 -->
            <tr>
            <td>
              <span>星级</span>
              </td>
              <td @click="useMaterialStore().setValueType(item_index, 1)"
                  :class="useMaterialStore().getValueType(item_index) == 1 ? 'value-selected' : 'value-unselected'">
                  <span>完整数值</span>
              </td>
              <td @click="useMaterialStore().setValueType(item_index, 2)"
                  :class="useMaterialStore().getValueType(item_index) == 2 ? 'value-selected' : 'value-unselected'">
                  <span>平均数值(格)</span>
              </td>
            </tr>
            <!-- 8~12. 星级具体数值 -->
            <tr class="level-attr" v-if="useMaterialStore().getValueType(item_index) == 1" v-for="(star, star_index) in item.star">
              <td>
                  <span>{{ star_index + 1 }}星</span>

              </td>
              <td colspan="2">
                  <span v-for="attr in Object.entries(star)">
                      <img :src="`/img/attr/${useMaterialStore().material_attribute.find(a => a.name === attr[0])?.icon || ''}.png`"
                          alt="">
                      <span>{{attr[1]}} </span>
                  </span>
              </td>
            </tr>
            <!-- 8~12. 星级平均数值 -->
            <tr class="level-attr" v-if="useMaterialStore().getValueType(item_index) == 2" v-for="(star, star_index) in item.star">
              <td>
                  <span>{{ star_index + 1 }}星</span>
              </td>
              <td colspan="2">
                  <!-- 确保attr[1]为number，不然无法使用除法 -->
                  <span v-for="attr in Object.entries(star) as [string, number][]">
                      <img :src="`/img/attr/${useMaterialStore().material_attribute.find(a => a.name === attr[0])?.icon || ''}.png`"
                          alt="">
                      <span>{{parseFloat((attr[1] / item.slot).toFixed(1))}}</span>
                  </span>
              </td>
            </tr>
            <!-- 13. 技能 -->
            <tr>
              <td>
                  <span>技能</span>
              </td>
              <td colspan="2">
                  <span>{{item.skill}}</span>
              </td>
            </tr>
            <!-- 14. 获取途径 -->
            <tr>
              <td>
                  <span>获取途径</span>
              </td>
              <td colspan="2">
                  <span>{{item.drop}}</span>
              </td>
            </tr>
            <!-- 15. 功勋 -->
            <tr>
              <td>
                  <span>功勋</span>
              </td>
              <td colspan="2">
                  <span>{{item.point}}</span>
              </td>
            </tr>
            <!-- 16. 参考价格 -->
            <tr>
              <td>
                  <span>参考价格</span>
              </td>
              <td colspan="2">
                  <span>{{item.point * 30}}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
    export default {
        name: 'MaterialsShowCard'
    }
</script>

<script lang="ts" setup>
  import { useMaterialStore } from '../../store/material';

</script>

<style scoped>
@import '../../assets/css/material.css';
@import '../../assets/css/checkbox.css';
</style>
