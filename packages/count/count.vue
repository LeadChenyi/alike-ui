<template>
    <div class="alike-count">{{count}}</div>
</template>

<script>
export default {
    name:"alike-count",
    props:{
        startValue:{
            type:Number,
            default:1
        },
        endValue:{
            type:Number,
            default:100
        },
        duration:{
            type:Number,
            default:3000
        }
    },
    data(){
        return {
            count:this.startValue,
            countTimer:null,
            speed:1
        }
    },
    mounted(){
        this.runCount();
    },
    methods:{
        runCount(){
            /**
             * 每秒的动画函数不适合设置可持续时间的业务场景
             * cancelAnimationFrame
             * requestAnimationFrame
             */

            // 速度 = 路程 / 时间
            this.speed = Math.floor((this.endValue - this.startValue) / (1000 / 60));

            this.countTimer = setInterval(()=>{
                this.count+= this.speed;
                
                if(this.count >= this.endValue){
                    this.count = this.endValue;
                    clearInterval(this.countTimer);
                    this.countTimer = null;
                }

                if(this.count == this.endValue){
                    this.$emit('finish')
                }
            },this.duration / 60)
        }
    }
}
</script>

<style>

</style>