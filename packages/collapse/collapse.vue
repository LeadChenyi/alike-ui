<template>
    <div class="alike-collapse">
        <slot></slot>
    </div>
</template>

<script>
/**
 * alike-collapse 
 * @describe 折叠面板
 * @website http://alike.galloping.xyz
 * @property accordion {Boolean} 是否启用手风琴模式
 * @property active {String,Array} 折叠面板激活项
 * @event change {Function} 点击子面板时触发
 */
export default {
    name:"alike-collapse",
    props:{
        accordion:{
            type:Boolean,
            default:false
        },
        active:[String,Number,Array]
    },
    provide(){
        return {
            collapse:this
        }
    },
    data(){
        return {
            childrens:[]
        }
    },
    created(){
        if(this.accordion && Array.isArray(this.active)){
            console.error('当accordion为true即开启手风琴模式时，avtive属性值只能为String或Number类型。')
        }
    },
    methods:{
        itemChange(){
            let activeItem = [];
            this.childrens.forEach((vm, index) => {
                if (vm.isOpen) {
                    activeItem.push(vm.inName);
                }
            })

            if(this.accordion){
                this.$emit('change',activeItem.join(''));
            }else{
                this.$emit('change',activeItem);
            }
        }
    }
}
</script>

<style scoped>
    .alike-collapse{position:relative;overflow:hidden;}
</style>