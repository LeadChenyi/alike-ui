<template>
    <div class="alike-dropdown-item" :class="['alike-dropdown-item--'+panelType]" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
/**
* alike-dropdown-item
* @describe 下拉列表可选项
* @website http://alike.galloping.xyz
* @property name {String} 下拉列表可选项的唯一标记符名称
*/
export default {
    name:"alike-dropdown-item",
    props:{
        name:{
            type:String,
            default:""
        }
    },
    data(){
        return {
            panelType:"primary"
        }
    },
    mounted(){
        if(this.$parent.$parent.buttonType){
            this.panelType = this.$parent.$parent.buttonType;
        }
    },
    methods:{
        handleClick(){
            if(this.name){
                if(this.$parent.$parent.unionName == 'alike-dropdown'){
                    this.$parent.$parent.$emit('item-click',{name:this.name});
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-dropdown-item{display:block;list-style:none;line-height:36px;padding:0 20px;margin:0;font-size:14px;color:#606266;cursor:pointer;outline:none}
    .alike-dropdown-item--primary:hover{color:$alike-color-primary;background-color:$alike-color-light-primary;}
    .alike-dropdown-item--success:hover{color:$alike-color-success;background-color:$alike-color-light-success;}
    .alike-dropdown-item--fail:hover{color:$alike-color-fail;background-color:$alike-color-light-fail;}
    .alike-dropdown-item--warn:hover{color:$alike-color-warn;background-color:$alike-color-light-warn;}
    .alike-dropdown-item--info:hover{color:$alike-color-info;background-color:$alike-color-light-info;}
</style>