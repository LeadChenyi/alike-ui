<template>
    <div class="drag-page">
        <alike-divider>拖动排序</alike-divider>

        <alike-line type="white" height="1000px"></alike-line>
        <alike-drag-view :limits="true" :z-index="9" @change="changeDragView">
            <div class="rect-view"></div>
        </alike-drag-view>
    </div>
</template>

<script>
import alikeDragView from '../../packages/drag-view/drag-view'
export default {
    name:"Drag",
    components:{
        alikeDragView
    },
    methods:{
        changeDragView(e){
            console.log('实时监听元素拖动位置：',e);
        }
    }
}
</script>

<style lang="scss" scoped>
    .rect-view{
        width:200px;
        height:200px;
        background-color:rgba(162, 188, 234,.5);
    }
</style>