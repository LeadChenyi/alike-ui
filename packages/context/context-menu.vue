<template>
    <div v-show="showMenu" class="context-menu">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"alike-context-menu",
    data(){
        return {
            showMenu:false
        }
    },
    mounted(){
        document.body.appendChild(this.$el);
        this.$on('open',this.open);
    },
    destroyed(){
        document.body.removeChild(this.$el);
    },
    methods:{
        open(detail){
            this.$el.style.left = detail.left + 'px';
            this.$el.style.top = detail.top + 'px';

            if(!this.showMenu){// 接连触发右键菜单，避免重复性赋值
                this.showMenu = true;
            }

            document.onclick = (e)=>{
                if(this.showMenu && e.target.id != this.$parent.unionId){
                    this.showMenu = false;
                    document.onclick = null;
                    document.oncontextmenu = null;
                }
            }

            document.oncontextmenu = (e)=>{
                if(this.showMenu && e.target.id != this.$parent.unionId){
                    this.showMenu = false;
                    document.onclick = null;
                    document.oncontextmenu = null;
                }
            }
        }
    }
}
</script>

<style scoped>
    .context-menu{
        position:fixed;top:0;left:0;
        width:220px;
        background-color:#ffffff;
        border:1px solid #e8e8e8;
        border-radius:2px;
        box-shadow:0 2px 12px 0 rgba(0,0,0,.3);
        z-index:900;
    }
</style>