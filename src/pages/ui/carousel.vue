<template>
    <div class="banner-page">
        <alike-divider>全景图</alike-divider>
        <alike-panorama :panoramas="panoramas" direction="right" width="500px" height="200px" :viewport="2" :autoplay="panoramaAutoplay" :step="3"></alike-panorama>
        <alike-button @click="togglePanorama">{{panoramaAutoplay?'暂停':'播放'}}</alike-button>

        <alike-divider>轮播图</alike-divider>
        <div ref="wheelContainerFinder" class="wheel-container">
            <div class="wheel-mian" id="wheel-main">
                <div ref="wheelItemFinder" class="wheel-item" v-for="(item,index) in wheels" :key="index">
                    <img class="wheel-item__image" :src="item" alt="">
                </div>
            </div>
            <div class="wheel-toggle" id="wheelToggleFinder">
                <div class="wheel-toggle-item wheel-toggle-item--prve" @click="prveWheel">左</div>
                <div class="wheel-toggle-item wheel-toggle-item--next" @click="nextWheel">右</div>
            </div>
            <div class="wheel-indicator" id="wheelIndicatorFinder">
                <div class="wheel-indicator-item" :class="[wheelActive == index ? 'wheel-indicator-item--active':'']" v-for="(item,index) in wheels" :key="index" @click="changeWheel(index)"></div>
            </div>
        </div>

        <alike-divider>无缝轮播图</alike-divider>
        <alike-swiper :swipers="swipers" :autoplay="true"></alike-swiper>
    </div>
</template>

<script>
import alikePanorama from '../../../packages/panorama/panorama'
import alikeSwiper from '../../../packages/swiper/swiper'

export default {
    name:"Banner",
    components:{
        alikePanorama,
        alikeSwiper
    },
    data(){
        return {
            panoramas:[
                require('@/assets/img/banner/banner_001.jpg'),
                require('@/assets/img/banner/banner_002.jpg'),
                require('@/assets/img/banner/banner_003.jpg')
            ],
            panoramaAutoplay:false,
            wheels:[
                require('@/assets/img/wheel/wheel_001.jpg'),
                require('@/assets/img/wheel/wheel_002.jpg'),
                require('@/assets/img/wheel/wheel_003.jpg'),
                require('@/assets/img/wheel/wheel_004.jpg'),
                require('@/assets/img/wheel/wheel_005.jpg')
            ],
            wheelActive:0,
            wheelTimer:null,
            wheelDuration:1000,
            wheelWidth:0,
            swipers:[
                require('@/assets/img/banner/banner_001.jpg'),
                require('@/assets/img/banner/banner_002.jpg'),
                require('@/assets/img/banner/banner_003.jpg'),
                require('@/assets/img/banner/banner_004.jpg'),
                require('@/assets/img/banner/banner_005.jpg')
            ],
            swiperActive:0
        }
    },
    methods:{
        togglePanorama(){
            this.panoramaAutoplay = !this.panoramaAutoplay;
        },
        initWheel(){
            this.wheelWidth = this.$refs.wheelContainerFinder.offsetWidth;
            clearInterval(this.wheelTimer);
            this.wheelTimer = setInterval(() => {
                this.animationWheel(this.$refs.wheelItemFinder[this.wheelActive],{left:-this.wheelWidth});
                this.wheelActive++;
                if(this.wheelActive > (this.wheels.length - 1)){
                    this.wheelActive = 0;
                }
                this.$refs.wheelItemFinder[this.wheelActive].style.left = this.wheelWidth +'px';
                this.animationWheel(this.$refs.wheelItemFinder[this.wheelActive],{left:0});
            }, this.wheelDuration);
        },
        getStyleAttr(obj,attr){
            return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj,null)[attr];
        },
        animationWheel(el,options){
            let startVal = 0;
            let targetVal = 0;
            let speed = 0;
            
            clearInterval(el.timer);
            el.timer = setInterval(()=>{
                // 判断是否完成动画
                let flag = true;

                for(let key in options){
                    // 强制转为整形，Number类型，自动去除不是数值的字符，如100px => 100
                    startVal = parseInt(this.getStyleAttr(el,key));     
                    targetVal = parseInt(options[key]);
                    // console.log(startVal,targetVal);

                    // 求出步长 = (目标值 - 起始值) * 缓动系数
                    speed = (targetVal - startVal) * 0.2;

                    // 防止数值出现偏差上下取整
                    if(targetVal > startVal){
                        speed = Math.ceil(speed);
                    }else{
                        speed = Math.floor(speed);
                    }

                    el.style[key] = startVal + speed +'px';

                    if(targetVal !== startVal){
                        flag = false;
                    }
                }

                if(flag){
                    clearInterval(el.timer);
                }
            },24);
        },
        playWheel(){

        },
        changeWheel(){

        },
        prveWheel(){

        },
        nextWheel(){

        },
        initSwiper(){
            
        },
        changeSwiper(){

        }
    }
}
</script>

<style lang="scss" scoped>
    .wheel-container{
        width:350px;height:180px;overflow:hidden;position:relative;margin:50px auto;
        
        & .wheel-mian{
            width:700px;height:180px;position:relative;
            & .wheel-item{
                position:absolute;top:0;left:350px;width:350px;height:100%;
                &:first-child{
                    left:0;
                }
            }
            & .wheel-item__image{width:100%;height:100%;}
        }

        & .wheel-toggle{
            position:absolute;top:45%;left:0;right:0;width:100%;color:#f2f2f2;font-size:20px;
            & .wheel-toggle-item{
                background-color:rgba(0,0,0,.3);
                &.wheel-toggle-item--prve{float:left;cursor:pointer;border-radius:0 3px 3px 0;}
                &.wheel-toggle-item--next{float:right;cursor:pointer;border-radius:3px 0 0 3px;}
            }
        }


        & .wheel-indicator{
            position:absolute;top:80%;left:0;right:0;width:100%;text-align:center;
            & .wheel-indicator-item{
                display:inline-block;width:20px;height:5px;margin:0 5px;background-color:#f2f2f2;border-radius:3px;cursor:pointer;
                &.wheel-indicator-item--active{background-color:#ee3148;}
            }
        }
    }
</style>