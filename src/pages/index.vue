<template>
    <div class="index-page">
        <alike-divider>登录状态</alike-divider>
        <div class="global-wrapper">{{isLogin ? '欢迎光临' :'未登录'}}</div>
        <alike-button @click="unLogin" v-if="isLogin">退出登录</alike-button>

        <alike-divider>Basic</alike-divider>
        <div class="global-wrapper">
            <alike-button class="mr-10" @click="linkUrls('Login')">Login 登录</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Cssom')">Cssom 视图属性</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Render')">Render 渲染模板</alike-button>
        </div>

        <alike-divider>Effect - 效果相关</alike-divider>
        <div class="global-wrapper">
            <alike-button class="mr-10" @click="linkUrls('Hover')">Hover</alike-button>
            <alike-button class="mr-10" @click="linkUrls('HoverUp')">Hover Up</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Atransition')">Transition</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Animation')">Animation</alike-button>
            <alike-button class="mr-10" @click="linkUrls('AnimationUp')">Animation Up</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Barrage')">Barrage</alike-button>
        </div>

        <alike-divider>Event - 事件相关</alike-divider>
        <div class="global-wrapper">
            <alike-button class="mr-10" @click="linkUrls('Mouse')">Mouse 鼠标事件</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Drag')">Drag 拖动事件</alike-button>
        </div>

        <alike-divider>UI - 自定义组件</alike-divider>
        <div class="global-wrapper">
            <alike-button class="mr-10" @click="linkUrls('Basic')">Basic 基础</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Wrapper')">Wrapper 包装</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Button')">Button 按钮</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Form')">Form 表单</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Scroll')">Scroll 滚动容器</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Carousel')">Carousel 轮播图</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Canvas')">Canvas 画布绘制</alike-button>
        </div>
    </div>
</template>

<script>
export default {
    name:"Index",
    data(){
        return {
            isLogin:localStorage.getItem('token') || false
        }
    },
    
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
        },
        unLogin(){
            this.isLogin = false;
            localStorage.removeItem('token');
        }
    }
}
</script>

<style>

</style>