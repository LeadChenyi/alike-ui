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
            path:'/login',
            name:'Login',
            component:() => import('@/pages/login')
        },        
        {
            path:'/cssom',
            name:'Cssom',
            component:() => import('@/pages/cssom'),
            meta:{
                requireAuth:true         // 用于判断用户是否要有权限才能访问该路由
            }
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
            path:'/hover',
            name:'Hover',
            component:() => import('@/pages/hover')
        },        
        {
            path:'/animation',
            name:'Animation',
            component:() => import('@/pages/animation')
        },        
        {
            path:'/animation/three',
            name:'AnimationThree',
            component:() => import('@/pages/animation/three')
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

// 路由守卫（导航拦截）
router.beforeEach((to, from, next) => {
    // 如果访问的路由需要用户登录权限，则判断token是否存在，不存在则跳转去登录
    if(to.meta.requireAuth && !localStorage.getItem('token')){
        // 未登录重定向跳转至登录页
        next({name:'Login'})
    }else{
        next();
    }
})

export default router;