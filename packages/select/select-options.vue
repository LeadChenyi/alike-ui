<template>
    <transition name="alike-fade">
        <div v-show="aniShow" class="alike-select-options alike-arrow-top">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    name:"alike-select-options",
    data(){
        return {
            unionName:"alike-select-options",
            aniShow:false
        }
    },
    mounted(){
        document.body.appendChild(this.$el);
        this.$on('toggle', this.toggle);
    },
    destroyed(){
        document.body.removeChild(this.$el);
    },
    methods:{
        toggle(detail){
            this.$el.style.width = detail.width + "px";
            this.$el.style.left = detail.left + "px";
            this.$el.style.top = (detail.top + detail.height) + "px";
        
            this.aniShow = !this.aniShow;
            document.onclick = (e)=>{
                if(this.aniShow && e.target.id != this.$parent.unionId){
                    this.aniShow = false;
                    document.onclick = null;
                    document.oncontextmenu = null;
                }
            }

            document.oncontextmenu = (e)=>{
                if(this.aniShow && e.target.id != this.$parent.unionId){
                    this.aniShow = false;
                    document.onclick = null;
                    document.oncontextmenu = null;
                }
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
.alike-select-options{
    position:fixed;top:0;left:0;
    background-color:#ffffff;
    border:1px solid #e8e8e8;
    border-radius:2px;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.3);
    z-index:900;
}

.alike-select-options{position:absolute;top:0;left:0;padding:10px 0;margin:10px 0;background-color:#fff;border:1px solid #ebeef5;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);z-index:900;}
.alike-select-options.alike-arrow-top:before,.alike-select-options.alike-arrow-top:after{content:"";position:absolute;top:-10px;left:50%;margin-left:-10px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;}
.alike-select-options.alike-arrow-top:before{border-bottom:10px solid #e6e6e6;}
.alike-select-options.alike-arrow-top:after{top:-9px;border-bottom:10px solid #ffffff;}
.alike-select-options.arrow-bottom:before,.alike-select-options.arrow-bottom:after{content:"";position:absolute;bottom:-10px;left:50%;margin-left:-10px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;}
.alike-select-options.arrow-bottom:before{border-top:10px solid #e6e6e6;}
.alike-select-options.arrow-bottom:after{bottom:-9px;border-top:10px solid #ffffff;}
</style>