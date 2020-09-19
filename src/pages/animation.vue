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

        <div class="hover-logo">
            <div class="hover-logo__item hover-logo__item-v1"></div>
            <div class="hover-logo__item hover-logo__item-v2"></div>
            <div class="hover-logo__item hover-logo__item-v3"></div>
        </div>

        <div class="hover-image">
            <div class="hover-image__item hover-image__item-v1">
                <img src="@/assets/img/ad_001.jpg" alt="">
            </div>
            <div class="hover-image__item hover-image__item-v2">
                <img src="@/assets/img/game_001.png" alt="">
            </div>
        </div>

        <div class="hover-video">
            <img src="@/assets/img/video_001.jpg" alt="">
            <div class="hover-video__mask"></div>
            <div class="hover-video__btn"></div>
        </div>

        <div class="hover-sidebar">
            <div class="sidebar-nav">
                <div class="sidebar-nav__item">
                    <alike-icon type="like" size="24px"></alike-icon>
                    <div class="sidebar-nav__item-text">感兴趣</div>
                </div>                
                <div class="sidebar-nav__item">
                    <alike-icon type="like" size="24px"></alike-icon>
                    <div class="sidebar-nav__item-text">感兴趣</div>
                </div>                
                <div class="sidebar-nav__item">
                    <alike-icon type="like" size="24px"></alike-icon>
                    <div class="sidebar-nav__item-text">感兴趣</div>
                </div>
            </div>
        </div>

        <alike-divider>frame 序列帧动画</alike-divider>
        <div class="frame-image">
            <div class="frame-image__item frame-image__item-v1"></div>
            <div class="frame-image__item frame-image__item-v2"></div>
            <div class="frame-image__item frame-image__item-v3"></div>
            <div class="frame-image__item frame-image__item-v4"></div>
        </div>

        <alike-divider>round 环绕动画</alike-divider>
        <div class="rect-view"></div>
        <div class="circle-view"></div>

        <alike-divider>repeat 大波浪动画</alike-divider>
        <div class="water-view">
            <div class="water-view__item water-view__item-v1"></div>
            <div class="water-view__item water-view__item-v2"></div>
        </div>

        <img class="back-top" @click="toBackTop" :class="[isShowBackTop ? 'back-top--active':'']" src="@/assets/img/backtop.png" alt="">
    </div>
</template>

