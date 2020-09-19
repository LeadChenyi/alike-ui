<template>
    <div class="alike-scroll-view" :style="[{width:width,height:height},customStyle]" @scroll="getScroll">
        <slot></slot>
    </div>
</template>

<script>
/**
 * alike-drag-view 
 * @describe 滚动视图
 * @website http://alike.galloping.xyz
 * @property customStyle {Object} 自定义根组件样式
 * @event scroll {function} 当元素滚动时触发，返回{scrollTop,scrollLeft}
 * @event scrolltolower {function} 当元素滚动至底部时触发
 */
export default {
    name:"alike-scroll-view",
    props:{
        customStyle:{
            type: Object,
            default: ()=>{}
        },        
        width:{
            type:String,
            default:"375px"
        },
        height:{
            type:String,
            default:"600px"
        }
    },
    methods:{
        getScroll(e){
            let el = e.target || e.srcElement
            // console.log('已滚动的距离：',el.scrollTop);
            // console.log('滚动元素的高：',el.offsetHeight);
            // console.log('滚动容量的高：',el.scrollHeight);

            this.$emit('scroll',{scrollTop:el.scrollTop,scrollLeft:el.scrollLeft});

            if((el.scrollTop + el.offsetHeight) >= el.scrollHeight){
                this.$emit('scrolltolower')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-scroll-view{
        overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;background-color:#f8f8f8;

        &::-webkit-scrollbar{
            width:8px;
            transform:width 300ms ease;
        }
        // 滚动条拇指
        &:hover::-webkit-scrollbar-thumb{
            background-color: rgba(135, 135, 135, 0.4);
            border-radius:8px;
        }
        // 滚动条轨迹
        &:hover::-webkit-scrollbar-track{
            background-color: rgba(135, 135, 135, 0.1);
        }
    }
</style>