<template>
    <div>
        <h2>网站设置</h2>
        <div class="row">
            <div class="col-md-6">
                <ul>
                    <li>
                        <hr>
                        <h4>主题背景色: </h4>
                        <div class="theme-color">
                            <span @click="cycleTheme">
                                {{ theme_color }}
                            </span>
                        </div>
                        <hr>
                    </li>
                    <li>
                        <h4>强调色: </h4>
                        <div class="theme-color">
                            <span @click="cycleCustomColor">
                                {{ customColor }}
                            </span>
                        </div>
                        <hr>
                    </li>
                    <li>
                        <h4>清除所有缓存(localStorage)</h4>
                        <p>包括主题色、材料列表、装备方案列表、一些选项缓存等，可以在浏览器查看，不同浏览器查看方式不一样</p>
                        <p>比如火狐浏览器>f12>存储>本地存储</p>
                        <div class="theme-color" @click="clearLocalStorage">
                            <span>清除缓存</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "Settings"
}
</script>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const themes = ['latte', 'frappe', 'macchiato', 'mocha']
const theme_color = ref(localStorage.getItem('theme') || 'macchiato')

// 主题按钮循环显示
const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme_color.value)
    const nextIndex = (currentIndex + 1) % themes.length
    theme_color.value = themes[nextIndex]
}

// 监听 theme_color 的变化
watch(theme_color, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
}, { immediate: true })

const customColors = ['mauve', 'pink', 'red', 'maroon', 'peach', 'yellow', 'green', 'teal', 'sky', 'sapphire', 'blue', 'lavender']
const customColor = ref(localStorage.getItem('customColor') || 'mauve')

// 强调色按钮循环显示
const cycleCustomColor = () => {
    const currentIndex = customColors.indexOf(customColor.value)
    const nextIndex = (currentIndex + 1) % customColors.length
    customColor.value = customColors[nextIndex]
    localStorage.setItem('customColor', customColors[nextIndex])
    document.documentElement.style.setProperty('--ctp-custom', `var(--ctp-${customColors[nextIndex]})`)
}

// 初始化 获取localstorage里的主题
onMounted(() => {
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'macchiato')
    }
    document.documentElement.setAttribute('data-theme', theme_color.value)
    document.documentElement.style.setProperty('--ctp-custom', `var(--ctp-${customColor.value})`)
})

// 清除缓存
const clearLocalStorage = () => {
    localStorage.clear()
    location.reload()
}
</script>

<style scoped>
.theme-color>span {
    display: inline-block;
    width: 100px;
    height: 30px;
    cursor: pointer;
    user-select: none;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    transition: all 0.5s ease;
    margin: 5px 0;
    border: 1px solid var(--ctp-custom);
    color: var(--ctp-text);
}
</style>