<script>
export default {
    name:"Animation",
    data(){
        return {
            limitBackTop:100,
            isShowTitle:true,
            isShowBackTop:false
        }
    },
    mounted(){
        document.addEventListener('scroll',()=>{
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            
            if(scrollTop >= this.limitBackTop){
                this.isShowBackTop = true;
            }else{
                this.isShowBackTop = false;
            }
        })
    },
    methods:{
        toggleTitle(){
            this.isShowTitle = !this.isShowTitle;
        },
        toBackTop(){
            if(!this.isShowBackTop){
                return false;
            }

            // window.scrollTo(0,0);
            // document.documentElement.scrollTop = document.body.scrollTop = 0;
            this.aniEaseBackTop();
        },
        aniEaseBackTop(duration = 50,speed = 2){
            let timer = setInterval(()=>{
                let currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                document.documentElement.scrollTop = document.body.scrollTop = currentScrollTop + Math.floor(-currentScrollTop / speed);
                if (currentScrollTop == 0) {
                    clearInterval(timer);
                    timer = null;
                }
            },duration);
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
    .hover-logo__item-v1{
        &:hover{
            background-position:-640px 0;
        }
    }

    /* 过度切换 */
    .hover-logo__item-v2{
        transition:background-position 300ms ease;

        &:hover{
            background-position:-320px 0;
        }
    }

    /* 过度悬停 */
    .hover-logo__item-v3{
        transition:background-position 300ms ease;

        &:hover{
            background-position:0 -10px;
        }
    }

    .hover-image__item{
        width:300px;height:160px;display:inline-block;margin-right:20px;border-radius:10px;position:relative;overflow:hidden;cursor:pointer;
        
        &.hover-image__item-v1{
            & img{
                width:100%;height:100%;border-radius:10px;
            }

            &:before{
                transition:opacity 300ms ease-in-out;
                content:"";position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.2);opacity:0;
            }

            &:hover:before{
                opacity:1;
            }
        }

        &.hover-image__item-v2{
            & img{
                width:100%;height:100%;border-radius:10px;
                transform:scale(1);
                transition:transform 300ms ease-in-out;
            }

            &:hover img{
                transform:scale(1.1);
            }
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

    .sidebar-nav{
        width:50px;
        text-align:center;
        font-size:14px;
        color:#ffffff;
        transition:all 300ms ease;

        &:hover{
            width:70px;
            color:#333333;
        }

        & .sidebar-nav__item{
            margin-bottom:10px;
            cursor:pointer;
        }
    }
    .frame-image__item{
        display:inline-block;margin-right:20px;
    }

    .frame-image__item-v1{
        width:80px;
        height:100px;
        background-image:url('../assets/img/ani_001.png');
        background-position:0 0;
        background-size:640px 100px;
        background-repeat:no-repeat;
        cursor:pointer;

        &:hover{
            animation:aniHorizontal 800ms steps(7) infinite;
        }
    }

    .frame-image__item-v2{
        width:190px;
        height:240px;
        background-image:url('../assets/img/ani_002.png');
        background-position:0 0;
        background-size:1900px 240px;
        background-repeat:no-repeat;
        animation:aniHorizontal 1s steps(9) infinite;
    }    
    
    .frame-image__item-v3{
        width:264px;
        height:130px;
        background-image:url('../assets/img/ani_003.png');
        background-position:0 0;
        background-size:264px 780px;
        background-repeat:no-repeat;
        animation:aniVertical 600ms steps(5) infinite;
    }
    .frame-image__item-v4{
        width:220px;
        height:100px;
        background-image:url('../assets/img/ani_003.png');
        background-position:0 0;
        background-size:220px 600px;
        background-repeat:no-repeat;
        animation:aniVertical 600ms steps(5) infinite;
    }

    .rect-view{
        position:relative;
        width: 200px;
        height: 200px;
        margin: 50px auto;
        border:2px solid rgba(105, 202, 98, 1);
        border-radius:4px;
    
        &:before,&:after{
            content:" ";
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index:0;
            margin: -10px;
            border:3px solid rgba(105, 202, 98, 0.5);
            border-radius:6px;
            animation:aniClipRound 8s linear infinite;
        }

        &:before {
            animation-delay:-4s;
        }

        &:hover:before,&:hover:after{
            background-color: rgba(255, 0, 0, 0.3);
        }
    }

    .circle-view {
        width:200px;
        height:200px;
        margin:0 auto;
        border-radius:50%;
        border:1px solid #ffff00;
        border-top-color:#ff0000;
        border-bottom-color:#ff0000;
        animation:aniEmbattle 1s linear infinite;
    }

    .water-view{
        width:100%;
        height:60px;
        position:relative;
        background-color:#3485FB;

        & .water-view__item{
            position:absolute;
			width:100%;
			height:100%;
            background-position:0 0;
            background-repeat:repeat-x;
            background-size:640px 100px;
        }
        & .water-view__item-v1{
            background-image:url('../assets/img/water_001.svg');
            animation:aniHorizontal 3.5s linear infinite;
        }        
        & .water-view__item-v2{
            background-image:url('../assets/img/water_002.svg');
            animation:aniHorizontal 6s linear infinite;
        }
    }

    .back-top{
        position:fixed;
        bottom:100px;
        right:0;
        width:98px;
        height:178px;
        transform:translateX(38px);
        transition:transfrom 300ms ease;

        &.back-top--active{
            cursor:pointer;
            transform:translateX(0);
        }
    }
    

    @keyframes aniHorizontal {
        0% {
            background-position:0 0;
        }

        100% {
            background-position:100% 0;
        }
    }    
    
    @keyframes aniVertical {
        0% {
            background-position:0 0%;
        }

        100% {
            background-position:0 100%;
        }
    }
    
    @keyframes aniClipRound {
        0%, 100% {
            clip: rect(0px, 220px, 2px, 0px);
        }
        25% {
            clip: rect(0px, 2px, 220px, 0px);
        }
        50% {
            clip: rect(218px, 220px, 220px, 0px);
        }
        75% {
            clip: rect(0px, 220px, 220px, 218px);
        }
    }
    
    @keyframes aniRotate{
		0% {
            transform:rotate(0deg);
        } 		
        100% {
            transform:rotate(360deg);
        } 
	}

    @keyframes aniEmbattle {
        0%{
            transform:scale(0.1) rotate(0deg);
        }
        100% {
            transform:scale(1) rotate(360deg);
        }
	} 
</style>