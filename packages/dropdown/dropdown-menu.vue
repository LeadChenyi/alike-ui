<template>
    <transition name="alike-fade">
        <div v-show="aniShow" class="alike-dropdown-menu arrow-top">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
/**
* alike-dropdown-menu
* @describe 下拉列表菜单区
* @website http://alike.galloping.xyz
*/
export default {
    name:"alike-dropdown-menu",
    data(){
        return {
            unionName:"alike-dropdown-menu",
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
            this.$el.style.left = (detail.left + detail.width / 2 - 70 / 2) +"px";
            this.$el.style.top = (detail.top + detail.height) +"px";
        
            this.aniShow = !this.aniShow;
            document.onclick = (e)=>{
                if(this.aniShow && e.target.id != this.$parent.unionId){
                    this.aniShow = false;
                    document.onclick = null;
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
        /* transform:translateY(0); */
    } 
    .alike-fade-enter,.alike-fade-leave-to{
        opacity:0;
        /* transform:translateY(-50px); */
    } 

    .alike-dropdown-menu{position:absolute;top:0;left:0;padding:10px 0;margin:10px 0;background-color:#fff;border:1px solid #ebeef5;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);z-index:900;}
    .alike-dropdown-menu.arrow-top:before,.alike-dropdown-menu.arrow-top:after{content:"";position:absolute;top:-10px;left:50%;margin-left:-10px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;}
    .alike-dropdown-menu.arrow-top:before{border-bottom:10px solid #e6e6e6;}
    .alike-dropdown-menu.arrow-top:after{top:-9px;border-bottom:10px solid #ffffff;}
    .alike-dropdown-menu.arrow-bottom:before,.alike-dropdown-menu.arrow-bottom:after{content:"";position:absolute;bottom:-10px;left:50%;margin-left:-10px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;}
    .alike-dropdown-menu.arrow-bottom:before{border-top:10px solid #e6e6e6;}
    .alike-dropdown-menu.arrow-bottom:after{bottom:-9px;border-top:10px solid #ffffff;}
</style>