<template>
    <div class="alike-select-item" :class="['alike-select-item--'+panelType]" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"alike-select-item",
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
                if(this.$parent.$parent.unionName == 'alike-select'){
                    this.$parent.$parent.$emit('item-click',this.name)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-select-item{display:block;list-style:none;line-height:36px;padding:0 20px;margin:0;font-size:14px;color:#606266;cursor:pointer;outline:none}
    .alike-select-item--primary:hover{color:$alike-color-primary;background-color:$alike-color-light-primary;}
    .alike-select-item--success:hover{color:$alike-color-success;background-color:$alike-color-light-success;}
    .alike-select-item--fail:hover{color:$alike-color-fail;background-color:$alike-color-light-fail;}
    .alike-select-item--warn:hover{color:$alike-color-warn;background-color:$alike-color-light-warn;}
    .alike-select-item--info:hover{color:$alike-color-info;background-color:$alike-color-light-info;}
</style>