import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        carts:"这是一个购物车"
    },
    mutations:{
        setCarts(state,payload){
            state.carts = payload;
        }
    },
    actions:{
        setCarts(context,payload){
            context.commit('setCarts',payload)
        }
    }
})

export default store;