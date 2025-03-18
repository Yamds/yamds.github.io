import { createRouter, createWebHistory } from 'vue-router'


// 引入路由组件
import MaterialsSearch from '../pages/MaterialsSearch.vue'
import Settings from '../pages/Settings.vue'
import Info from '../pages/Info.vue'
import Simulation from '../pages/Simulation.vue'
import Map from '../pages/Map.vue'

let router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "materials-search",
            path: "/materials-search",
            component: MaterialsSearch,
            meta: { KeepAlive: true }
        },
        {
            name: "simulation",
            path: "/simulation",
            component: Simulation,
            meta: { KeepAlive: true }
        },
        {
            name: "map",
            path: "/map",
            component: Map,
            meta: { KeepAlive: true }
        },
        {
            name: "settings",
            path: "/settings",
            component: Settings,
            meta: { KeepAlive: true }
        },
        {
            name: "info",
            path: "/info",
            component: Info,
            meta: { KeepAlive: true }
        },
        {
            path: "/",
            redirect: "/materials-search",
            meta: { KeepAlive: true }
        }
    ]
})

export default router