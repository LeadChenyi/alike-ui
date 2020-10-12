export default [// unit2 - 脚本效果
    {
        path:'/cssom',
        name:'Cssom',
        component:() => import('@/pages/unit2/cssom'),
        meta:{
            requiresAuth:true
        }
    },    
    {
        path:'/regexp',
        name:'Regexp',
        component:() => import('@/pages/unit2/regexp')
    },
    {
        path:'/mouse',
        name:'Mouse',
        component:() => import('@/pages/unit2/mouse')
    },        
    {
        path:'/drag',
        name:'Drag',
        component:() => import('@/pages/unit2/drag')
    }
]