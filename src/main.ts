// 引入createApp用于创建引用
import {createApp} from 'vue'
// 引入App根组件
import App from './App.vue'
// 引入路由器
import router from './router'
import './assets/css/global.css'
import './assets/css/theme.scss'

// 设置默认主题
document.documentElement.setAttribute('data-theme', 'macchiato')

let app = createApp(App)

app.use(router)
app.mount("#app")