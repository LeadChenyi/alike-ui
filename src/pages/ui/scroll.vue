<template>
    <div class="scroll-page">
        <alike-scroll-view height="625px" @scrolltolower="scrolltolower">
            <div class="cell-item" v-for="(item,index) in articles" :key="index">
                {{item.text}}
            </div>
        </alike-scroll-view>

        <alike-sticky top="20px">
            <alike-button type="primary">Sticky</alike-button>
        </alike-sticky>

        <alike-line type="white" height="500px"></alike-line>

        <alike-scroll-view id="innerContainer">
            <div class="cell-item" v-for="item in 30" :key="item">
                测试图片在内层滚动容器里的懒加载{{item}}
            </div>
            <alike-sticky scrollView="innerContainer">
                <alike-button type="primary">Inner Sticky</alike-button>
            </alike-sticky>
            <alike-line type="white" height="500px"></alike-line>
            <alike-image src="http://cloud7.galloping.xyz/photo_006.jpg" width="300" height="300" :original="false" :lazyLoad="true" scrollView="innerContainer"></alike-image>
        </alike-scroll-view>
    </div>
</template>

<script>
import alikeScrollView from '../../../packages/scroll-view/scroll-view'
export default {
    name:"Scroll",
    components:{
        alikeScrollView
    },
    data(){
        return {
            isThrottleLoadmore:false,
            articles:[]
        }
    },
    mounted(){
        this.initData();
    },
    methods:{
        initData(){
            this.$api.article.getArticles().then((res)=>{
                // console.log(res);
                if(res.data.data.length){
                    this.articles = [...this.articles,...res.data.data];
                    this.isThrottleLoadmore = false;
                }

            }).catch((err)=>{
                console.log(err);
            })
        },
        scrolltolower(e){
            if(this.isThrottleLoadmore){
                return false;
            }

            this.isThrottleLoadmore = true;
            this.initData();
        }
    }
}
</script>

<style lang="scss" scoped>
    .cell-item{
        padding:10px;
    }
</style>