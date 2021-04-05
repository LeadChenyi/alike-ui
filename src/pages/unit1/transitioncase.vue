<template>
    <div class="transitionover-page">
        <alike-divider>vue/transition 显示/隐藏段落</alike-divider>
        <alike-button @click="toggleTitle">{{isShowTitle ? '隐藏':'显示'}}</alike-button>
        <transition name="title-fade">
            <div v-if="isShowTitle" class="transition-title">这是一个段落。。。</div>
        </transition>
        <alike-divider>transition</alike-divider>
        <alike-button @click="setTransition">动态添加过度形态</alike-button>
        <alike-button @click="runTransition">开始触发过度效果</alike-button>
        <alike-button @click="resetTransition">重置</alike-button>
        <div ref="queryTransition">这是一个段落。。。</div>
        <alike-divider>again transition</alike-divider>
        <div ref="queryAgainTransition" class="again-transition"></div>
        <alike-button @click="runBig">开始变大</alike-button>
    </div>
</template>

<script>
export default {
    name:"TransitionCase",
    data(){
        return {
            isShowTitle:true,
            isTransition:false,
            translateXVal:0
        }
    },
    methods:{
        toggleTitle(){
            this.isShowTitle = !this.isShowTitle;
        },
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
    .title-fade-enter-active,.title-fade-leave-active{
        transition: all .3s ease;
    } 
    .title-fade-enter-to,.title-fade-leave{
        transform: translateX(0px);
        opacity: 1;
    }
    .title-fade-enter,.title-fade-leave-to{
        transform: translateX(50px);
        opacity: 0;
    } 
    .again-transition{
        width:100px;
        height:100px;
        margin:0 auto;
        border-radius:5px;
        background-color:#f7563a;
    }
</style>