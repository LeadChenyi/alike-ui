<template>
    <div class="index-page">
        <div class="index-wrap">
            <alike-button class="mr-10" @click="linkUrls('Basic')">Basic 基础组件</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Button')">Button 按钮组件</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Form')">Form 表单组件</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Drag')">Drag 拖动组件</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Animation')">Animation 2D动画</alike-button>
            <alike-button class="mr-10" @click="linkUrls('AnimationThree')">Animation 3D动画</alike-button>
            <alike-button class="mr-10" @click="linkUrls('ScrollView')">ScrollView 滚动容器</alike-button>
        </div>
    </div>
</template>

<script>
export default {
    name:"Index",
    mounted(){
        // this.initData();
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

<style lang="scss" scoped>
    .index-wrap{
        display:flex;justify-content:center;align-items:center;flex-wrap:wrap;height:100px;padding:20px;
    }
</style>