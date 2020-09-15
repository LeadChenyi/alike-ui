import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset-pc.css'
// import plugin from './plugin'
// Vue.use(plugin)

import alikeIcon from '../packages/icon/icon'
import alikeLine from '../packages/line/line'
Vue.component(alikeIcon.name,alikeIcon);
Vue.component(alikeLine.name,alikeLine);


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
