<template>
    <div class="alike-dropdown-item" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"alike-dropdown-item",
    props:{
        name:{
            type:String,
            default:""
        }
    },
    methods:{
        handleClick(){
            if(this.name){
                if(this.$parent.$parent.componentName == 'alike-dropdown'){
                    this.$parent.$parent.$emit('item-click',{name:this.name})
                }
            }
        }
    }
}
</script>

<style scoped>
    .alike-dropdown-item{display:block;list-style:none;line-height:36px;padding:0 20px;margin:0;font-size:14px;color:#606266;cursor:pointer;outline:none}
    .alike-dropdown-item:hover{color:#409eff;background-color:#ECF5FF}
</style>