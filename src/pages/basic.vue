<template>
    <div class="basic-page">
        <alike-divider>Collapse 静态布局</alike-divider>
        <alike-collapse :active="active" :accordion="true">
            <alike-collapse-item title="哪吒闹海" name="0">
                <div>
                    <p>是他就是他我们的朋友小哪吒</p>
                    <p>是他就是他我们的朋友小哪吒</p>
                    <p>是他就是他我们的朋友小哪吒</p>
                </div>
            </alike-collapse-item>            
            <alike-collapse-item title="大闹天宫" name="1">
                <div>
                    <p>俺老孙老也，都给我闪开</p>
                    <p>俺老孙老也，都给我闪开</p>
                    <p>俺老孙老也，都给我闪开</p>
                </div>
            </alike-collapse-item>
        </alike-collapse>
    </div>
</template>

<script>
import alikeCollapse from '../../packages/collapse/collapse'
import alikeCollapseItem from '../../packages/collapse-item/collapse-item'
export default {
    name:"Basic",
    components:{
        alikeCollapse,
        alikeCollapseItem
    },
    data(){
        return {
            active:"0"
        }
    }
}
</script>

<style scoped>
    
</style>