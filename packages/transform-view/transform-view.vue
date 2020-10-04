<template>
    <div class="alike-transform-view" :class="[position == 'relative' ? 'alike-noresize':'']" :style="{width:width,height:height,backgroundColor:backgroundColor,position:position,top:top,left:left,zIndex:zIndex}">
        <slot></slot>

        <!-- 夹角 -->
        <div class="alike-transform-dot alike-transform-dot-tl" @mousedown="dotTopLeft"></div>
        <div class="alike-transform-dot alike-transform-dot-bl" @mousedown="dotBottomLeft"></div>
        <div class="alike-transform-dot alike-transform-dot-tr" @mousedown="dotTopRight"></div>
        <div class="alike-transform-dot alike-transform-dot-br" @mousedown="dotBottomRight"></div>
        
        <!-- 边 -->
        <div class="alike-transform-side alike-transform-side-top" @mousedown="sideTop"></div>
        <div class="alike-transform-side alike-transform-side-bottom" @mousedown="sideBottom"></div>
        <div class="alike-transform-side alike-transform-side-left" @mousedown="sideLeft"></div>
        <div class="alike-transform-side alike-transform-side-right" @mousedown="sideRight"></div>
    </div>
</template>

<script>
export default {
    name:"alike-transform-view",
    props:{
        width:{
            type:String,
            default:"200px"
        },        
        height:{
            type:String,
            default:"200px"
        },        
        backgroundColor:{
            type:String,
            default:"#ff8853"
        },
        position:{
            type:String,
            default:"relative"
        },
        top:{
            type:String,
            default:""
        },        
        left:{
            type:String,
            default:""
        },
        zIndex:{
            type:String,
            default:"999"
        }
    },
    methods:{
        /**
         * 左上为负数，右下为正数，由此得出以下公式：
         * 左上：
         * elWdith - recordX + "px"
         * elHeight - recordY + "px" 
         * 右下：
         * elWdith + recordX + "px"
         * elHeight + recordY + "px"
         */
        sideTop(e){
            if(this.position == 'relative'){
                return false;
            }
            let downY = e.clientY;
            let elRect = this.$el.getBoundingClientRect();
            document.onmousemove = (e)=>{
                let recordY = e.clientY - downY;
                this.$el.style.top = elRect.top + recordY + "px";
                this.$el.style.height = elRect.height - recordY + "px";
            }

            document.onmouseup = ()=>{
                this.$emit('changeTop');
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },   
        sideLeft(e){
            if(this.position == 'relative'){
                return false;
            }
            let downX = e.clientX;
            let elRect = this.$el.getBoundingClientRect();
            document.onmousemove = (e)=>{
                let recordX = e.clientX - downX;
                this.$el.style.left = elRect.left + recordX + "px";
                this.$el.style.width = elRect.width - recordX + "px";
            }

            document.onmouseup = ()=>{
                this.$emit('changeLeft');
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },     
        sideBottom(e){
            let downY = e.clientY;
            let elHeight = this.$el.getBoundingClientRect().height;
            document.onmousemove = (e)=>{
                let recordY = e.clientY - downY;
                this.$el.style.height = elHeight + recordY + "px";
            }

            document.onmouseup = ()=>{
                this.$emit('changeBottom');
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },
        sideRight(e){
            let downX = e.clientX;
            let elWdith = this.$el.getBoundingClientRect().width;
            document.onmousemove = (e)=>{
                let recordX = e.clientX - downX;
                this.$el.style.width = elWdith + recordX + "px";
            }

            document.onmouseup = ()=>{
                this.$emit('changeRight');
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },
        dotBottomRight(e){
            let downX = e.clientX;
            let downY = e.clientY;
            let elRect = this.$el.getBoundingClientRect();
            document.onmousemove = (e)=>{
                let recordX = e.clientX - downX;
                let recordY = e.clientY - downY;
                this.$el.style.width = elRect.width + recordX + "px";
                this.$el.style.height = elRect.height + recordY + "px";
            }

            document.onmouseup = ()=>{
                let detail = this.$el.getBoundingClientRect();
                this.$emit('changeBottomRight',detail);
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },
        dotTopLeft(e){
            let downX = e.clientX;
            let downY = e.clientY;
            let elRect = this.$el.getBoundingClientRect();
            document.onmousemove = (e)=>{
                let recordX = e.clientX - downX;
                let recordY = e.clientY - downY;
                this.$el.style.left = elRect.left + recordX + "px";
                this.$el.style.top = elRect.top + recordY + "px";
                this.$el.style.width = elRect.width - recordX + "px";
                this.$el.style.height = elRect.height - recordY + "px";
            }

            document.onmouseup = ()=>{
                let detail = this.$el.getBoundingClientRect();
                this.$emit('changeTopLeft',detail);
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },
        dotBottomLeft(e){
            let downX = e.clientX;
            let downY = e.clientY;
            let elRect = this.$el.getBoundingClientRect();
            document.onmousemove = (e)=>{
                let recordX = e.clientX - downX;
                let recordY = e.clientY - downY;
                this.$el.style.left = elRect.left + recordX + "px";
                this.$el.style.width = elRect.width - recordX + "px";
                this.$el.style.height = elRect.height + recordY + "px";
            }

            document.onmouseup = ()=>{
                let detail = this.$el.getBoundingClientRect();
                this.$emit('changeBottomLeft',detail);
                document.onmousemove = null;
                document.onmouseup = null;
            }
        },
        dotTopRight(e){
            let downX = e.clientX;
            let downY = e.clientY;
            let elRect = this.$el.getBoundingClientRect();
            document.onmousemove = (e)=>{
                let recordX = e.clientX - downX;
                let recordY = e.clientY - downY;
                this.$el.style.top = elRect.top + recordY + "px";
                this.$el.style.width = elRect.width + recordX + "px";
                this.$el.style.height = elRect.height - recordY + "px";
            }

            document.onmouseup = ()=>{
                let detail = this.$el.getBoundingClientRect();
                this.$emit('changeTopRight',detail);
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.alike-transform-view{
    display:inline-block;
    overflow:hidden;

    .alike-transform-dot{
        position: absolute;
        z-index: 2;
        opacity: 0.5;
        width: 7px;
        height: 7px;
        background-color: #333;
        border: 1px #eee solid;
    }
    .alike-transform-dot-tl{
        top:0;
        left:0;
        cursor:nw-resize;
    }        
    .alike-transform-dot-bl{
        bottom:0;
        left:0;
        cursor:ne-resize;
    }        
    .alike-transform-dot-tr{
        top:0;
        right:0;
        cursor:sw-resize;
    }        
    .alike-transform-dot-br{
        bottom:0;
        right:0;
        cursor:se-resize;
    }

    .alike-transform-side{
        background: #ffffff url('./border_001.gif') top left repeat;
        z-index:1;
    }
    .alike-transform-side-top,.alike-transform-side-bottom{
        height: 2px;width: 100%;position: absolute;left:0;right:0;
    }
    .alike-transform-side-top{
        top:0;cursor: n-resize;
    }
    .alike-transform-side-bottom{
        bottom:0;cursor: s-resize;
    }
    .alike-transform-side-left,.alike-transform-side-right{
        height: 100%;width: 2px;position: absolute;top:0;bottom:0;
    }
    .alike-transform-side-left{
        left:0;cursor:w-resize;
    }
    .alike-transform-side-right{
        right:0;cursor:e-resize;
    }
}
.alike-noresize{
    .alike-transform-dot-tl,.alike-transform-dot-bl,.alike-transform-dot-tr{
        cursor:not-allowed;
    }    
    .alike-transform-side-top,.alike-transform-side-left{
        cursor:not-allowed;
    }    
}
</style>