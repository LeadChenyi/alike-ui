<template>
  <div class="mouse-page">
        <alike-movable-view left="100px" top="100px" :enable-range="true" :z-index="9" @change="changeMovable" @finish="finishMovable">
            <div class="rect-view">可移动的元素</div>
        </alike-movable-view>
        
        <alike-divider>自定义右键菜单</alike-divider>
        <alike-context @change="contextMenuChange">
            <div class="video-area"></div>
            <alike-context-menu>
                <alike-context-item name="shipin">视频源头</alike-context-item>
                <alike-context-item name="xianlu">播放线路</alike-context-item>
                <alike-context-item name="shuaxin">刷新页面</alike-context-item>
            </alike-context-menu>
        </alike-context>

        <alike-divider>滑块验证</alike-divider>
        <alike-slider-verify @change="changeSliderVerify" @finish="finishSliderVerify"></alike-slider-verify>

        <alike-line type="white" height="1000px"></alike-line>
  </div>
</template>

<script>
import alikeMovableView from '../../../packages/movable-view/movable-view'
import alikeContext from '../../../packages/context/context'
import alikeContextMenu from '../../../packages/context/context-menu'
import alikeContextItem from '../../../packages/context/context-item'
import alikeSliderVerify from '../../../packages/slider-verify/slider-verify'

export default {
    name:"Mouse",
    components:{
        alikeMovableView,
        alikeContext,
        alikeContextMenu,
        alikeContextItem,
        alikeSliderVerify
    },
    methods:{
        changeMovable(detail){
            // console.log('监听元素移动时位置：',detail);
        },
        finishMovable(detail){
            console.log('监听元素移动完成时位置：',detail);
        },
        contextMenuChange(detail){
            console.log('contextMenuChange：',detail)
        },
        changeSliderVerify(detail){
            console.log('changeSliderVerify：',detail);
        },
        finishSliderVerify(){
            console.log('finishSliderVerify：验证通过')
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

    .video-area{
        width:600px;
        height:300px;
        background-color:#8ca9f8;
    }
</style>