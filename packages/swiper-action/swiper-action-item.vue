<template>
    <div class="alike-swiper-action-item" @mousedown="swiperActionMouseDown">
        <div class="alike-swiper-action-section" :style="{transform:`translate3d(${translateX}px,0,0)`}">
            <slot></slot>
        </div>
        <div class="alike-swiper-action-footer">
            <div class="alike-swiper-action-btn alike-swiper-action-btn--primary">编辑</div>
            <div class="alike-swiper-action-btn alike-swiper-action-btn--fail">删除</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"alike-swiper-action-item",
    data(){
        return {
            translateX:0,       // 当前值     
            thresholdX:40,      // 门槛值
            limitX:120,         // 限制值
            recordX:0,          // 记录值
            direction:"left"    // 记录移动方向
        }
    },
    inject: ['swiperAction'],
    created(){
        this.swiperAction.childrens.push(this);
    },
    methods:{
        swiperActionMouseDown(e){
            let downX = e.clientX;
            
            // 排他思想
            this.swiperAction.childrens.forEach(vm => {
                if (vm !== this) {
                    vm.translateX = 0;
                }
            })

            document.onmousemove = (e)=>{
                this.recordX = e.clientX - downX;

                /**
                 * 记录值每次是会重新计算的
                 * 左滑：当前值 = 记录值（如果为累加当中途反方向时用户体验不好）
                 * 右滑：当前值 + 记录值（如果为等于无法从左滑方向的起始点递减）
                 */

                if(this.recordX <= 0){
                    // console.log('向左滑...',this.recordX);
                    this.direction = "left";
                    this.translateX = this.recordX;
                    if(this.translateX < -this.limitX){
                        this.translateX = -this.limitX;
                    }
                }else{
                    // console.log('向右滑...',this.recordX);
                    this.direction = "right";
                    this.translateX += this.recordX;
                    if(this.translateX > 0){
                        this.translateX = 0;
                    }
                }
            }

            document.onmouseup = ()=>{
                if(this.direction == "left"){
                    if(this.translateX < -this.thresholdX){
                        this.translateX = -this.limitX;
                    }else{
                        this.translateX = 0;
                    }
                }else{
                    if(this.translateX > -(this.limitX - this.thresholdX)){
                        this.translateX = 0;
                    }else{
                        this.translateX = -this.limitX;
                    }
                }

                document.onmousemove = null;
                document.onmouseup = null;
            }
        },
        close(){
            this.translateX = 0;
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-swiper-action-item{position:relative;overflow:hidden;display:flex;}
    .alike-swiper-action-section{position:relative;flex:1;z-index:2;transition:transform 300ms ease;}
    .alike-swiper-action-footer{position:absolute;right:0;top:0;bottom:0;display:flex;}
    .alike-swiper-action-btn{padding:0 15px;color:#ffffff;font-size:15px;line-height:40px;cursor:pointer;}
    .alike-swiper-action-btn--primary{background-color:$alike-color-primary;}
    .alike-swiper-action-btn--fail{background-color:$alike-color-fail;}
</style>