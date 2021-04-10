<template>
	<div class="form-input">
		<input :value="value" :type="type" :placeholder="placeholder" @input="handleInput" />
	</div>
</template>
<script>
/*
    使用继承时组件内的事情暴露在外部处理
    组件：v-on="$listeners" v-bind="$attrs" 
    页面：:value="value"  @input="forms.username = $event.target.value"

    不使用继承组件内的双项绑定：
    @input="$emit('input',$event.target.value)"
    props:{
        value:{
            type:String
        }
    },
    model:{// 默认
        prop:'value',
        event:'input'
    }
    
    总结：组件内部用了继承，相当于所有的事情都在外部处理，更适用于组件嵌套情况下在使用
*/
export default {
	name: "FormInput",
    inheritAttrs:false,  // 传递的属性不会继承在form-input根节点上，植入input元素
    props:{
        value:{
            type:String,
            default:""
        },
        type:{
            type:String,
            default:"text"
        },
        placeholder:{
            type:String,
            default:"请输入"
        }
    },
    methods:{
        handleInput(event){
            this.$emit('input',event.target.value);
            // this.$parent.$emit('inspect',event.target.value);
            this.dispatch('FormItem','inspect',event.target.value);
        },
        dispatch(componentName,eventName,params){
            let parent = this.$parent || this.$root;
            let name = parent.$options.__proto__.name;
            console.log(parent,name);
            // 一层层往上找，直至为所对应的父组件名
            while(parent && (!name || name !== componentName)){ 
                parent = parent.$parent;
                if(parent){
                    name = parent.$options.componentName;
                }
            }
            if(parent){
                parent.$emit.call(parent,eventName,params);
            }
        }
    }
}
</script>