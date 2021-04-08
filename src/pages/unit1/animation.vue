<template>
    <div class="animation-page">
        <alike-divider>again 多段动画</alike-divider>
        <div class="transform-view"></div>
        <div>在未设定延迟动画情况下：设置多个animation等同于在一个keyframes中设置多个属性</div>
        <div>如果多个animation都设置无限循环，那么前者animation将全部失效</div>
        <alike-divider>round 环绕动画</alike-divider>
        <div class="rect-view"></div>
        <div class="circle-view"></div>

        <alike-divider>repeat 大波浪动画</alike-divider>
        <div class="water-view">
            <div class="water-view__item water-view__item-v1"></div>
            <div class="water-view__item water-view__item-v2"></div>
        </div>

        <alike-divider>frame 序列帧动画</alike-divider>
        <div class="frame-image">
            <div class="frame-image__item frame-image__item-v1"></div>
            <div class="frame-image__item frame-image__item-v2"></div>
            <div class="frame-image__item frame-image__item-v3"></div>
            <div class="frame-image__item frame-image__item-v4"></div>
        </div>

        <alike-divider>loop 水果机</alike-divider>
        <div class="fruit-view">
            <div class="fruit-scroll" style="transform:translateY(0px)">
                <div class="fruit-item" :class="['fruit-item_s'+item]" v-for="(item,index) in fruits" :key="index">
                    <img :src="require(`@/assets/img/fruit/fruit_00${item}.png`)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Animation",
    data(){
        return {
            fruits:[1,2,3,4,5,6,7,1]
        }
    }
}
</script>

<style lang="scss" scoped>
    .transform-view{
        width:100px;
        height:100px;
        margin:0 auto;
        border-radius:5px;
        background-color:#f7563a;
        // animation:aniLove 1s cubic-bezier(.22,.18,.72,.88) 0s infinite;
        animation:aniTwist 1s linear 0s,aniLove 1s cubic-bezier(.22,.18,.72,.88) 1s infinite;
    }


    .frame-image__item{
        display:inline-block;margin-right:20px;
    }

    .frame-image__item-v1{
        width:80px;
        height:100px;
        background-image:url('../../assets/img/ani_001.png');
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
        background-image:url('../../assets/img/ani_002.png');
        background-position:0 0;
        background-size:1900px 240px;
        background-repeat:no-repeat;
        animation:aniHorizontal 1s steps(9) infinite;
    }    
    
    .frame-image__item-v3{
        width:264px;
        height:130px;
        background-image:url('../../assets/img/ani_003.png');
        background-position:0 0;
        background-size:264px 780px;
        background-repeat:no-repeat;
        animation:aniVertical 600ms steps(5) infinite;
    }
    .frame-image__item-v4{
        width:220px;
        height:100px;
        background-image:url('../../assets/img/ani_003.png');
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
            background-image:url('../../assets/img/water_001.svg');
            animation:aniHorizontal 3.5s linear infinite;
        }        
        & .water-view__item-v2{
            background-image:url('../../assets/img/water_002.svg');
            animation:aniHorizontal 6s linear infinite;
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

    @keyframes aniLove {
        0%{
            transform:scale(0.5);
        }
        50% {
            transform:scale(1);
        }
        100% {
            transform:scale(0.5);
        }
	}    
    @keyframes aniTwist {
        0%{
            transform:skewX(0deg);
        }
        50% {
            transform:skewX(180deg);
        }
        100% {
            transform:skewX(0deg);
        }
	}

    .fruit-view{
        position:relative;
        width:200px;
        height:200px;
        overflow:hidden;
    }
    .fruit-scroll{
        position:absolute;
        top:0;
        left:0;
        width:200px;
        animation:aniHu 5s linear infinite;
    }
    .fruit-item{
        width:200px;
        height:200px;
        box-sizing:border-box;
    }
    .fruit-item img{
        width:100%;
        height:100%;
        vertical-align:bottom;
    }
    @keyframes aniHu {
        0% {
            transform:translateY(0px);
        }

        100% {
            transform:translateY(-1400px);
        }
    }
</style>