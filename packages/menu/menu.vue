<template>
    <div class="alike-menu" :style="{width:width,backgroundColor:backgroundColor}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"alike-nav",
    props:{
        active:{
            type:[String,Number],
            default:""
        },
        direction:{// 水平horizontal、垂直vertical
            type:String,
            default:"vertical"
        },
        width:{
            type:String,
            default:"240px"
        },
        backgroundColor:{
            type:String,
            default:"#545C64"
        }
    },
    provide(){
        return {
            menu:this
        }
    },
    data(){
        return {
            childrens:[]
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

            this.$emit('change',activeItem.join(''));
        }
    }
}
</script>

<style scoped>
    .alike-menu{position:relative;overflow:hidden;}
</style>