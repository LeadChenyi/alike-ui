<template>
	<div :class="['alike-line','alike-line--'+type]" :style="[{height:height},customStyle]"></div>
</template>

<script>
	/**
	 * alike-line 块级行
	 * @describe 通常用于占位的场景
	 * @website http://alike.galloping.xyz
	 * @property customStyle {Object} 自定义根组件样式
	 * @property type {String} 行的类型
	 * @property height {String} 行的高度
	 */
	
	export default {
        name:"alike-line",
		props:{
			customStyle:{
				type: Object,
				default: ()=>{}
			},
			type:{
				type:String,
				default:"default"
			},
			height:{
				type:String,
				default:"10px"
			}
		}
	}
</script>

<style scoped>
	.alike-line{width:100%;}
	.alike-line--white{background-color:#ffffff;}
	.alike-line--default{background-color:#f8f8f8;}
</style>
