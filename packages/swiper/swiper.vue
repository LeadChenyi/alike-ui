<template>
    <div class="alike-swiper" :style="{width:width,height:height}">
        <div class="alike-swiper-wrap" :style="{transition:swiperTransition,transform:`translate3d(${swiperTranslateX}px,0,0)`}">
            <div ref="itemFinder" class="alike-swiper-item" :class="[swiperActive == index?'alike-swiper-item--active':'']" v-for="(item,index) in swiperDatas" :key="index" @click="changeSwiper(index)">
                <img class="alike-swiper-item__image" :src="item" alt="">
            </div>
        </div>
    </div>
</template>

<script>
/**
 * alike-swiper
 * @describe 滑块视图容器
 * @website http://alike.galloping.xyz
 * @property swipers {Array} 数据对象
 * @property active {Number} 当前选中项
 * @property width {String} 根元素宽度
 * @property height {String} 根元素高度
 * @property duration {Number} 每次移动时间
 * @property autoplay {Boolean} 是否自动播放
 * @event change {Function} 当前选中项改变时触发
 */
export default {
    name:"alike-swiper",
    props:{
        swipers:{
            type:Array,
            default:()=>[]
        },
        active:{
            type:Number,
            default:0
        },
        width:{
            type:String,
            default:"600px"
        },
        height:{
            type:String,
            default:"300px"
        },
        duration:{
            type:Number,
            default:3000
        },
        autoplay:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            swiperDatas:[],
            swiperActive:this.active,
            swiperTimer:null,
            swiperFirstTimer:null,
            swiperTransition:"transform 300ms ease",
            swiperTranslateX:0
        }
    },
    mounted(){
        this.initSwiper();
    },
    methods:{
        initSwiper(){
            /**
             * 自动轮播：1、2、3、4、5、1
             * 可控制轮播：5、1、2、3、4、5、1
             */
            
            this.swiperDatas = [...this.swipers,this.swipers[0]]

            // 通过flex布局实现强制占一行，就无需再手动设置每个item元素的宽度了
            // if(this.$refs.itemFinder.length){ 
            //     for(let i=0;i < this.$refs.itemFinder.length;i++){
            //         this.$refs.itemFinder[i].style.width = this.width;
            //     }
            // }

            if(this.autoplay){
                this.runSwiper();
            }
        },
        runSwiper(){
            this.swiperTimer = setInterval(()=>{
                this.swiperActive++;
                this.swiperTransition = 'transform 300ms ease';
                this.swiperTranslateX = -(this.$el.offsetWidth * this.swiperActive);
                this.$emit('change',{value:this.swiperActive});

                if(this.swiperActive == (this.swiperDatas.length - 1)){
                    clearTimeout(this.swiperFirstTimer);
                    this.swiperFirstTimer = setTimeout(() => {
                        this.swiperActive = 0;
                        this.swiperTransition = 'transform 0s ease';
                        this.swiperTranslateX = 0;
                    }, 500);
                }

                if(!this.autoplay){
                    clearInterval(this.swiperTimer);
                    this.swiperTimer = null;
                }
            },this.duration)
        }
    },
    watch:{
        autoplay(newVal,oldVal){
            if(newVal != oldVal){
                if(newVal){
                    this.runSwiper();
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-swiper{
        position:relative;overflow:hidden;
        
        .alike-swiper-wrap{
            position:relative;
            width:100%;
            height:100%;
            display:flex;
            flex-wrap:nowrap;
            box-sizing: content-box;
        }
        .alike-swiper-item{
            width:100%;
            height:100%;
            flex:0 0 auto;
        }
        .alike-swiper-item__image{
            width:100%;
            height:100%;
        }
    }
</style>