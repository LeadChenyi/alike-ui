
<template>
    <div class="render-page">
        <alike-divider>render简单式组件渲染</alike-divider>
        <render-one :message="message"></render-one>

        <alike-divider>render嵌套式组件渲染</alike-divider>
        <render-two :types="types"></render-two>

        <alike-divider>render插槽式组件渲染</alike-divider>
        <render-slot :size="1">
            <template slot-scope="item">
                模拟H{{item.size}}标签
            </template>
        </render-slot>
        <render-slot :size="2">
            <template slot-scope="item">
                模拟H{{item.size}}标签
            </template>
        </render-slot>
        <render-slot :size="3">
            <template slot-scope="item">
                模拟H{{item.size}}标签
            </template>
        </render-slot>

        <alike-divider>render具名插槽式组件渲染</alike-divider>
        <render-slots>
            <div slot="header">这是一个头部插槽</div>
            <div slot="footer">这是一个底部插槽</div>
        </render-slots>        
        <alike-line type="white"></alike-line>
        <render-slots>
            <template v-slot:header="{value}">这是一个{{value}}插槽</template>
            <template v-slot:footer="{value}">这是一个{{value}}插槽</template>
        </render-slots>
    </div>
</template>
<script>
import renderOne from '@/components/render-one'
import renderTwo from '@/components/render-two'
import renderSlot from '@/components/render-slot'
import renderSlots from '@/components/render-slots'

export default {
    name:"Render",
    components:{
        renderOne,
        renderTwo,
        renderSlot,
        renderSlots
    },
    data(){
        return {
            message:"通过页面传递到组件的数据，请使用render渲染",
            types:['default','primary','success','fail','warn','info']
        }
    }
}
</script>

<style>

</style>