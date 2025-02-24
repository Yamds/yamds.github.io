<template>
  <div class="row">
    <div v-for="(item, item_index) in showItemCard" class="col-md-6 col-12 itemShowCard">
      <transition name="fade" mode="out-in">
        <table v-if="item.name?.length > 0" :key="version[item_index]">
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
                          :src="`/img/attr/${material_attribute.find(a => a.name === attr)?.icon || ''}.png`"
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
              <td @click="setValueType(item_index, 1)"
                  :class="getValueType(item_index) == 1 ? 'value-selected' : 'value-unselected'">
                  <span>完整数值</span>
              </td>
              <td @click="setValueType(item_index, 2)"
                  :class="getValueType(item_index) == 2 ? 'value-selected' : 'value-unselected'">
                  <span>平均数值(格)</span>
              </td>
            </tr>
            <!-- 8~12. 星级具体数值 -->
            <tr class="level-attr" v-if="getValueType(item_index) == 1" v-for="(star, star_index) in item.star">
              <td>
                  <span>{{ star_index + 1 }}星</span>

              </td>
              <td colspan="2">
                  <span v-for="attr in Object.entries(star)">
                      <img :src="`/img/attr/${material_attribute.find(a => a.name === attr[0])?.icon || ''}.png`"
                          alt="">
                      <span>{{attr[1]}} </span>
                  </span>
              </td>
            </tr>
            <!-- 8~12. 星级平均数值 -->
            <tr class="level-attr" v-if="getValueType(item_index) == 2" v-for="(star, star_index) in item.star">
              <td>
                  <span>{{ star_index + 1 }}星</span>
              </td>
              <td colspan="2">
                  <!-- 确保attr[1]为number，不然无法使用除法 -->
                  <span v-for="attr in Object.entries(star) as [string, number][]">
                      <img :src="`/img/attr/${material_attribute.find(a => a.name === attr[0])?.icon || ''}.png`"
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
  import emitter from '../../utils/emitter';
  import { type MaterialsInter } from '../../types'
  import { ref, watch } from 'vue';
  import materialTypes from '../../assets/json/material_type.json'

  // 属性
  let material_attribute = materialTypes.material_attribute
  let showCardPos = 1;
  let showCardValueType = ref([1, 1]);
  let showItemCard = ref(JSON.parse(localStorage.getItem('showItemCard') || '{"item1": {}, "item2": {}}'))
  let version = ref({item1: 1, item2: 1})

  // 方法
  function getValueType(index:any) {
    if (index == "item1") {
      return showCardValueType.value[0];
    } else if (index == "item2") {
      return showCardValueType.value[1];
    }
  }
  // 设置完整数值或平均数值
  function setValueType(index:any, value:number) {
      if (index == "item1") {
        showCardValueType.value[0] = value;
      } else if (index == "item2") {
        showCardValueType.value[1] = value;
      }
  }

  // 从list接收被点击的item
  emitter.on("send-clickItem", (value:any) => {
    if(showCardPos == 1) {
      version.value.item1++
      showItemCard.value.item1 = value
      
    }
    else {
      version.value.item2++
      showItemCard.value.item2 = value
      
    }
    showCardPos *= -1
  })

  // 监听showItemCard的变化并保存到localStorage
  watch(showItemCard, (newValue) => {
    localStorage.setItem('showItemCard', JSON.stringify(newValue))
  }, { deep: true , immediate: true})
</script>

<style scoped>
  .itemShowCard {
    margin-bottom: 20px;
  }
  table {
    width: 100%;
  }

  table tr td {
    padding: 7px;
  }
  table tr td span {
    line-height: 100%;
    font-size: 16px;
  }
  /* 设置偶数行背景 */
  table tr:nth-child(2n) td {
    background-color: var(--ctp-surface1);
  }
  /* 设置奇数行背景 */
  table tr:nth-child(2n-1) td {
    background-color: var(--ctp-surface0);
  }
  /* 设置第一行和第二行文字居中 */
  table tr:nth-child(1),
  table tr:nth-child(2) {
    text-align: center;
  }
  /* 设置第二行图片宽度 */
  table tr:nth-child(2) img {
    width: 50%;
    padding: 5% 0;
  }
  /* 设置非一二行 第一列宽度 */
  table tr:not(:nth-child(1)):not(:nth-child(2)) td:nth-child(1) {
    width: 25%;
    padding-left: 10px;
  }
  /* 设置非一二行 图片宽度 */
  table tr:not(:nth-child(1)):not(:nth-child(2)) img {
    width: 16px;
  }
  /* 完整数值和平均数值的样式 */
  .value-selected {
    text-align: center;
    background-color: var(--ctp-surface1) !important;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .value-unselected {
    text-align: center;
    background-color: var(--ctp-surface0) !important;
    cursor: pointer;
  }
  /* 设置星级属性表格的样式 */
  table tr.level-attr td:nth-child(2)>span {
    display: inline-block;
    width: 20%;
  }
  /* 淡入淡出动画 */
  .fade-enter-active,
  .fade-leave-active {
      transition: all 0.2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
      opacity: 0;
      transform: translateY(10px);
  }

  /* 如果希望左右滑动效果 */
  .slide-enter-active,
  .slide-leave-active {
      transition: all 0.2s ease;
  }

  .slide-enter-from {
      opacity: 0;
      transform: translateX(20px);
  }

  .slide-leave-to {
      opacity: 0;
      transform: translateX(-20px);
  }
</style>
