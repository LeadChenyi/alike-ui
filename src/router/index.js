import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
    return originalPush.call(this,location).catch(err => err)
}
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes:[
        {
            path:'/',
            name:'Index',
            component:() => import('@/pages/index')
        },        
        {
            path:'/basic',
            name:'Basic',
            component:() => import('@/pages/basic')
        },        
        {
            path:'/button',
            name:'Button',
            component:() => import('@/pages/button')
        },        
        {
            path:'/form',
            name:'Form',
            component:() => import('@/pages/form')
        },        
        {
            path:'/animation',
            name:'Animation',
            component:() => import('@/pages/animation')
        },        
        {
            path:'/scrollview',
            name:'ScrollView',
            component:() => import('@/pages/scrollview')
        },
        {
            path:'/*',
            redirect:{name:'Index'}
        }
    ]
})
export default router;