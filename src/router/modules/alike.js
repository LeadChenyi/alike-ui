export default [// alike - 自定义组件
    {
        path:'/basic',
        name:'Basic',
        component:() => import('@/pages/alike/basic')
    }, 
    {
        path:'/button',
        name:'Button',
        component:() => import('@/pages/alike/button')
    },        
    {
        path:'/form',
        name:'Form',
        component:() => import('@/pages/alike/form')
    },         
    {
        path:'/scroll',
        name:'Scroll',
        component:() => import('@/pages/alike/scroll')
    },
    {
        path:'/carousel',
        name:'Carousel',
        component:() => import('@/pages/alike/carousel')
    },        
    {
        path:'/canvas',
        name:'Canvas',
        component:() => import('@/pages/alike/canvas')
    },        
    {
        path:'/wrapper',
        name:'Wrapper',
        component:() => import('@/pages/alike/wrapper')
    },        
    {
        path:'/video',
        name:'Video',
        component:() => import('@/pages/alike/video')
    }
]
