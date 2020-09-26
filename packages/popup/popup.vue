<template>
    <div ref="alikePopupFinder" class="alike-popup" :id="identifier">
        <transition name="alike-fade">
            <div v-show="aniShow" class="alike-popup-mask" @click="handleMask"></div>
        </transition>
        <transition name="alike-zoom">
            <div v-show="aniShow" class="alike-popup-dialog">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name:"alike-popup",
    props:{
        show:{
            type:Boolean,
            default:false
        },
        duration:{// transition标签中duration属性指定是动画完成后等待时间，而不是动画过程中的持续时间
            type:Number,
            default:300
        },
        tapMaskClose:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return {
            aniShow:this.show,
            identifier:Math.random() * 10000
        }
    },
    mounted(){
        document.body.appendChild(this.$el);
        // document.body.appendChild(this.$refs.alikePopupFinder);
        // document.body.appendChild(document.getElementById(this.identifier));
    },
    destroyed(){
        /**
         * 此时template节点已经为空，所以无法获取到this.$refs.alikePopupFinder == undefined
         * 只能通过选择器查找或直接获取当前对象元素才能移除DOM
         */
        document.body.removeChild(this.$el);
        // document.body.removeChild(document.getElementById(this.identifier));
    },
    methods:{
        open(){
            this.aniShow = true;
        },
        close(){
            this.aniShow = false;
        },
        handleMask(){
            if(!this.tapMaskClose){
                return false;
            }
            this.close();
        }
    },
    watch:{
        aniShow(newVal,oldVal){
            if(newVal != oldVal){
                this.$emit('change',{show:this.aniShow});
            }
        }
    }
}
</script>

<style scoped>
    .alike-fade-enter-active,.alike-fade-leave-active{
        transition-property:opacity;
        transition-duration:300ms;
        transition-timing-function:ease;
    }
    .alike-fade-enter-to,.alike-fade-leave{
        opacity:1;
    } 
    .alike-fade-enter,.alike-fade-leave-to{
        opacity:0;
    }    
   

    .alike-zoom-enter-active,.alike-zoom-leave-active{
        transition-property:opacity,transform;
        transition-duration:300ms;
        transition-timing-function:ease;
    } 
    .alike-zoom-enter-to,.alike-zoom-leave{
        opacity:1;
        transform:scale(1,1);
    }
    .alike-zoom-enter,.alike-zoom-leave-to{
        opacity:0;
        transform:scale(.1,.1);
    }   

    .alike-popup-mask{
        position:fixed;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,.7);z-index:1000;
    }
    .alike-popup-dialog{
        position:fixed;top:50%;left:50%;width:500px;height:300px;background-color:#ffffff;margin-left:-250px;margin-top:-150px;z-index:1001;
    }
</style>