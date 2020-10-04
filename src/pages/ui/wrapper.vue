<template>
    <div class="wrapper-page">
        <alike-divider>menu 菜单</alike-divider>
        <alike-menu @change="changeMenu">
            <alike-menu-item title="导航1">
                <alike-menu-item title="导航1-1">
                    <alike-menu-item>导航1-1-1</alike-menu-item>
                    <alike-menu-item>导航1-1-2</alike-menu-item>
                </alike-menu-item>
                <alike-menu-item>导航1-2</alike-menu-item>
            </alike-menu-item>
            <alike-menu-item>导航2</alike-menu-item>
            <alike-menu-item>导航3</alike-menu-item>
        </alike-menu>

        <alike-divider>Collapse 折叠面板</alike-divider>
        <alike-collapse :active="0" :accordion="collapseAccordion" @change="changeCollapse">
            <alike-collapse-item title="哪吒闹海">
                <div>
                    <p>是他就是他我们的朋友小哪吒</p>
                    <p>是他就是他我们的朋友小哪吒</p>
                    <p>是他就是他我们的朋友小哪吒</p>
                </div>
            </alike-collapse-item>            
            <alike-collapse-item title="大闹天宫">
                <div>
                    <p>俺老孙老也，都给我闪开</p>
                    <p>俺老孙老也，都给我闪开</p>
                    <p>俺老孙老也，都给我闪开</p>
                    <p>俺老孙老也，都给我闪开</p>
                    <p>俺老孙老也，都给我闪开</p>
                </div>
            </alike-collapse-item>            
            <alike-collapse-item title="沉香救母">
                <div>
                    <p>劈开华山，唯我独尊</p>
                    <p>劈开华山，唯我独尊</p>
                    <p>劈开华山，唯我独尊</p>
                </div>
            </alike-collapse-item>
        </alike-collapse>

        <alike-divider>swiper-action 左滑操作</alike-divider>
        <alike-swiper-action>
            <alike-swiper-action-item>
                <div class="alike-list-item">
                    天干物燥，小心火烛
                </div>
            </alike-swiper-action-item>            
            <alike-swiper-action-item>
                <div class="alike-list-item">
                    人生百态，好生走路
                </div>
            </alike-swiper-action-item>
        </alike-swiper-action>
    </div>
</template>

<script>
import alikeMenu from '../../../packages/menu/menu'
import alikeMenuItem from '../../../packages/menu/menu-item'
import alikeCollapse from '../../../packages/collapse/collapse'
import alikeCollapseItem from '../../../packages/collapse/collapse-item'
import alikeSwiperAction from '../../../packages/swiper-action/swiper-action'
import alikeSwiperActionItem from '../../../packages/swiper-action/swiper-action-item'
export default {
    name:"Wrapper",
    components:{
        alikeMenu,
        alikeMenuItem,
        alikeCollapse,
        alikeCollapseItem,
        alikeSwiperAction,
        alikeSwiperActionItem
    },
    data(){
        return {
            collapseAccordion:true,
            collapseActive:'1',
        }
    },
    methods:{
        changeCollapse(detail){
            console.log('changeCollapse：',detail);
        },
        changeMenu(detail){
            console.log('changeMenu：',detail);
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-list-item{
        display: flex;
        box-sizing: border-box;
        padding: 10px;
        height: 40px;
        background-color: #f8f8f8;
        align-items: center;
        &:hover{
            background-color: #e8e8e8;
        }
    }
</style>