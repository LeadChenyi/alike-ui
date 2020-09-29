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
             * 业务逻辑：每秒走多少步，多少秒走完，这种场景不适合用（requestAnimationFrame/cancelAnimationFrame）因为无法自定义持续时间
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