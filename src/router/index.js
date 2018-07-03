import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
let baseRoute = [
    {
        path: '/',
        component: (resolve) => require(['../components/layout.vue'], resolve),
        redirect: '/menu',
        hidden: true,
        children: [
            {
                path: '/index',
                component: (resolve) => require(['../components/Index/index.vue'], resolve),
                name: 'index',
                class: 'fa-line-chart'
            },
            {
                path: '/menu',
                component: (resolve) => require(['../components/Menu/index.vue'], resolve),
                name: 'menu',
                class: 'fa-line-chart'
            },
            {
                path: '/system-setting',
                component: (resolve) => require(['../components/system/setting.vue'], resolve),
                name: 'systemSetting',
                class: 'fa-line-chart'
            },
        ]
    },
    {
        path: '/login',
        component: (resolve) => require(['../components/login/login.vue'], resolve),
        hidden: true
    }
];
let router = new Router({
    routes: baseRoute
});
router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem('Authorization') && to.path != '/login') {
        next({path: '/login'});
    } else {
         /*var leftMenu = JSON.parse(sessionStorage.getItem('Menus'));
         console.log(leftMenu);*/
         // router.addRoutes(leftMenu);
        next();
    }
});
export default router;
