<template>
    <div class="alike-drag-view" :style="[{top:top,left:left,zIndex:zIndex},customStyle]" v-drag>
        <slot></slot>
    </div>
</template>

<script>
/**
 * alike-drag-view 
 * @describe 拖动视图
 * @website http://alike.galloping.xyz
 * @property customStyle {Object} 自定义根组件样式
 * @property top {String} 元素初始top值
 * @property left {String} 元素初始left值
 * @property limits {Boolean} 限制元素移动的范围（默认值为false，可选值为true）
 * @event change {function} 元素移动时触发，返回{left,top}
 */

export default {
    name:"alike-drag-view",
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
        drag(el,binding,vnode){
            el.onmousedown = (e)=>{
                // 获取vue实例
                const vm = vnode.context;

                el.style.zIndex++;
                const elRect = el.getBoundingClientRect();
                const docAttr = document.body || document.documentElement;

                let downX = e.clientX - el.offsetLeft;
                let downY = e.clientY - el.offsetTop;

                document.onmousemove = (e)=>{
                    let moveX = e.clientX - downX;
                    let moveY = e.clientY - downY;

                    if(vm.limits){
                        if(moveX < 0){
                            moveX = 0;
                        }else if(moveX >= (docAttr.clientWidth - elRect.width)){
                            moveX = docAttr.clientWidth - elRect.width;
                        }                        
                        
                        if(moveY < 0){
                            moveY = 0;
                        }else if(moveY >= (docAttr.clientHeight - elRect.height)){
                            moveY = docAttr.clientHeight - elRect.height;
                        }
                    }

                    el.style.left = moveX + "px";
                    el.style.top = moveY + "px";

                    vm.$emit('change',{left:moveX,top:moveY});
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
    .alike-drag-view{
        position:fixed;display:inline-block;overflow:hidden;

        &:hover{
            cursor:move;
        }
    }
</style>