// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import Config from './config';
Vue.prototype.$Config = Config;

Vue.config.productionTip = false
Vue.use(ElementUI)


router.beforeEach((to, from, next) => {
    if (!sessionStorage.getItem(Config.tokenKey) && to.path != '/login') {
        next({path: '/login'});
    } else {
        next();
    }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})