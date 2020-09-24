<template>
    <div class="banner-page">
        <alike-divider>全景图</alike-divider>
        <div class="panorama-container" ref="panoramaContainerFinder">
            <div class="panorama-wrap" :style="[{transform:`translateX(${x}px)`}]" ref="panoramaWrapFinder">
                <img ref="panoramaItemFinder" class="panorama-item" v-for="(item,index) in panoramas" :key="index" :src="item">
            </div>
        </div>

        <alike-button @click="togglePanorama">{{autoPlay?'暂停':'播放'}}</alike-button>

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
        <div ref="swiperContainerFinder" class="swiper-container">
            <div ref="swiperWrapFinder" class="swiper-wrap" :style="{transition:swiperTransition,transform:`translate3d(${swiperX}px,0,0)`}">
                <div class="swiper-item" :class="[swiperActive == index?'swiper-item--active':'']" v-for="(item,index) in swipers" :key="index" @click="changeSwiper(index)">
                    <img :src="item" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Banner",
    data(){
        return {
            panoramas:[
                require('@/assets/img/panorama_horizontal.jpg'),
                require('@/assets/img/panorama_horizontal.jpg')
            ],
            containerAttr:null,
            duration:1000,      // 播放时间
            frame:60,           // 播放帧
            speed:10,            // 播放速度
            x:0,
            timer:null,
            autoPlay:false,
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
                require('@/assets/img/banner/banner_005.jpg'),
                require('@/assets/img/banner/banner_001.jpg')
            ],
            swiperActive:0,
            swiperTimer:null,
            swiperTimerFirst:null,
            swiperTransition:"transform 300ms ease",
            swiperX:0,
            swiperWidth:0
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.initPanorama();
            // this.initWheel();
            this.initSwiper();
        })
        
    },
    methods:{
        initPanorama(){
            this.containerAttr = {
                width:this.$refs.panoramaContainerFinder.offsetWidth,
                height:this.$refs.panoramaContainerFinder.offsetHeight,
            }
            // console.log(this.containerAttr);
            // 想要拿到元素的集合，在指定ref时必须通过v-for遍历DOM
            // console.log(this.$refs.panoramaItemFinder.length);

            this.$refs.panoramaWrapFinder.style.width = this.containerAttr.width * this.$refs.panoramaItemFinder.length + 'px';
            this.$refs.panoramaWrapFinder.style.height = this.containerAttr.height + 'px';

            for(let i = 0;i < this.$refs.panoramaItemFinder.length;i++){
                this.$refs.panoramaItemFinder[i].style.width = this.containerAttr.width + 'px';
                this.$refs.panoramaItemFinder[i].style.height = this.containerAttr.height + 'px';
                this.$refs.panoramaItemFinder[i].style.left = this.containerAttr.width * i + 'px';
            }

            if(this.autoPlay){
                this.playPanorama();
            }
        },
        playPanorama(){
            this.timer = setInterval(() => {
                this.x -= this.speed;
                if(this.x <= -(this.containerAttr.width - 1)){
                    this.x = 0;
                }

                // 停止播放
                if(!this.autoPlay){
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }, this.duration / this.frame);
        },
        togglePanorama(){
            this.autoPlay = !this.autoPlay;
            if(this.autoPlay){
                this.playPanorama();
            }
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
            // 考虑自动轮播：1、2、3、4、5、1
            // 考虑左右轮播：5、1、2、3、4、5、1
            this.swiperWidth = this.$refs.swiperContainerFinder.offsetWidth;
            clearInterval(this.swiperTimer);
            this.swiperTimer = setInterval(()=>{
                this.swiperActive++;
                this.swiperTransition = 'transform 300ms ease';
                this.swiperX = -(this.swiperWidth * this.swiperActive);
                
                if(this.swiperActive == (this.swipers.length - 1)){
                    clearTimeout(this.swiperTimerFirst);
                    this.swiperTimerFirst = setTimeout(() => {
                        this.swiperActive = 0;
                        this.swiperTransition = 'transform 0s ease';
                        this.swiperX = 0;
                    }, 500);
                }
            },2000)
        },
        changeSwiper(){

        }
    }
}
</script>

<style lang="scss" scoped>
    .panorama-container{
        width:658px;height:308px;position:relative;overflow:hidden;

        & .panorama-wrap{
            position:relative;

            & .panorama-item{
                position:absolute;
                top:0;
            }
        }
    }

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
    
    .swiper-container{
        position:relative;overflow:hidden;
        width:523px;
        height:208px;
        
        & .swiper-wrap{
            position:relative;
            width:100%;
            height:100%;
            display:flex;
            box-sizing: content-box;
        }
        & .swiper-item{
            width:100%;
            height:100%;
        }
    }
</style>