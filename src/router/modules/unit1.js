export default [// unit1 - 样式效果
    {
        path:'/hover',
        name:'Hover',
        component:() => import('@/pages/unit1/hover')
    },          
    {
        path:'/hoverup',
        name:'HoverUp',
        component:() => import('@/pages/unit1/hoverup')
    },  
    {
        path:'/atransition',
        name:'Atransition',
        component:() => import('@/pages/unit1/atransition')
    },      
    {
        path:'/animation',
        name:'Animation',
        component:() => import('@/pages/unit1/animation')
    },                
    {
        path:'/animationup',
        name:'AnimationUp',
        component:() => import('@/pages/unit1/animationup')
    },        
    {
        path:'/barrage',
        name:'Barrage',
        component:() => import('@/pages/unit1/barrage')
    },    
    {
        path:'/scrollup',
        name:'ScrollUp',
        component:() => import('@/pages/unit1/scrollup')
    },    
    {
        path:'/maskback',
        name:'MaskBack',
        component:() => import('@/pages/unit1/maskback')
    }
]