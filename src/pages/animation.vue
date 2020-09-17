<template>
    <div class="animation-page">
        <alike-divider>transition 标签动画</alike-divider>
        <alike-button @click="toggleTitle">{{isShowTitle ? '隐藏':'显示'}}</alike-button>
        <transition name="title-fade">
            <div v-if="isShowTitle" class="transition-title">这是一个段落。。。</div>
        </transition>

        <alike-divider>hover 悬停效果</alike-divider>
        <div class="hover-view">
            <div class="hover-view__text">这是一个段落。。。</div>
        </div>      

        <alike-line type="white"></alike-line>
        <div class="hover-logos">
            <div class="hover-logo__item hover-logo__item-v1"></div>
            <div class="hover-logo__item hover-logo__item-v2"></div>
            <div class="hover-logo__item hover-logo__item-v3"></div>
        </div>

        <div class="hover-image">
            <div class="hover-image__item-v1">
                <img src="@/assets/img/ad_001.jpg" alt="">
            </div>
            <div class="hover-image__item-v2">
                <img src="@/assets/img/game_001.png" alt="">
            </div>
        </div>

        <div class="hover-video">
            <img src="@/assets/img/video_001.jpg" alt="">
            <div class="hover-video__mask"></div>
            <div class="hover-video__btn"></div>
        </div>

        <div class="hover-sidebar">

        </div>
    </div>
</template>

<script>
/**
* 单张背景图用background-size:cover;
* 雪碧背景图用background-position:x y;（类似中心点向左上角位移，所以x y属性的值一定是0或小于0的负数值）    
*/
export default {
    name:"Animation",
        data(){
        return {
            isShowTitle:true
        }
    },
    methods:{
        toggleTitle(){
            this.isShowTitle = !this.isShowTitle;
        }
    }
}
</script>

<style lang="scss" scoped>
    /* 指定transition标签的过渡动画样式 */
    .title-fade-enter-active,.title-fade-leave-active{
        transition: all .3s ease;
    }
    .title-fade-enter,.title-fade-leave-to{
        transform: translateX(50px);
        opacity: 0;
    }

    /* 文本hover */
    .hover-view{
        display:flex;
        background-color:$alike-color-white;

        &:hover{
            background-color:$alike-color-default;
        }

        .hover-view__text{
            font-size:18px;
            color:$alike-color-primary;
        }
    }

    /* 图标hover */
    .hover-logo__item{
        display:inline-block;
        width:300px;height:160px;margin-right:20px;
        background-image:url('../assets/img/sprite_003.png');
        background-position:0 0;
        background-repeat:no-repeat;
        cursor:pointer;
    }
    /* 直接切换 */
    .hover-logo__item-v1:hover{
        background-position:-640px 0;
    }
    /* 过度切换 */
    .hover-logo__item-v2{
        transition:background-position 300ms ease;
    }
    .hover-logo__item-v2:hover{
        background-position:-320px 0;
    }
    /* 过度悬停 */
    .hover-logo__item-v3{
        transition:background-position 300ms ease;
    }
    .hover-logo__item-v3:hover{
        background-position:0 -10px;
    }  

    .hover-image__item-v1{
        width:522px;height:255px;border-radius:1px;position:relative;overflow:hidden;cursor:pointer;

        & img{
            width:100%;height:100%;border-radius:1px;
        }

        &:before{
            transition:opacity 300ms ease-in-out;
            content:"";position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.1);opacity:0;
        }

        &:hover:before{
            opacity:1;
        }
    }

    .hover-image__item-v2{
        width:300px;height:160px;border-radius:10px;position:relative;overflow:hidden;cursor:pointer;
        & img{
            width:100%;height:100%;border-radius:10px;
            transform:scale(1);
            transition:transform 300ms ease-in-out;
        }

        &:hover img{
            transform:scale(1.1);
        }
    }

    .hover-video{
        width:300px;height:160px;border-radius:10px;position:relative;overflow:hidden;cursor:pointer;

        & img{
            width:100%;height:100%;border-radius:10px;
        }
        & .hover-video__mask{
            position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.5);opacity:0;transition:opacity 300ms ease-in-out;
        }
        &:hover .hover-video__mask{
            opacity:1;
        }
        & .hover-video__btn{
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top:-25px; 
            margin-left:-25px;
            width: 50px;
            height: 50px;
            background-image:url('../assets/img/play.png');
            background-repeat:no-repeat;
            background-size:cover;
            transition:all 300ms ease-out;
            transform:scale(2);
            opacity:0;
        }
        &:hover .hover-video__btn{
            transform:scale(1);
            opacity:1;
        }
    }
</style>