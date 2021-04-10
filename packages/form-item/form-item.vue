<template>
	<div class="form-item">
		<label v-if="label">{{ label }}</label>
		<slot></slot>
		<p v-if="errorMsg">{{ errorMsg }}</p>
	</div>
</template>
<script>
import Schema from 'async-validator'
export default {
	name: "FormItem",
    componentName:"FormItem",
	props: {
		label: {
			type: String,
			default: "",
		},
		name: {
			type: String,
			default: ""
		}
	},
    inject: ['form'],
	data() {
		return {
			errorMsg:""
		}
	},
    mounted () {
        this.$on('inspect',()=>{
            this.validate();
        });
    },
    methods:{
        validate(){
            // console.log('验证和反馈：',rules,value);
            // return Promise.resolve('validate success');      // 等同于函数 return true;
            // return Promise.reject('validate fail');         // 等同于函数 return false;
            const rules = this.form.rules[this.name];
            const value = this.form.value[this.name];
            const schema = new Schema({[this.name]: rules})
            return schema.validate({[this.name]: value}, (errors) => {
                if (errors) {
                    this.errorMsg = errors[0].message;
                } else {
                    this.errorMsg = '';
                }
            })
        }
    }
}
</script>