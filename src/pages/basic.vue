<template>
    <div class="basic-page">
        <alike-divider>Collapse 静态布局</alike-divider>
        <alike-collapse :active="collapseActive" :accordion="collapseAccordion">
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

        <alike-divider>Nav/Switch/Tab 导航栏</alike-divider>
        <div class="nav-wrap">
            <div ref="navItemFinder" class="nav-item" :class="[navActive == index?'nav-item--active':'']" v-for="(item,index) in navs" :key="index" @click="changeNav(index)">{{item}}</div>
            <div class="nav-indicator" :style="[{transform:`translateX(${navIndicatorX}px)`}]"></div>
        </div>
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
            collapseAccordion:true,
            collapseActive:'0',
            navs:['JavaScript','UniApp','MiniProgram'],
            navActive:0,
            navAttrs:[],
            navIndicatorX:0
        }
    },
    mounted(){
        this.getNavAttrs();
    },
    methods:{
        getNavAttrs(){
            for(let i = 0;i < this.$refs.navItemFinder.length;i++){
                this.navAttrs.push(this.$refs.navItemFinder[i].getBoundingClientRect());
            }
            // console.log(this.navAttrs[0].width);
        },
        changeNav(index){
            this.navActive = index;
            this.navIndicatorX = this.navAttrs[index].left;
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav-wrap{
        display: inline-block;
        border-radius: 30px;
        position: relative;
        overflow:hidden;
        background-color: #f2f2f2;

        & .nav-item{
            display: inline-block;
            position: relative;
            width: 150px;
            height: 60px;
            line-height: 60px;
            text-align:center;
            z-index: 2;
            cursor:pointer;

            &:hover{
                color:#ff8300;
            }
            &.nav-item--active{
                color:#ffffff;
            }

            &:hover.nav-item--active{
                color:#ffffff;
            }
        }
        
        & .nav-indicator{
            width: 150px;
            height: 60px;
            border-radius: 30px;
            background-color: #ff8300;
            box-shadow: 0 5px 16px 0 rgba(255, 144, 0, 0.58);
            position: absolute;
            top:0;
            left:0;
            z-index: 1;
            transition:transform 300ms ease-in-out;
        }
    }
</style>