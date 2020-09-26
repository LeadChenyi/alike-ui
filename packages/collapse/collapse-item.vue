<template>
    <div class="alike-collapse-item">
        <div class="alike-collapse__header" @click="handleClick">
            <div class="alike-collapse__header-title">{{title}}</div>
            <alike-icon type="arrow-right" size="16px" color="#999999"></alike-icon>
        </div>
        <div class="alike-collapse__bodyer" :class="[isActive ? 'alike-collapse__bodyer--active':'alike-collapse__bodyer--default']">
            <div class="alike-collapse__bodyer-inner">
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
        border-radius:6px;
        border:1px solid #DFDFDF;
        cursor:pointer;
    }
    .alike-collapse__header{
        display:flex;align-items:center;
        height:40px;padding:10px;box-sizing:border-box;
        background-color:#f8f8f8;
    }
    .alike-collapse__header-title{
        flex:1;
    }
    .alike-collapse__bodyer{
        overflow:hidden;border-top:1px solid transparent;
        transition:height 300ms ease-in-out;
    }
    .alike-collapse__bodyer--active{
        height:100px;border-top:1px solid #DFDFDF;
    }
    .alike-collapse__bodyer-inner{
        padding:15px;
    }
    .alike-collapse__bodyer--default{
        height:0;
    }
</style>