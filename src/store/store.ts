import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';
import todoModule from './todoModule/index';

Vue.use(Vuex);

const { store, moduleActionContext } = createDirectStore({
    modules: {
        todoModule
    }
})

export default store;
export { moduleActionContext }

export type AppStore = typeof store
declare module "vuex" {
    interface Store<S> {
        direct: AppStore
    }
}