<template>
    <div class="alike-button" :class="['alike-button--'+size,plain ? 'alike-button-plain--'+type:'alike-button--'+type,radius ? 'alike-button--radius':'',disabled ? 'alike-button--disabled':'']" :style="[{color:color,borderColor:borderColor,backgroundColor:backgroundColor},customStyle]" @click="handldClick">
        <slot></slot>
    </div>
</template>

<script>
	/**
	 * alike-button
	 * @describe 按钮
	 * @website http://alike.galloping.xyz
	 * @property customStyle {Object} 自定义根元素样式
	 * @property type {String} 按钮类型（默认值：default；可选值：primary、success、fail、warn、info）     
	 * @property size {String} 按钮大小（默认值：normal；可选值：block、large、big、small、mini）
	 * @property plain {Boolean} 是否设为空心按钮（默认值：false；可选值：true）
	 * @property radius {Boolean} 是否开启倒圆角（默认值：false；可选值：true）
	 * @property color {String} 按钮文本颜色
	 * @property borderColor {String} 按钮边框颜色
	 * @property backgroundColor {String} 按钮背景颜色
	 * @property disabled {Boolean} 是否禁止用户操作
     * @event click {Function}  点击元素时触发
	 */
	
	export default {
        name:"alike-button",
		props:{
			customStyle:{
				type: Object,
				default: ()=>{}
            },
            type: {
				type: String,
				default: "default"
			},
			size:{
				type: String,
				default: "normal"
            },
            plain:{
				type: Boolean,
				default: false
            },
            radius:{
				type: Boolean,
				default: false
            },
            color:{
				type: String,
				default: ""
			},
			borderColor:{
				type: String,
				default: ""
			},
			backgroundColor:{
				type: String,
				default: ""
            },
            disabled:{
                type:Boolean,
                default:false
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

<style lang="scss" scoped>
	.alike-button{display:inline-block;height:40px;line-height:40px;padding:0 15px;box-sizing:border-box;border:1px solid transparent;border-radius:4px;font-size:15px;color:#ffffff;text-align:center;user-select:none;cursor:pointer;position:relative;overflow:hidden;}
    .alike-button--radius{border-radius:40px;}
    .alike-button--disabled{cursor:not-allowed;}

    .alike-button--normal{width:$alike-size-normal;}
    .alike-button--block{width:$alike-size-block;}
    .alike-button--large{width:$alike-size-large;}
	.alike-button--big{width:$alike-size-big;}
	.alike-button--small{width:$alike-size-small;}
    .alike-button--mini{width:$alike-size-mini;}
    
	.alike-button--default{background-color:$alike-color-default;color:$alike-color-9;}
	.alike-button--primary{background-color:$alike-color-primary;}
	.alike-button--success{background-color:$alike-color-success;}
	.alike-button--fail{background-color:$alike-color-fail;}
	.alike-button--warn{background-color:$alike-color-warn;}
    .alike-button--info{background-color:$alike-color-info;}
    
    .alike-button-plain--default{color:$alike-color-9;border-color:$alike-color-default;}
	.alike-button-plain--primary{color:$alike-color-primary;border-color:$alike-color-primary;}
	.alike-button-plain--success{color:$alike-color-success;border-color:$alike-color-success;}
	.alike-button-plain--fail{color:$alike-color-fail;border-color:$alike-color-fail;}
	.alike-button-plain--warn{color:$alike-color-warn;border-color:$alike-color-warn;}
    .alike-button-plain--info{color:$alike-color-info;border-color:$alike-color-info;}
    
    .alike-button:hover:before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(255,255,255,.1);}
    .alike-button:active:before{content:"";position:absolute;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,.1);}
</style>