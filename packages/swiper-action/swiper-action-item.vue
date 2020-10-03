<template>
    <div class="alike-swiper-action-item" @mousedown="mousedown">
        <div class="alike-swiper-action-section">
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
    methods:{
        mousedown(e){
            console.log(e);
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-swiper-action-item{position:relative;overflow:hidden;display:flex;}
    .alike-swiper-action-section{position:relative;flex:1;z-index:2;}
    .alike-swiper-action-footer{position:absolute;right:0;top:0;bottom:0;display:flex;}
    .alike-swiper-action-btn{padding:0 15px;color:#ffffff;font-size:15px;}
    .alike-swiper-action-btn--primary{background-color:$alike-color-primary;}
    .alike-swiper-action-btn--fail{background-color:$alike-color-fail;}
</style>