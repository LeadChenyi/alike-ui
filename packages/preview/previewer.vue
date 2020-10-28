<template>
    <transition name="alike-fade">
        <div v-show="aniShow" class="alike-preview">
            <div class="alike-preview__mask"></div>
            <div class="alike-preview__page alike-preview__page-prev" @click="prevPreview">
                <alike-icon type="arrow-left" color="#ffffff"></alike-icon>
            </div>
            <div class="alike-preview__page alike-preview__page-next" @click="nextPreview">
                <alike-icon type="arrow-right" color="#ffffff"></alike-icon>
            </div>
            <!-- <div class="alike-preview__close"></div> -->
            <!-- <div class="alike-preview__actions"></div> -->

            <div class="alike-preview__images" @click="handleMask">
                <div class="alike-preview__item" v-for="(item,index) in urls" :key="index" v-show="activeIndex == index" @click.stop="">
                    <img :src="item" alt="">
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
    .alike-preview{position:fixed;top:0;right:0;bottom:0;left:0;z-index:900;}
    .alike-preview__mask{position:absolute;top:0;right:0;bottom:0;left:0;z-index:1;background-color:rgba(0,0,0,.7);}
    .alike-preview__page{position:absolute;top:50%;right:20px;z-index:3;display:flex;width:40px;height:40px;border-radius:50%;background-color:#606266;cursor:pointer;transform:translateY(-50%);justify-content:center;align-items:center;user-select:none;}
    .alike-preview__page-prev{left:20px;}
    .alike-preview__page-next{right:20px;}
    .alike-preview__images{position:absolute;top:0;left:0;z-index:2;display:flex;width:100%;height:100%;align-items:center;justify-content:center;}
    .alike-preview__item{max-width:100%;max-height:100%;}
</style>