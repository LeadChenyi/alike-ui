<template>
    <div class="scroll-view-page">
        <div class="alike-scroll-view" @scroll="getScroll">
            <div class="alike-cell__item" v-for="(item,index) in articles" :key="index">
                {{item.text}}
            </div>
        </div>
    </div>
</template>

<script>
/**
 * 如何求出加载更多：
 * 公式1：(滚动值 + 滚动元素的高) >= 滚动容量的高
 * 公式2：(滚动值 + 滚动元素的高) >= (最后元素的偏移顶部值 + 最后元素的高)
 */
export default {
    name:"ScrollView",
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
        getScroll(e){
            // console.log('已滚动的距离：',e.srcElement.scrollTop);
            // console.log('滚动元素的高：',e.srcElement.offsetHeight);
            // console.log('滚动容量的高：',e.srcElement.scrollHeight);
            if(this.isThrottleLoadmore){
                return false;
            }

            if((e.srcElement.scrollTop + e.srcElement.offsetHeight) >= e.srcElement.scrollHeight){
                console.log('加载中...');
                this.isThrottleLoadmore = true;
                this.initData();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-scroll-view{
        width:375px;height:600px;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;background-color:#f8f8f8;

        &::-webkit-scrollbar{
            width:8px;
            transform:width 300ms ease;
        }
        // 滚动条拇指
        &:hover::-webkit-scrollbar-thumb{
            background-color: rgba(135, 135, 135, 0.4);
            border-radius:8px;
        }
        // 滚动条轨迹
        &:hover::-webkit-scrollbar-track{
            background-color: rgba(135, 135, 135, 0.1);
        }

        & .alike-cell__item{
            padding:10px;
        }
    }
</style>