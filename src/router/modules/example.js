export default [// example - 场景示例
    {
        path:'/login',
        name:'Login',
        component:() => import('@/pages/example/login'),
        beforeEnter (to, from, next) {
            // console.log('beforeEnter');
            next();
        }
    }
]