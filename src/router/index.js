import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

let routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('@/pages/index')
    }
];
const files = require.context('./modules', false, /\.js$/);
files.keys().forEach((item) => {
    routes = [...routes, ...files(item).default];
});
routes.push({
    path: '/*',
    redirect: { name: 'Index' }
});

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router;