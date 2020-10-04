<template>
    <div :class="[!title ? 'alike-menu-item':'alike-menu-item-group',!title && isOpen ? 'alike-menu--active':'',title && isOpen ? 'alike-menu--open':'']" @click.stop="handleItemClick">
        <template v-if="title">
            <div class="alike-submenu-title">{{title}}</div>
            <div class="alike-submenu-menu" :style="{height:isOpen ? 'initial' : '0px'}">
                <slot></slot>
            </div>
        </template>
        <slot v-else></slot>
    </div>
</template>

<script>
export default {
    name:"alike-menu-item",
    inject: ['menu'],
    props:{
        title:{
            type:String,
            default:""
        },
        name:{
            type:String,
            default:""
        }
    },
    data(){
        return {
            isOpen:false,
            inName:""
        }
    },
    created(){
        // 初始唯一标识符

        this.inName = this.name ? this.name : this.menu.childrens.length;
        this.menu.childrens.push(this);
        
        // 初始激活选中项
        if(this.menu.active){
            if(this.menu.active == this.inName){
                this.isOpen = true;
            }
        }
    },
    methods:{
        handleItemClick(){
            this.isOpen = !this.isOpen;
            // 排他思想
            this.menu.childrens.forEach(vm => {// 暂时支持三级
                if (vm !== this && vm !== this.$parent && vm !== this.$parent.$parent) {
                    vm.isOpen = false;
                }
            })
            
            // 触发父级事件
            this.menu.itemChange && this.menu.itemChange();
            // 强制更新父级数据
            this.$forceUpdate();
        }
    }
}
</script>

<style lang="scss" scoped>
.alike-menu-item,.alike-submenu-title{
    height:50px;
    line-height:50px;
    font-size:14px;
    color:#ffffff;
    padding:0 20px;
    cursor:pointer;
    position:relative;
    transition:border-color .3s,background-color .3s,color .3s;
    box-sizing:border-box;
}
.alike-menu-item:hover,.alike-submenu-title:hover{
    background-color:#434A50;
}
.alike-submenu-menu{
    overflow:hidden;
}
.alike-submenu-menu .alike-menu-item,.alike-submenu-menu .alike-submenu-title{
    height:44px;
    line-height:44px;
    padding:0 20px 0 40px;
}
.alike-submenu-menu .alike-submenu-menu .alike-menu-item,.alike-submenu-menu .alike-submenu-menu .alike-submenu-title{
    padding:0 20px 0 60px;
}
.alike-menu--active{
    color:$alike-color-primary;
}
.alike-group--open{
    transform:rotate(180deg);
}
</style>