<template>
    <div :id="unionId" class="alike-dropdown" :class="['alike-dropdown-'+type,type == 'button'?'alike-dropdown-button--'+buttonType:'']" @click="handleClick">
        <slot></slot>
    </div>
</template>

<script>
/**
* alike-dropdown
* @describe 下拉列表
* @website http://alike.galloping.xyz
* @property type {String} 元素类型（默认值：text，可选值：button）
* @event change {Function}  点击下拉列表项时触发
*/
export default {
    name:"alike-dropdown",
    props:{
        type:{
            type:String,
            default:"text"
        },
        buttonType:{
            type:String,
            default:"primary"
        }
    },
    data(){
        return {
            unionName:"alike-dropdown",
            unionId:Math.random() * 1000
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
            
            if(this.$children[0].unionName == 'alike-dropdown-menu'){
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

<style lang="scss" scoped>
    .alike-dropdown{position:relative;display:inline-block;white-space:nowrap;font-weight:400;font-size:15px;cursor:pointer;user-select:none;}
    .alike-dropdown-text{color: #333333;}
    .alike-dropdown-button{height:40px;line-height:40px;padding:0 15px;border-radius:4px;box-sizing:border-box;outline:none;margin:0;color:#ffffff;}
    .alike-dropdown-button:hover:before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(255,255,255,.1);}
    .alike-dropdown-button:active:before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.1);}
    .alike-dropdown-button--primary{background-color:$alike-color-primary;}
    .alike-dropdown-button--default{background-color:$alike-color-default;color:$alike-color-9;}
	.alike-dropdown-button--success{background-color:$alike-color-success;}
	.alike-dropdown-button--fail{background-color:$alike-color-fail;}
	.alike-dropdown-button--warn{background-color:$alike-color-warn;}
    .alike-dropdown-button--info{background-color:$alike-color-info;}
</style>