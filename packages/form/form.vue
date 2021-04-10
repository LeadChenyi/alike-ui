<template>
	<div class="alike-form">
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: "From",
	props: {
		value: {
			type: Object,
            default:()=>{}
		},
		rules: {
			type: Object,
            default:()=>{}
		}
	},
    provide() {
		return {
			form:this
		}
	},
	methods:{
        validator(callback){// 验证表单中除未设置name属性的字段
            // console.log(this.$children[0].$options.componentName);
            if(!this.$children.length || this.$children[0].$options.componentName !== 'FormItem'){
                throw new Error('组件层级使用不当');
            }
            const tasks = this.$children.filter(item => item.name).map(item => item.validate());
            // console.log(tasks) // 接收验证返回的Promise结果
            Promise.all(tasks).then(() => callback(true)).catch(() => callback(false));
        }
    }
};
</script>