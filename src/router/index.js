import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
    return originalPush.call(this,location).catch(err => err)
}
Vue.use(VueRouter);

let routes = [
    {
        path:'/',
        name:'Index',
        component:() => import('@/pages/index')
    }   
];
const files = require.context('./modules',false,/\.js$/);
files.keys().forEach((item)=>{
    routes = [...routes,...files(item).default];
});
routes.push({
    path:'/*',
    redirect:{name:'Index'}
});

const router = new VueRouter({
    mode: 'history',
    routes
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