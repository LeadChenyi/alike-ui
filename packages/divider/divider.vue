<template>
    <div class="alike-divider" :style="[customStyle]">
        <div class="alike-divider__title" :style="[titleStyle]">
            <slot></slot>
        </div>
    </div>
</template>

<script>
	/**
	 * alike-divider
	 * @describe 通常用于分隔场景
	 * @website http://alike.galloping.xyz
	 * @property customStyle {Object} 自定义根元素样式
	 * @property titleStyle {Object} 自定义标题元素样式
	 */
	
	export default {
        name:"alike-divider",
		props:{
			customStyle:{
				type: Object,
				default: ()=>{}
            },			
            titleStyle:{
				type: Object,
				default: ()=>{}
            }
		}
	}
</script>

<style scoped>
	.alike-divider{width:100%;position:relative;height:30px;}
    .alike-divider:before{position:absolute;top:50%;left:0;right:0;width:100%;height:1px;background-color:#f8f8f8;content:"";}
    .alike-divider__title{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:inline-block;font-size:16px;color:#333333;background-color:#ffffff;padding:0 10px;}
</style>