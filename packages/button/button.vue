<template>
    <div class="alike-button" :class="[disabled?'alike-button--disabled':'']" :style="[customStyle]" @click="handldClick">
        <slot></slot>
    </div>
</template>

<script>
	/**
	 * alike-button
	 * @describe 按钮
	 * @website http://alike.galloping.xyz
	 * @property customStyle {Object} 自定义根组件样式
	 */
	
	export default {
        name:"alike-button",
		props:{
			customStyle:{
				type: Object,
				default: ()=>{}
            },
            disabled:{
                type:Boolean,
                defualt:false
            }
        },
        methods:{
            handldClick(){
                if(this.disabled){
                    return false;
                }
                this.$emit('click');
            }
        }
	}
</script>

<style scoped>
	.alike-button{display:inline-block;position:relative;padding:10px 15px;height:40px;box-sizing:border-box;border-radius:4px;text-align:center;font-size:15px;color:#ffffff;background-color:#409eff;cursor:pointer;user-select:none;overflow:hidden;}
    .alike-button:hover:before{
        content:"";position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(255,255,255,.1);
    }
    .alike-button:active:before{
        content:"";position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.1);
    }
    .alike-button--disabled{
        cursor:not-allowed;
    }
</style>