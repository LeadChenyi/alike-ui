<template>
    <div class="scroll-page">
        <alike-scroll-view @scrolltolower="scrolltolower">
            <div class="cell-item" v-for="(item,index) in articles" :key="index">
                {{item.text}}
            </div>
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