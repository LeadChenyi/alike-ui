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

        <alike-divider>popup 弹窗</alike-divider>
        <alike-button @click="centerPopup">center</alike-button>
        <alike-popup ref="centerPopupFinder" @change="changeCenterPopup">
            <div>忘了是什么时候开始</div>
        </alike-popup>


        <alike-divider>dropdown 下拉菜单</alike-divider>
        <div class="dropdown">
            <div class="meui-dropdown-btn" data-type="dropdown-menu" data-trigger="click">
                click更多
            </div>

            <div class="meui-dropdown-menu-panel arrow-top" data-yield="true">
                <a href="https://www.baidu.com" class="meui-dropdown-menu__item">百度</a>
                <a href="https://www.taobao.com" class="meui-dropdown-menu__item">淘宝</a>
                <a href="https://www.jd.com" class="meui-dropdown-menu__item">京东</a>
            </div>
        </div>

    </div>
</template>

<script>
import alikePopup from '../../packages/popup/popup'
import alikeCollapse from '../../packages/collapse/collapse'
import alikeCollapseItem from '../../packages/collapse-item/collapse-item'
export default {
    name:"Basic",
    components:{
        alikePopup,
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
        },
        centerPopup(){
            this.$refs.centerPopupFinder.open();
        },
        changeCenterPopup(detail){
            console.log('changeCenterPopup：',detail);
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

    .meui-dropdown-btn{position:relative;display:inline-block;line-height:1;white-space:nowrap;cursor:pointer;-webkit-appearance:none;text-align:center;box-sizing:border-box;outline:none;margin:0;transition:.1s;font-weight:500;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:12px 20px;font-size:14px;border-radius:4px;color:#fff;background-color:#409eff;border-color:#409eff}
    .meui-dropdown-menu-panel{position:absolute;top:0;left:0;padding:10px 0;margin:10px 0;background-color:#fff;border:1px solid #ebeef5;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);z-index:10}
    .meui-dropdown-menu__item{display:block;list-style:none;line-height:36px;padding:0 20px;margin:0;font-size:14px;color:#606266;cursor:pointer;outline:none}
    .meui-dropdown-menu__item:hover{color:#409eff;background-color:#ECF5FF}
    .meui-dropdown-menu-panel.arrow-top:before,.meui-dropdown-menu-panel.arrow-top:after{content:"";position:absolute;top:-10px;left:50%;margin-left:-10px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;}
    .meui-dropdown-menu-panel.arrow-top:before{border-bottom:10px solid #e6e6e6;}
    .meui-dropdown-menu-panel.arrow-top:after{top:-9px;border-bottom:10px solid #ffffff;}
    .meui-dropdown-menu-panel.arrow-bottom:before,.meui-dropdown-menu-panel.arrow-bottom:after{content:"";position:absolute;bottom:-10px;left:50%;margin-left:-10px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;}
    .meui-dropdown-menu-panel.arrow-bottom:before{border-top:10px solid #e6e6e6;}
    .meui-dropdown-menu-panel.arrow-bottom:after{bottom:-9px;border-top:10px solid #ffffff;}
</style>