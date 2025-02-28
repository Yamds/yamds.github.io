// 引入createApp用于创建引用
import {createApp} from 'vue'
// 引入App根组件
import App from './App.vue'
// 引入路由器
import router from './router'
import './assets/css/global.css'
import './assets/css/theme.scss'
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

app.use(router)
app.use(pinia)
app.mount("#app")