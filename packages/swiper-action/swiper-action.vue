<template>
    <div class="alike-swiper-action">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"alike-swiper-action",
    data(){
        return {
            childrens:[]
        }
    },
    provide() {
        return {
            swiperAction:this
        }
    },
    methods:{
        
    }
}
</script>

<style scoped>
    .alike-swiper-action{position:relative;overflow:hidden;}
</style>