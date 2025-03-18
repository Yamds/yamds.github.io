<template>
    <div>
        <div class="row">
            <div class="original col-md-8">
                <img ref="original" src="/img/map/map.png" alt="">
            </div>
            <div class="big col-md-4">
                <img ref="big" src="/img/map/map.png" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Map'
}
</script>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
let original = ref<HTMLImageElement | null>(null);
let big = ref<HTMLImageElement | null>(null);

let mouseX = ref(0);
let mouseY = ref(0);

function handleMouseMove(event: MouseEvent) {
    mouseX.value = event.clientX;
    mouseY.value = event.clientY;

    let rect = original.value?.getBoundingClientRect();
    if (!rect) return;

    let imgTop = rect.top + window.scrollY;
    let imgLeft = rect.left + window.scrollX;

    if (mouseX.value > imgLeft && mouseX.value < imgLeft + rect.width && mouseY.value > imgTop && mouseY.value < imgTop + rect.height) {
        // 鼠标相对图标坐标
        let mouseX_relative = mouseX.value - imgLeft;
        let mouseY_relative = mouseY.value - imgTop;

        // 放大镜的宽高
        if (big.value && original.value && big.value.offsetWidth && big.value.offsetHeight) {
            const scale = 25; // 修正比例系数（25→5对应500%）
            const originalWidth = original.value.offsetWidth; // 现在已通过空值校验

            // 计算相对位置百分比
            const percentX = (mouseX_relative / originalWidth) * 100;
            const percentY = (mouseY_relative / originalWidth) * 100; // 使用宽度保证正方形比例

            // 根据放大比例计算偏移量
            const offsetX = (percentX * scale) - (big.value.offsetWidth / 2);
            const offsetY = (percentY * scale) - (big.value.offsetHeight / 2);

            // 应用位移（添加边界限制）
            big.value.style.left = `${-offsetX}px`;
            big.value.style.top = `${-offsetY}px`;
        }
    }
}

onMounted(() => {
    // 监听鼠标事件
    window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
    // 组件卸载时移除事件监听
    window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.original img {
    width: 100%;
    background-color: #0A0017;
}

.big {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    background-color: #0A0017;
    /* width: 50px;
        height: 50px; */
}

.big img {
    width: 500%;
    position: absolute;
    transition: all 0.2s linear;
    /* 添加平滑过渡 */
    transform: translate(-50%, -50%);
    /* 中心对齐 */
}
</style>
