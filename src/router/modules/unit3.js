export default [// unit3 - vue进阶
    {
        path: '/render',
        name: 'Render',
        component: () => import('@/pages/unit3/render')
    },
    {
        path: '/tree',
        name: 'Tree',
        component: () => import('@/pages/unit3/tree')
    },
    {
        path: '/jsx',
        name: 'Jsx',
        component: () => import('@/pages/unit3/jsx')
    }
]