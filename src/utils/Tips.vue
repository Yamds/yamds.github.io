<template>
    <div class="tips-container">
        <div v-for="(item, index) in tips" :key="item.id" :class="['tips', item.type, { leaving: item.leaving }]"
            :style="{ top: `${index * 93 + 20}px` }">
            <i :class="['bi', iconClass(item.type)]"></i>
            <div class="content">
                <div class="title">{{ item.title }}</div>
                <div class="message">{{ item.message }}</div>
            </div>
            <button @click="removetips(item.id)">×</button>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Tips'
    }
</script>

<script lang="ts" setup>
import { ref, provide } from 'vue'

let idCounter = 0
let tips = ref<{ 
    id: number, 
    title: string, 
    message: string, 
    type: string,
    leaving?: boolean  // 新增leaving状态
}[]>([])

let iconClass = (type: string) => {
    switch (type) {
        case 'info': return 'bi-info-circle';
        case 'success': return 'bi-check-circle';
        case 'warning': return 'bi-exclamation-triangle';
        case 'error': return 'bi-x-circle';
        default: return 'bi-info-circle';
    }
}

function addTips(title: string, message: string, type: string = 'info') {
    let id = idCounter++
    tips.value.push({ id, title, message, type })
    setTimeout(() => removetips(id), 5000)
    // 判断是否是移动设备
    let isMobile = window.innerWidth <= 768
    // 移动设备最多显示2条，桌面设备最多显示7条
    let maxTips = isMobile ? 1 : 7
    if (tips.value.length > maxTips) {
        removetips(tips.value[0].id)
    }
}

let removetips = (id: number) => {
    let index = tips.value.findIndex(n => n.id === id)
    if (index !== -1) {
        // 1. 先标记为leaving状态触发动画
        tips.value[index].leaving = true
        // 2. 300ms后移除元素（与动画时间匹配）
        setTimeout(() => {
            tips.value = tips.value.filter(n => n.id !== id)
        }, 280)
    }
}

// 提供全局调用方法
provide('tips', addTips)

defineExpose({ addTips })
</script>

<style scoped>
.tips-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
}

.tips {
    position: absolute;
    right: 20px;
    padding: 15px;
    border-radius: 8px;
    min-width: 300px;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: slideIn 0.3s ease-out, fadeInScale 0.3s ease-out;
    transition: all 0.3s ease-out;
}
.tips.info {
    background-color: rgba(33, 150, 243, 0.7);
    border: 1px solid rgb(33, 150, 243);
}

.tips.success {
    background-color: rgba(76, 175, 80, 0.8);
    border: 1px solid rgb(76, 175, 80);
}

.tips.warning {
    background-color: rgba(255, 152, 0, 0.7);
    border: 1px solid rgb(255, 152, 0);
}

.tips.error {
    background-color: rgba(244, 67, 54, 0.7);
    border: 1px solid rgb(244, 67, 54);
}
.tips.leaving {
    animation: slideOut 0.3s ease-out, fadeOutScale 0.3s ease-out;
    opacity: 0;
    transform: translateX(100%) scale(0.9);
}

.bi {
    font-size: 24px;
}

.content {
    flex: 1;
}

.title {
    font-weight: bold;
    font-size: 1.1em;
    margin-bottom: 4px;
    color: #fff;
}

.message {
    font-size: 1.1em;
    opacity: 0.8;
    color: #fff;
}

button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    padding: 0;
    align-self: flex-start;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(100%);
    }
}

@keyframes fadeOutScale {
    from {
        opacity: 1;
        transform: scale(1);
    }

    to {
        opacity: 0;
        transform: scale(0.9);
    }
}
</style>