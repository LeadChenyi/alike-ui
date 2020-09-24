<template>
  <div class="mouse-page">
        <alike-divider>元素鼠标移动</alike-divider>
        <alike-movable-view left="100px" top="100px" :enable-range="true" :z-index="9" @change="changeMovable" @finish="finishMovable">
            <div class="rect-view">可移动的元素</div>
        </alike-movable-view>
        <alike-line type="white" height="1000px"></alike-line>
  </div>
</template>

<script>
import alikeMovableView from '../../packages/movable-view/movable-view'

export default {
    name:"Mouse",
    components:{
        alikeMovableView
    },
    methods:{
        changeMovable(detail){
            console.log('监听元素移动时位置：',detail);
        },
        finishMovable(detail){
            console.log('监听元素移动完成时位置：',detail);
        }
    }
}
</script>

<style lang="scss" scoped>
    .rect-view{
        width:200px;
        height:200px;
        line-height:200px;
        text-align:center;
        color:#409EFF;
        background-color:#409EFF;
        user-select:none;

        &:hover{
            color:#ffffff;
        }
    }
</style>