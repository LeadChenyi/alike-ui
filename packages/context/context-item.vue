<template>
    <div class="alike-context-item" :class="['alike-context-item--'+panelType]" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"alike-context-item",
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
        if(this.$parent.$parent.type){
            this.panelType = this.$parent.$parent.type;
        }
    },
    methods:{
        handleClick(){
            if(this.name){
                if(this.$parent.$parent){
                    this.$parent.$parent.$emit('item-click',{name:this.name})
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-context-item{display:block;list-style:none;line-height:36px;padding:0 20px;margin:0;font-size:14px;color:#606266;cursor:pointer;outline:none}
    .alike-context-item--primary:hover{color:$alike-color-primary;background-color:$alike-color-light-primary;}
    .alike-context-item--success:hover{color:$alike-color-success;background-color:$alike-color-light-success;}
    .alike-context-item--fail:hover{color:$alike-color-fail;background-color:$alike-color-light-fail;}
    .alike-context-item--warn:hover{color:$alike-color-warn;background-color:$alike-color-light-warn;}
    .alike-context-item--info:hover{color:$alike-color-info;background-color:$alike-color-light-info;}
</style>