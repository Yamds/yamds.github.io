<template>
    <div>
        <h2>网站设置</h2>
        <div class="row">
            <div class="col-md-6">
                <ul>
                    <li>
                        <h4>主题色</h4>
                        <div class="theme-color">
                            <span @click="cycleTheme">
                                {{ theme_color }}
                            </span>
                        </div>
                    </li>
                    <li>
                        <h4>强调色</h4>
                        <div class="theme-color">
                            <span @click="cycleCustomColor">
                                {{ customColor }}
                            </span>
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

    // 初始化
    onMounted(() => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'macchiato')
        }
        document.documentElement.setAttribute('data-theme', theme_color.value)
        document.documentElement.style.setProperty('--ctp-custom', `var(--ctp-${customColor.value})`)
    })
</script>

<style scoped>
    .theme-color > span {
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
