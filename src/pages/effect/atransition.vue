<template>
    <div class="transitionover-page">
        <alike-divider>transition 标签动画</alike-divider>
        <alike-button @click="toggleTitle">{{isShowTitle ? '隐藏':'显示'}}</alike-button>
        <transition name="title-fade">
            <div v-if="isShowTitle" class="transition-title">这是一个段落。。。</div>
        </transition>
    </div>
</template>

<script>
export default {
    name:"Atransition",
    data(){
        return {
            isShowTitle:true
        }
    },
    methods:{
        toggleTitle(){
            this.isShowTitle = !this.isShowTitle;
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
</style>