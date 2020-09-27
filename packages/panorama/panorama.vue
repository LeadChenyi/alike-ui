<template>
    <div class="alike-panorama" :style="{width:width,height:height}">
        <div ref="wrapFinder" class="alike-panorama-wrap" :style="{transform:`translateX(${translateX}px)`}">
            <img ref="itemFinder" class="alike-panorama__image" v-for="(item,index) in urls" :key="index" :src="item">
        </div>
    </div>
</template>

<script>
export default {
    name:"alike-panorama",
    props:{
        panoramas:{
            type:Array,
            default:()=>[]
        },
        width:{
            type:String,
            default:"600px"
        },
        height:{
            type:String,
            default:"300px"
        },        
        viewport:{
            type:Number,
            default:1
        },
        direction:{
            type:String,
            default:"left"
        },
        duration:{
            type:Number,
            default:1000
        },
        speed:{
            type:Number,
            default:60
        },
        step:{
            type:Number,
            default:1
        },
        autoplay:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            urls:[],
            timer:null,
            translateX:0
        }
    },
    mounted(){
        this.initPanorama();
    },
    methods:{
        initPanorama(){
            this.urls = this.panoramas;
            if(this.direction == 'left'){
                // 从右向左无缝轮播，则克隆第一张放置末尾
                if(this.viewport && this.viewport < this.panoramas.length){
                    for(let i = 0;i < this.viewport;i++){
                        this.urls.push(this.panoramas[i]);
                    }
                }
                this.translateX = 0;
            }else if(this.direction == 'right'){
                // 从左向右无缝轮播，则克隆第最后一张放置开头
                if(this.viewport && this.viewport < this.panoramas.length){
                    for(let i = 1;i < (this.viewport + 1);i++){
                        this.urls.unshift(this.panoramas[this.panoramas.length - i]);
                    }
                }
                this.translateX = -this.$el.offsetWidth;
            }

            if(this.viewport > 1 && this.viewport < this.panoramas.length){
                this.$el.style.width = parseInt(this.width) * this.viewport + 'px';
                this.$refs.wrapFinder.style.width = this.width;
            }

            if(this.autoplay){
                this.runPanorama();
            }
        },
        runPanorama(){
            this.timer = setInterval(() => {
                if(this.direction == 'left'){
                    this.translateX = Math.floor(this.translateX - this.step);
                    if(this.translateX <= -(parseInt(this.width) * (this.panoramas.length - this.viewport) - 1)){
                        this.translateX = 0;
                    }
                }else if(this.direction == 'right'){
                    this.translateX = Math.floor(this.translateX + this.step);
                    if(this.translateX > -1){
                        this.translateX = -(parseInt(this.width) * (this.panoramas.length - this.viewport) + 1);
                    }
                }

                if(!this.autoplay){
                    clearInterval(this.timer);
                    this.timer = null;
                }
                
                // frame = duration / speed （默认每秒16帧）           
            }, this.duration / this.speed); 
        }
    },
    watch:{
        autoplay(newVal,oldVal){
            if(newVal != oldVal){
                if(newVal){
                    this.runPanorama();
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-panorama{
        position:relative;overflow:hidden;

        .alike-panorama-wrap{
            position:relative;display:flex;width:100%;height:100%;

            .alike-panorama__image{
                width:100%;height:100%;
            }
        }
    }
</style>