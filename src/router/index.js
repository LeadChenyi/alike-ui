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
            path:'/cssom',
            name:'Cssom',
            component:() => import('@/pages/cssom')
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
            path:'/mouse',
            name:'Mouse',
            component:() => import('@/pages/mouse')
        },        
        {
            path:'/drag',
            name:'Drag',
            component:() => import('@/pages/drag')
        },        
        {
            path:'/render',
            name:'Render',
            component:() => import('@/pages/render')
        },        
        {
            path:'/animation',
            name:'Animation',
            component:() => import('@/pages/animation')
        },        
        {
            path:'/animationthree',
            name:'AnimationThree',
            component:() => import('@/pages/animationthree')
        },        
        {
            path:'/scroll',
            name:'Scroll',
            component:() => import('@/pages/scroll')
        },
        {
            path:'/*',
            redirect:{name:'Index'}
        }
    ]
})
export default router;