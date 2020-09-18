<template>
    <div class="index-page">
        <alike-divider>首页</alike-divider>
        <alike-button class="mr-10" @click="linkUrls('Animation')">animation 2D动画</alike-button>
        <alike-button class="mr-10" @click="linkUrls('AnimationThree')">animation 3D动画</alike-button>
        <alike-button class="mr-10" @click="linkUrls('ScrollView')">scrollview 滚动器</alike-button>
    </div>
</template>

<script>
export default {
    name:"Index",
    mounted(){
        this.initData();
    },
    methods:{
        initData(){
            this.$api.photo.getPhotos().then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        },
        linkUrls(name){
            this.$router.push({name:name});
        }
    }
}
</script>

<style>

</style>