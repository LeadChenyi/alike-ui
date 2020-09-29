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
                    <p>俺老孙老也，都给我闪开</p>
                    <p>俺老孙老也，都给我闪开</p>
                </div>
            </alike-collapse-item>            
            <alike-collapse-item title="沉香救母" name="2">
                <div>
                    <p>劈开华山，唯我独尊</p>
                    <p>劈开华山，唯我独尊</p>
                    <p>劈开华山，唯我独尊</p>
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
        <alike-dropdown type="button" @change="changeDropdown">
            下拉菜单
            <alike-dropdown-menu>
                <alike-dropdown-item name="baidu">百度</alike-dropdown-item>
                <alike-dropdown-item name="ali">阿里</alike-dropdown-item>
                <alike-dropdown-item name="tencent">腾讯</alike-dropdown-item>
            </alike-dropdown-menu>
        </alike-dropdown>       

        <alike-dropdown type="button" @change="changeDropdown">
            下拉列表
            <alike-dropdown-menu>
                <alike-dropdown-item name="baidu">百度列表</alike-dropdown-item>
                <alike-dropdown-item name="ali">阿里列表</alike-dropdown-item>
                <alike-dropdown-item name="tencent">腾讯列表</alike-dropdown-item>
            </alike-dropdown-menu>
        </alike-dropdown>

        <alike-divider>preview 图片预览</alike-divider>
        <div class="photo-wrap">
            <div class="photo-item" v-for="(item,index) in photos" :key="index" @click="chooseImage(photos,item)">
                <img class="photo-item__image" :src="item" alt="">
            </div>
        </div>

        <alike-preview ref="previewFinder" :urls="previewUrls" :current="previewCurrent" :mask-close="true"></alike-preview>

        <alike-line type="white" height="1000px"></alike-line>

        <alike-divider>image 图片器</alike-divider>
        <alike-image src="http://cloud7.galloping.xyz/photo_006.jpg" width="300" height="300" :original="false" :lazyLoad="true"></alike-image>
    </div>
</template>

<script>
import alikeCollapse from '../../../packages/collapse/collapse'
import alikeCollapseItem from '../../../packages/collapse/collapse-item'
import alikePopup from '../../../packages/popup/popup'
import alikeDropdown from '../../../packages/dropdown/dropdown'
import alikeDropdownMenu from '../../../packages/dropdown/dropdown-menu'
import alikeDropdownItem from '../../../packages/dropdown/dropdown-item'
import alikePreview from '../../../packages/preview/preview'
import alikeImage from '../../../packages/image/image'

export default {
    name:"Basic",
    components:{
        alikeCollapse,
        alikeCollapseItem,
        alikePopup,
        alikeDropdown,
        alikeDropdownMenu,
        alikeDropdownItem,
        alikePreview,
        alikeImage
    },
    data(){
        return {
            collapseAccordion:true,
            collapseActive:'0',
            navs:['JavaScript','UniApp','MiniProgram'],
            navActive:0,
            navAttrs:[],
            navIndicatorX:0,
            photos:[
                "http://cloud7.galloping.xyz/photo_001.jpg",
                "http://cloud7.galloping.xyz/photo_002.jpg",
                "http://cloud7.galloping.xyz/photo_003.jpg",
                "http://cloud7.galloping.xyz/photo_004.jpg",
                "http://cloud7.galloping.xyz/photo_005.jpg"
            ],
            previewUrls:[],
            previewCurrent:""
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
        },
        changeDropdown(detail){
            console.log('changeDropdown',detail);
        },
        chooseImage(urls,current){
            console.log('chooseImage：',urls,current);
            this.previewUrls = urls;
            this.previewCurrent = current;
            this.$refs.previewFinder.open();
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

    .photo-wrap{
        display:flex;flex-wrap:wrap;
        & .photo-item{
            width:100px;height:100px;border-radius:1px;margin-right:10px;cursor:pointer;
            & .photo-item__image{
                width:100%;height:100%;border-radius:1px;
            }
        }
    }
</style>