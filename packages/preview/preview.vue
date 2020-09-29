<template>
    <transition name="alike-fade">
        <div v-show="aniShow" class="alike-preview">
            <div class="alike-preview__mask"></div>
            <div class="alike-preview__page alike-preview__page-prev" @click="prevPreview">
                <alike-icon type="arrow-left" color="#ffffff"></alike-icon>
            </div>
            <div class="alike-preview__page alike-preview__page-next" @click="nextPreview">
                <alike-icon type="arrow-right" color="#ffffff"></alike-icon>
            </div>
            <!-- <div class="alike-preview__close"></div> -->
            <!-- <div class="alike-preview__actions"></div> -->

            <div class="alike-preview__images" @click="handleMask">
                <div class="alike-preview__item" v-for="(item,index) in urls" :key="index" v-show="activeIndex == index" @click.stop="">
                    <img :src="item" alt="">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
/**
 * alike-preview
 * @describe 视图预览
 * @website http://alike.galloping.xyz
 * @property urls {Array} 视图数据对象
 * @property current {String} 当前视图
 * @property maskClose {Boolean} 是否开启遮罩层关闭
 */
export default {
    name:"alike-preview",
    props:{
        urls:{
            type:Array,
            defautl:()=>[]
        },
        current:{
            type:String,
            default:""
        },
        maskClose:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            activeIndex:0,
            aniShow:false
        }
    },
    mounted(){
        document.body.appendChild(this.$el);
        this.getCurrent();
    },
    destroyed(){
        document.body.removeChild(this.$el);
    },
    methods:{
        getCurrent(){
            if(!this.urls.length){
                return false;
            }
            this.activeIndex = this.urls.indexOf(this.current);
        },
        prevPreview(){
            this.activeIndex--;
            if(this.activeIndex < 0){
                this.activeIndex = this.urls.length - 1;
            }
        },
        nextPreview(){
            this.activeIndex++;
            if(this.activeIndex > (this.urls.length - 1)){
                this.activeIndex = 0;
            }
        },
        open(){
            this.aniShow = true;
        },
        close(){
            this.aniShow = false;
        },
        handleMask(){
            if(!this.maskClose){
                return false;
            }
            this.close();
        }
    },
    watch:{
        current(newVal,oldVal){
            if(newVal != oldVal){
                this.getCurrent();
            }
        }
    }
}
</script>

<style scoped>
    .alike-preview{position:fixed;top:0;right:0;bottom:0;left:0;z-index:900;}
    .alike-preview__mask{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;background-color:rgba(0,0,0,.7);}
    .alike-preview__page{position:absolute;top:50%;right:20px;z-index:3;display:flex;width:40px;height:40px;border-radius:50%;background-color:#606266;cursor:pointer;transform:translateY(-50%);justify-content:center;align-items:center;user-select:none;}
    .alike-preview__page-prev{left:20px;}
    .alike-preview__page-next{right:20px;}
    .alike-preview__images{position:absolute;top:0;left:0;z-index:2;display:flex;width:100%;height:100%;align-items:center;justify-content:center;}
    .alike-preview__item{max-width:100%;max-height:100%;}
</style>