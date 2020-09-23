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
            component:() => import('@/pages/login'),
            beforeEnter (to, from, next) {
                // console.log('beforeEnter');
                next();
            }
        },        
        {
            path:'/cssom',
            name:'Cssom',
            component:() => import('@/pages/cssom'),
            meta:{
                requiresAuth:true
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


// 全局后置导航栏（优先级最高）
router.beforeEach((to, from, next) => {
    console.log('beforeEach：',to,from)

    if(to.matched.some(record => record.meta.requiresAuth)){
        // 判断用户是否已经登录，未登录重定向跳转至登录页
        if(!localStorage.getItem('token') && to.name != 'Login'){
            next({
                path:'/login',
                query:{redirect:to.name}
            });
        }else{
            next();
        }
    }else{
        if(localStorage.getItem('token') && to.name == 'Login'){
            if(from.name){
                next({name:from.name});
            }else{
                next({name:'Index'});
            }
        }else{
            next();
        }
    }
})

export default router;