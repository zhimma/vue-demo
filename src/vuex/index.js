import Vue from 'vue';
import Vuex from 'vuex';
import Http from '../until/http'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        menu: {
            parent_id: 0,
            mainMenuCreateStatus: false,
            childMenuCreateStatus: false,
            menuList: {}
        }
    },
    mutations: {
        changeMainMenuStatus(state, parent_id) {
            state.menu.parent_id = parent_id
            state.menu.mainMenuCreateStatus = true
        },
        changeChildMenuStatus(state, parent_id) {
            state.menu.parent_id = parent_id
            state.menu.childMenuCreateStatus = true
        },
        menuList(state, list) {
            state.menu.menuList = list
        },
    },
    actions: {
        showCreateMainMenu(context, parent_id) {
            context.commit('changeMainMenuStatus', parent_id);
        },
        showCreateChildMenu(context, parent_id) {
            context.commit('changeChildMenuStatus', parent_id);
        },
        storeMenu(context, menuData) {
            Http.post("/menu", menuData).then((response) => {
                if (response.data.code == 200) {
                    this.visibleStatus = !this.visibleStatus;
                    this.$notify({
                        title: '菜单添加结果',
                        message: '菜单添加成功',
                        type: 'success'
                    });
                }
            })
        },
        getMenuList(context) {
            Http.get('/menu').then((response => {
                console.log(response.data.data);
                context.commit('menuList', response.data.data);
            }))
        }
    }
})

export default store