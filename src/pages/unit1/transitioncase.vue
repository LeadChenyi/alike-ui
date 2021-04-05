<template>
    <div class="transitionover-page">
        <alike-divider>vue/transition 移入/移出</alike-divider>
        <alike-button @click="isDisplay = !isDisplay">{{isDisplay ? '移出':'移入'}}</alike-button>
        <transition name="display">
            <div class="display-transition" v-if="isDisplay">这是一个段落。。。</div>
        </transition>


        <alike-divider>vue/transition 展开/收起</alike-divider>
        <alike-button @click="isFold = !isFold">{{isFold ? '收起':'展开'}}</alike-button>
        <transition name="zoom" options="fold|zoom">
            <div class="fold-transition" v-if="isFold"></div>
        </transition>        
        

        <alike-divider>侧方弹出</alike-divider>
        <alike-button @click="isLeftside = !isLeftside">左侧方 {{isLeftside ? '隐藏':'显示'}}</alike-button>
        <alike-button @click="isRightside = !isRightside">右侧方 {{isRightside ? '隐藏':'显示'}}</alike-button>
        <div>左侧方弹出：默认元素的中心点就在左上角</div>
        <div>右侧方弹出：通过靠右定位脱离文档流，改变元素在左上角的中心点</div>
        <div class="leftside-transition" :class="[isLeftside?'leftside-transition--active':'leftside-transition--deactive']"></div>
        <div class="rightside-transition" :class="[isRightside?'rightside-transition--active':'rightside-transition--deactive']"></div>


        <alike-divider>dynamic transition</alike-divider>
        <alike-button @click="setTransition">动态添加过度形态</alike-button>
        <alike-button @click="runTransition">开始触发过度效果</alike-button>
        <alike-button @click="resetTransition">重置</alike-button>
        <div ref="queryTransition">这是一个段落。。。</div>


        <alike-divider>again transition</alike-divider>
        <alike-button @click="runBig">开始变大</alike-button>
        <div ref="queryAgainTransition" class="again-transition"></div>
    </div>
</template>

<script>
export default {
    name:"TransitionCase",
    data(){
        return {
            isDisplay:false,
            isFold:false,
            isLeftside:false,
            isRightside:false,
            isTransition:false,
            translateXVal:0
        }
    },
    methods:{
        setTransition(){
            if(this.isTransition){
                console.log('你已经添加过了');
                return false;
            }
            this.isTransition = true;
            this.$refs.queryTransition.style.setProperty('transition','transform 300ms linear 0s');
        },
        runTransition(){
            if(!this.isTransition){
                console.log('请先添加过度形态');
                return false;
            }
            this.translateXVal += 100;
            this.$refs.queryTransition.style.setProperty('transform',`translateX(${this.translateXVal}px)`);
        },
        resetTransition(){
            this.isTransition = false;
            this.translateXVal = 0;
            this.$refs.queryTransition.style.removeProperty('transition');
            this.$refs.queryTransition.style.removeProperty('transform');
        },
        createTransition(el,{
            property,
            duration = 1500,
            timingFunction = "linear",
            delay = 0
        } = {},created,callback){
            if(typeof property === 'string'){
                el.style.setProperty('transition',`${property} ${duration}ms ${timingFunction} ${delay}s`);
            }else if(Array.isArray(property)){
                let styles = [];
                property.forEach((item)=>{
                    styles.push(`${item} ${duration}ms ${timingFunction} ${delay}s`);
                });
                el.style.setProperty('transition',styles.join(','));
            }

            created && created();

            let timer = setTimeout(()=>{
                callback && callback();
                clearTimeout(timer);
                timer = null;
            },duration);
        },
        runBig(){
            this.createTransition(this.$refs.queryAgainTransition,{
                property:'transform'
            },()=>{
                this.$refs.queryAgainTransition.style.setProperty('transform','scale(1.8)');
            },()=>{
                this.$refs.queryAgainTransition.style.setProperty('transform','rotate(180deg)');
            });
        }
    }
}
</script>

<style scoped>
    .display-enter-active,.display-leave-active{
        transition:transform .3s ease,opacity .3s ease;
    } 
    .display-enter-to,.display-leave{
        transform: translateX(0px);
        opacity: 1;
    }
    .display-enter,.display-leave-to{
        transform: translateX(50px);
        opacity: 0;
    }     

    .zoom-enter-active,.zoom-leave-active{
        transition:transform .3s ease,opacity .3s ease;
    } 
    .zoom-enter-to,.zoom-leave{
        transform: scale(1);
        opacity: 1;
    }
    .zoom-enter,.zoom-leave-to{
        transform: scale(0);
        opacity: 0;
    }     
    
    .fold-enter-active,.fold-leave-active{
        transition:transform .3s ease,opacity .3s ease;
    } 
    .fold-enter-to,.fold-leave{
        transform: scale(1,1);
        opacity: 1;
    }
    .fold-enter,.fold-leave-to{
        transform: scale(1,0);
        opacity: 0;
    }     

    .fold-transition{
        width:100px;
        height:100px;
        border-radius:5px;
        background-color:#3a8cf7;
    }
    .again-transition{
        width:100px;
        height:100px;
        border-radius:5px;
        margin:0 auto;
        background-color:#f7563a;
    }

    .leftside-transition{
        display:block;
        border-radius:5px;
        transition:width 1s ease 0s,height 1s ease 0s,background-color 1s ease 0s;
    }
    .leftside-transition--active{
        width:320px;
        height:560px;
        background-color:#733af7;
    }    
    .leftside-transition--deactive{
        width:0;
        height:0;
        background-color:#d13af7;
    }    
    
    .rightside-transition{
        position:fixed;
        top:0;
        right:0;
        z-index:1;
        display:block;
        border-radius:5px;
        transition:width 1s ease 0s,height 1s ease 0s,background-color 1s ease 0s;
    }
    .rightside-transition--active{
        width:320px;
        height:560px;
        background-color:#f7bb3a;
    }    
    .rightside-transition--deactive{
        width:0;
        height:0;
        background-color:#f7603a;
    }
</style>