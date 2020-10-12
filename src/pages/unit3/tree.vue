<template>
    <div class="tree-page">
        <ul>
            <li v-for="(item,index) in fruits" :key="index">
                <h3>{{item.name}}</h3>
                <children-tree v-if="item.children" :children="item.children"></children-tree>
            </li>
        </ul>
    </div>
</template>

<script>
import childrenTree from '@/components/children-tree'
export default {
    name:"Tree",
    components:{
        childrenTree
    },
    data(){
        return {
            fruits:[
                {
                name:"苹果",children:[
                    {
                    name:"青苹果",children:[
                        {name:"mini青苹果1"},
                        {name:"mini青苹果2"},
                        {name:"mini青苹果3"},
                    ]
                    },
                    {
                    name:"红苹果",children:[
                        {name:"mini红苹果1"},
                        {name:"mini红苹果2"}
                    ]
                    }
                ]
                },
                {
                name:"萝卜",children:[
                    {
                    name:"白萝卜",children:[
                        {name:"mini白萝卜1"},
                        {name:"mini白萝卜2"},
                        {name:"mini白萝卜3"},
                    ]
                    },
                    {
                    name:"胡萝卜",children:[
                        {name:"mini胡萝卜1"},
                        {name:"mini胡萝卜2"}
                    ]
                    }
                ]
                }
            ]
        }
    }
}
</script>

<style>

</style>