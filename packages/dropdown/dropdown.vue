<template>
    <div class="alike-dropdown" :class="['alike-dropdown--'+type]" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"alike-dropdown",
    props:{
        type:{
            type:String,
            default:"text"
        }
    },
    data(){
        return {
            componentName:"alike-dropdown"
        }
    },
    mounted(){
        this.$on('item-click',this.changeItem);
    },
    methods:{
        handleClick(e){
            let rect = {
                top:e.target.offsetTop,
                left:e.target.offsetLeft,
                width:e.target.offsetWidth,
                height:e.target.offsetHeight,
            }
            
            if(this.$children[0].componentName == 'alike-dropdown-menu'){
                this.$children[0].$emit('toggle',rect);
            }
        },
        changeItem(detail){
            this.$children[0].$emit('toggle',{});
            this.$emit('change',detail);
        }
    }
}
</script>

<style scoped>
    .alike-dropdown{
        display: inline-block;
        position: relative;
        color: #606266;
        font-size: 14px;
        font-weight:400;
        white-space:nowrap;
        cursor:pointer;
        user-select:none;
    }
    .alike-dropdown--button{
        height:40px;padding:10px 15px;border-radius:4px;box-sizing:border-box;color:#fff;background-color:#409eff;outline:none;margin:0;
    }
</style>