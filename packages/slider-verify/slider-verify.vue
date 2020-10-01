<template>
    <div class="alike-slider-verify" :style="{width:width,height:height}">
        <div class="alike-slider-verify__scrollbar">
            <div class="alike-slider-verify__scrollbar-prompt" :class="[passed ? 'alike-prompt--active':'']">{{passed ? '已通过滑块验证':'请拖动滑块完成验证→'}}</div>
            <div class="alike-slider-verify__scrollbar-progress" :style="{width:progressWidth}"></div>
        </div>
        <div ref="thumbFinder" class="alike-slider-verify__thumb" :class="[passed ? 'alike-thumb--active':'']" :style="{left:thumbLeft}" @mousedown="mousedown"></div>
    </div>
</template>

<script>
/**
 * alike-slider-verify
 * @describe 滑块验证
 * @website http://alike.galloping.xyz
 * @property width {String} 根元素的宽度
 * @property height {String} 根元素的高度
 * @event change {function} 移动滑块时触发，返回{value,precent}
 * @event finish {function} 滑块验证通过时触发
 */
export default {
    name:"alike-slider-verify",
    props:{
        width:{
            type:String,
            default:"300px"
        },
        height:{
            type:String,
            default:"30px"
        }
    },
    data(){
        return {
            thumbLeft:"0px",
            progressWidth:"0px",
            passed:false
        }
    },
    methods:{
        mousedown(e){
            if(this.passed){
                return false;
            }

            let downX = e.clientX - this.$refs.thumbFinder.offsetLeft;
            document.onmousemove = (e)=>{
                let moveX = e.clientX - downX;
                if(moveX <= 0){
                    moveX = 0;
                }else if(moveX >= (this.$el.offsetWidth - this.$refs.thumbFinder.offsetWidth)){
                    moveX = this.$el.offsetWidth - this.$refs.thumbFinder.offsetWidth;
                    this.passed = true;
                }
                
                this.thumbLeft = moveX + 'px';
                this.progressWidth = moveX + this.$refs.thumbFinder.offsetWidth + 'px';
                
                let precent = parseInt(moveX / (this.$el.offsetWidth - this.$refs.thumbFinder.offsetWidth) * 100);
                let detail = {
                    value:moveX,
                    percent:precent
                }
                this.$emit('change',detail);

                if(this.passed){
                    this.$emit('finish');
                    document.onmousemove = null;
                    document.onmouseup = null;
                }
            }
            document.onmouseup = ()=>{
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
}
</script>

<style scoped>
    .alike-slider-verify{width:300px;height:30px;border-radius:50px;background-color:#e8e8e8;position:relative;overflow:hidden;}
    .alike-slider-verify__scrollbar{width:100%;height:100%;position:relative;}
    .alike-slider-verify__scrollbar-prompt{position:absolute;top:0;left:0;height:100%;width:100%;font-size:14px;color:#999999;z-index:1;display:flex;align-items:center;justify-content:center;user-select:none;}
    .alike-prompt--active{color:#ffffff;z-index:3;}
    .alike-slider-verify__scrollbar-progress{background-color:#64ED64;position:absolute;top:0;left:0;height:100%;width:0%;border-radius:50px;z-index:2;}
    .alike-slider-verify__thumb{width:30px;height:30px;border-radius:50%;box-shadow:0 0 5px rgba(56,237,132,.5);background-color: #ffffff;position:absolute;top:50%;left:0%;transform:translateY(-50%);cursor:grab;z-index:5;}
    .alike-thumb--active{cursor:not-allowed;}
</style>