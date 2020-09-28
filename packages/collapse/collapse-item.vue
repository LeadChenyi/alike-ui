<template>
    <div class="alike-collapse-item">
        <div class="alike-collapse__header" @click="handleClick">
            <div class="alike-collapse__header-title">{{title}}</div>
            <alike-icon type="arrow-right" size="16px" color="#999999"></alike-icon>
        </div>
        <div ref="sectionFinder" class="alike-collapse__section" :class="[isActive ? 'alike-collapse__section--show':'alike-collapse__section--hide']" :style="{height:onceTotal || isActive ? sectionHeight+'px' : '0px',transition:transition}">
            <div class="alike-collapse__section-inner">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * alike-collapse-item 
 * @describe 折叠子面板
 * @website http://alike.galloping.xyz
 * @property title {String} 子面板的标题
 * @property name {String} 子面板的唯一标记符
 */
export default {
    name:"alike-collapse-item",
    inject: ['collapse'],
    props:{
        title:{
            type:String,
            default:""
        },
        name:{
            type:String,
            default:""
        }
    },
    data(){
        return {
            onceTotal:true,       
            sectionHeight:null,
            transition:"height 0s ease"
        }
    },
    mounted(){
        /**
         * 由于需要获取到每个子元素内容区域的真实高度，所以首次初始化时需要先获取，通过双开关的原理避免一开始isActive为false元素高度值为0的情况。
         * 由于计算属性中无法设置data值，所以直接在style上判断
         */
        this.sectionHeight = this.$refs.sectionFinder.getBoundingClientRect().height;
        this.onceTotal = false;
        this.transition = "height 300ms ease";
    },
    methods:{
        handleClick(){
            this.$parent.$emit('item-click',this);
        }
    },
    computed:{
        isActive(){
            return this.collapse.activeName.indexOf(this.name) != -1;
        }
    }
}
</script>

<style scoped>
    .alike-collapse-item{
        border-radius:6px;cursor:pointer;border:1px solid #DFDFDF;
    }
    .alike-collapse__header{
        display:flex;align-items:center;
        height:40px;padding:10px;box-sizing:border-box;
        background-color:#f8f8f8;
    }
    .alike-collapse__header-title{
        flex:1;
    }
    .alike-collapse__section{
        overflow:hidden;
    }
    .alike-collapse__section--show{
        border-top:1px solid #DFDFDF;
    }
    .alike-collapse__section--hide{
        border-top:1px solid transparent;
    }
    .alike-collapse__section-inner{
        padding:15px;
    }
</style>