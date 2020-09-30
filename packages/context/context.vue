<template>
    <div :id="unionId" class="alike-context-area" @contextmenu.prevent.stop="openMenu" @click="closeMenu">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"alike-context",
    props:{
        type:{
            type:String,
            default:"primary"
        }
    },
    data(){
        return {
            unionId:Math.random() * 1000,   // 为了判断是否为当前父级组件
            unionName:"alike-context"       // 为了判断是否为当前祖先级组件
        }
    },
    mounted(){
        this.$on('item-click',this.changeItem);
    },
    methods:{
        openMenu(e){
            let detail = {
                top:e.clientY,
                left:e.clientX
            }

            if(this.$children[0]){
                this.$children[0].$emit('open',detail);
            }
        },
        closeMenu(){
            if(this.$children[0]){
                this.$children[0].showMenu = false;
            }
        },
        changeItem(detail){
            this.closeMenu();
            this.$emit('change',detail);
        }
    }
}
</script>

<style scoped>
    .alike-context-area{position:relative;display:inline-flex;}
</style>