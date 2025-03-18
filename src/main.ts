// 引入createApp用于创建引用
import { createApp } from 'vue'
// 引入App根组件
import App from './App.vue'
// 引入路由器
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/css/global.css'
import './assets/css/theme.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// 引入 pinia
import { createPinia } from 'pinia'

// 设置默认主题
document.documentElement.setAttribute('data-theme', 'macchiato')

let app = createApp(App)
// 创建 pinia
let pinia = createPinia()
// 挂载图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount("#app")