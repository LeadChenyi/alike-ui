<template>
    <div class="drag-page">
        <div style="height:1500px"></div>
        <alike-draggable :limits="true" :z-index="9" @change="changeDraggable">
            <div class="rect-view"></div>
        </alike-draggable>
    </div>
</template>

<script>
import alikeDraggable from '../../packages/draggable/draggable'
export default {
    name:"Drag",
    components:{
        alikeDraggable
    },
    methods:{
        changeDraggable(e){
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