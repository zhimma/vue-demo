import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import Index from '@/components/index/index'
import menuPage from '@/components/Menu/index'
import systemSetting from '@/components/system/setting'
import login from '@/components/login/login'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Layout,
            children: [
                {path: '/index', component: Index, name: 'index', class: 'fa-line-chart'},
                {path: '/menu', component: menuPage, name: 'menu', class: 'fa-line-chart'},
                {path: '/system-setting', component: systemSetting, name: 'systemSetting', class: 'fa-line-chart'},
            ]
        },
        {
            path: '/login',
            component: login,
        }
    ]
})
