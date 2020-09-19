<template>
    <div class="alike-draggable" :style="[{top:top,left:left,zIndex:zIndex},customStyle]" v-draggable>
        <slot></slot>
    </div>
</template>

<script>
/**
 * alike-draggable 拖动
 * @describe 拖动元素
 * @website http://alike.galloping.xyz
 * @property customStyle {Object} 自定义根组件样式
 * @property top {String} 元素初始top值
 * @property left {String} 元素初始left值
 * @property limits {Boolean} 限制元素移动的范围（默认值为false，可选值为true）
 * @event change {function} 元素移动时触发，返回{left,top}
 */

export default {
    name:"alike-draggable",
    props:{
        customStyle:{
            type: Object,
            default: ()=>{}
        },
        top:{
            type:String,
            default:"20px"
        },        
        left:{
            type:String,
            default:"20px"
        },
        zIndex:{
            type:Number,
            default:1
        },
        limits:{
            type:Boolean,
            default:false
        }
    },
    directives:{
        draggable(el,binding,vnode){
            // 获取Vue实例，浏览器
            let _this = vnode.context;
            let _width = document.documentElement.clientWidth || document.body.clientWidth;
            let _height = document.documentElement.clientHeight || document.body.clientHeight;

            el.onmousedown = (e)=>{
                el.style.zIndex++;
                const elAttr = el.getBoundingClientRect();
                let downX = e.clientX - el.offsetLeft;
                let downY = e.clientY - el.offsetTop;

                document.onmousemove = (e)=>{
                    let moveX = e.clientX - downX;
                    let moveY = e.clientY - downY;

                    if(_this.limits){
                        if(moveX < 0){
                            moveX = 0;
                        }else if(moveX >= (_width - elAttr.width)){
                            moveX = _width - elAttr.width;
                        }                        
                        
                        if(moveY < 0){
                            moveY = 0;
                        }else if(moveY >= (_height - elAttr.height)){
                            moveY = _height - elAttr.height;
                        }
                    }

                    el.style.left = moveX + "px";
                    el.style.top = moveY + "px";

                    _this.$emit('change',{left:moveX,top:moveY});
                }

                document.onmouseup = ()=>{
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-draggable{
        position:fixed;display:inline-block;overflow:hidden;

        &:hover{
            cursor:move;
        }
    }
</style>