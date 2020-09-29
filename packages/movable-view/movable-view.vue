<template>
    <div ref="movableFinder" class="alike-movable-view" :style="[{top:top,left:left,zIndex:zIndex},customStyle]" @mousedown="mousedownMovable">
        <slot></slot>
    </div>
</template>

<script>
/**
 * alike-movable-view 
 * @describe 移动视图
 * @website http://alike.galloping.xyz
 * @property customStyle {Object} 自定义根组件样式
 * @property top {String} 元素初始top值
 * @property left {String} 元素初始left值
 * @property enableRange {Boolean} 限制元素移动的范围（默认值为false，可选值为true）
 * @event change {function} 元素移动时触发，返回{left,top}
 * @event finish {function} 元素移动完成时触发，返回{left,top}
 */

export default {
    name:"alike-movable-view",
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
        enableRange:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        mousedownMovable(e){
            this.$refs.movableFinder.style.zIndex = 999;
            const docAttr = document.body || document.documentElement;
            const elRect = this.$refs.movableFinder.getBoundingClientRect();

            let downX = e.clientX - elRect.left;
            let downY = e.clientY - elRect.top;
            let moveX = 0;
            let moveY = 0;

            document.onmousemove = (e)=>{
                moveX = e.clientX - downX;
                moveY = e.clientY - downY;

                if(this.enableRange){
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

                this.$refs.movableFinder.style.left = moveX + "px";
                this.$refs.movableFinder.style.top = moveY + "px";

                this.$emit('change',{left:moveX,top:moveY});
            }

            document.onmouseup = ()=>{
                this.$refs.movableFinder.style.zIndex = this.zIndex;
                this.$emit('finish',{left:moveX,top:moveY});

                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    },
    directives:{
        movable(el,binding,vnode){
            el.onmousedown = (e)=>{
                // 获取vue实例
                const vm = vnode.context;

                el.style.zIndex = 999;
                const elRect = el.getBoundingClientRect();
                const docAttr = document.body || document.documentElement;

                let downX = e.clientX - el.offsetLeft;
                let downY = e.clientY - el.offsetTop;
                let moveX = 0;
                let moveY = 0;

                document.onmousemove = (e)=>{
                    moveX = e.clientX - downX;
                    moveY = e.clientY - downY;

                    if(vm.enableRange){
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
                    el.style.zIndex = vm.zIndex;
                    vm.$emit('finish',{left:moveX,top:moveY});

                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
        }
    }
}
</script>

<style scoped>
    .alike-movable-view{position:fixed;display:inline-block;overflow:hidden;cursor:move;}
</style>