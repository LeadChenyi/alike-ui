<template>
    <div :id="unionId" class="alike-select" @click.stop="handleClick">
        <slot></slot>
        <alike-input class="alike-select-input" v-bind="$attrs" v-on="$listeners"></alike-input>
        <alike-icon class="alike-select-icon" type="arrow-down"></alike-icon>
    </div>
</template>

<script>
/**
 * 带升级版本：输入框自动补全
 */
import Bus from './bus.js'
export default {
    name:"alike-select",
    props:{
        type:{
            type:String,
            default:"primary"
        }
    },
    model:{
        prop:'value',
        event:'change'
    },
    data(){
        return {
            // 通过配置指令v-bind="$attrs"和v-on="$listeners"，即可根组件外代理子组件中的props和event财产
            agentProperty:"代理资产",
            unionId:Math.random() * 1000,
            unionName:"alike-select",
        }
    },
    mounted(){
        Bus.$on('close',this.close);
        this.$on('item-click',this.changeItem);
    },
    methods:{
        handleClick(){
            let rect = {
                top:this.$el.offsetTop,
                left:this.$el.offsetLeft,
                width:this.$el.offsetWidth,
                height:this.$el.offsetHeight
            }
            if(this.$children[0].unionName == 'alike-select-options'){
                Bus.$emit('close');
                this.$children[0].$emit('toggle',rect);
            }
        },
        changeItem(detail){
            this.close();
            
            // 避免重复触发
            if(this.$attrs.value != detail){
                this.$emit('change',detail);
            }
        },
        close(){
            this.$children[0].aniShow = false;
        }
    }
}
</script>

<style scoped>
    .alike-select{width:300px;display:inline-block;box-sizing:border-box;position:relative;}
    .alike-select-input >>> .alike-input__inner{
        padding-right:30px;
    }
    .alike-select-icon{
        position:absolute;
        top:50%;
        right:8px;
        transform:translateY(-50%);
        cursor:pointer;
    }
</style>