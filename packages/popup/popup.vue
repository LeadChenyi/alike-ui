<template>
    <div ref="alikePopupFinder" class="alike-popup" :id="identifier">
        <transition name="popup-mask">
            <div v-show="aniShow" class="alike-popup-mask" @click="handleMask"></div>
        </transition>
        <transition name="popup-dialog">
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
    .popup-mask-enter-active,.popup-mask-leave-active{
        transition:opacity 300ms ease;
    }
    .popup-mask-enter-to,.popup-mask-leave{
        opacity:1;
    } 
    .popup-mask-enter,.popup-mask-leave-to{
        opacity:0;
    }    
   

    .popup-dialog-enter-active,.popup-dialog-leave-active{
        transition-property:opacity,transform;
        transition-duration:300ms;
        transition-timing-function:ease;
    } 
    .popup-dialog-enter-to,.popup-dialog-leave{
        opacity:1;
        transform:scale(1,1);
    }
    .popup-dialog-enter,.popup-dialog-leave-to{
        opacity:0;
        transform:scale(.1,.1);
    }   

    .alike-popup-mask{
        position:fixed;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,.7);z-index:99;
    }
    .alike-popup-dialog{
        position:fixed;top:50%;left:50%;z-index:100;width:500px;height:300px;background-color:#ffffff;margin-left:-250px;margin-top:-150px;
    }
</style>