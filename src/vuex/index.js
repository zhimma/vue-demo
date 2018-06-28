import Vue from 'vue';
import Vuex from 'vuex';
import Http from '../until/http'
import {Message} from "element-ui";
import Config from '../config/index';
import Router from '../router/index'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        menu: {
            mainMenuCreateStatus: false,
            childMenuCreateStatus: false,
            menuList: '',
            menuChildData: {
                name: '',
                url: '',
                icon: '',
                sort: 0,
                parent_id: 0
            },
            menuMainData: {
                name: '',
                icon: '',
                sort: 0,
                parent_id: 0
            }
        }
    },
    mutations: {
        changeMainMenuStatus(state, parent_id) {
            state.menu.menuMainData.parent_id = parent_id;
            state.menu.mainMenuCreateStatus = true
        },
        closeMenu(state, menuData) {
            console.log(menuData);
            state.menu.mainMenuCreateStatus = false;
            state.menu.childMenuCreateStatus = false;
            state.menu.menuList = menuData;
        },
        changeChildMenuStatus(state, parent_id) {
            state.menu.menuChildData.parent_id = parent_id;
            state.menu.childMenuCreateStatus = true
        },
        menuList(state, list) {
            state.menu.menuList = list
        },
    },
    actions: {
        login(context, data) {
            Http.post('login', data)
                .then((response) => {
                    console.log(response);
                    if (response.status == '200') {
                        sessionStorage.setItem(Config.tokenKey, response.headers.authorization);
                        console.log(JSON.stringify(response.data.data));
                        sessionStorage.setItem('Menus', JSON.stringify(response.data.data));
                        // Router.addRouter(JSON.stringify(response.data.data));
                        Router.push({path: '/menu'})
                    }
                })
        },
        showCreateMainMenu(context, parent_id) {
            context.commit('changeMainMenuStatus', parent_id);
        },
        showCreateChildMenu(context, parent_id) {
            context.commit('changeChildMenuStatus', parent_id);
        },
        storeMenu(context, menuData) {
            Http.post("/menu", menuData).then((response) => {
                console.log(response);
                if (response.data.status_code == 200) {
                    context.commit('closeMenu', response.data.data);
                    Message({
                        title: '菜单添加结果',
                        message: '菜单添加成功',
                        type: 'success'
                    });
                }
            })
        },
        getMenuList(context) {
            Http.get('/menu').then((response => {
                context.commit('menuList', response.data.data);
            }))
        }
    }
})

export default store