export default [// unit1 - 样式效果
    {
        path:'/hovercase',
        name:'HoverCase',
        component:() => import('@/pages/unit1/hovercase')
    },          
    {
        path:'/clickcase',
        name:'ClickCase',
        component:() => import('@/pages/unit1/clickcase')
    },  
    {
        path:'/transitioncase',
        name:'TransitionCase',
        component:() => import('@/pages/unit1/transitioncase')
    },      
    {
        path:'/animation',
        name:'Animation',
        component:() => import('@/pages/unit1/animation')
    },                
    {
        path:'/animation3d',
        name:'Animation3d',
        component:() => import('@/pages/unit1/animation3d')
    },        
    {
        path:'/barrage',
        name:'Barrage',
        component:() => import('@/pages/unit1/barrage')
    },     
    {
        path:'/notice',
        name:'Notice',
        component:() => import('@/pages/unit1/notice')
    },    
    {
        path:'/scrollcase',
        name:'ScrollCase',
        component:() => import('@/pages/unit1/scrollcase')
    },    
    {
        path:'/maskcase',
        name:'MaskCase',
        component:() => import('@/pages/unit1/maskcase')
    },    
    {
        path:'/inputcase',
        name:'InputCase',
        component:() => import('@/pages/unit1/inputcase')
    }
]