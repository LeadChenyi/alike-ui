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
            path:'/render',
            name:'Render',
            component:() => import('@/pages/render')
        },        
        {
            path:'/jsx',
            name:'JSX',
            component:() => import('@/pages/jsx')
        },        
        {
            path:'/tree',
            name:'Tree',
            component:() => import('@/pages/tree')
        },         
        {
            path:'/reg',
            name:'Reg',
            component:() => import('@/pages/reg')
        },        
        {
            path:'/hover',
            name:'Hover',
            component:() => import('@/pages/effect/hover')
        },          
        {
            path:'/hoverup',
            name:'HoverUp',
            component:() => import('@/pages/effect/hoverup')
        },  
        {
            path:'/atransition',
            name:'Atransition',
            component:() => import('@/pages/effect/atransition')
        },      
        {
            path:'/animation',
            name:'Animation',
            component:() => import('@/pages/effect/animation')
        },                
        {
            path:'/animationup',
            name:'AnimationUp',
            component:() => import('@/pages/effect/animationup')
        },        
        {
            path:'/barrage',
            name:'Barrage',
            component:() => import('@/pages/effect/barrage')
        },
        {
            path:'/mouse',
            name:'Mouse',
            component:() => import('@/pages/event/mouse')
        },        
        {
            path:'/drag',
            name:'Drag',
            component:() => import('@/pages/event/drag')
        },
        {
            path:'/basic',
            name:'Basic',
            component:() => import('@/pages/ui/basic')
        }, 
        {
            path:'/button',
            name:'Button',
            component:() => import('@/pages/ui/button')
        },        
        {
            path:'/form',
            name:'Form',
            component:() => import('@/pages/ui/form')
        },         
        {
            path:'/scroll',
            name:'Scroll',
            component:() => import('@/pages/ui/scroll')
        },
        {
            path:'/carousel',
            name:'Carousel',
            component:() => import('@/pages/ui/carousel')
        },        
        {
            path:'/canvas',
            name:'Canvas',
            component:() => import('@/pages/ui/canvas')
        },        
        {
            path:'/wrapper',
            name:'Wrapper',
            component:() => import('@/pages/ui/wrapper')
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
    // 判断当前路由是否需要用户授权登录
    if(to.matched.some(record => record.meta.requiresAuth)){
        // 用户未登录且当前不在登录页面，则重定向跳转至登录页
        if(!localStorage.getItem('token') && to.name != 'Login'){
            next({
                path:'/login',
                query:{redirect:to.name}
            });
        }else{
            next();
        }
    }else{
        // 用户已登录且将前往登录页，则强制返回到上一个页面。如果没有路由历史记录，则返回到首页。
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