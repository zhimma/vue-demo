import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        menu: {
            parent_id: 0,
            mainMenuCreateStatus :false,
            childMenuCreateStatus :false
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
        }
    },
    actions: {
        showCreateMainMenu(context, parent_id) {
            context.commit('changeMainMenuStatus', parent_id);
        },
        showCreateChildMenu(context, parent_id) {
            context.commit('changeChildMenuStatus', parent_id);
        }
    }
})

export default store