<template>
    <div class="index-page">
        <alike-divider>登录状态：</alike-divider>
        <div>{{isLogin ? '欢迎光临' :'未登录'}}</div>
        <alike-button @click="unLogin" v-if="isLogin">退出登录</alike-button>

        <alike-divider>前端交互</alike-divider>
        <div class="index-wrapper">
            <alike-button class="mr-10" @click="linkUrls('Login')">Login 登录</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Cssom')">Cssom 视图属性</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Animation')">Animation 2D动画</alike-button>
            <alike-button class="mr-10" @click="linkUrls('AnimationThree')">Animation 3D动画</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Hover')">Hover 悬浮</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Mouse')">Mouse 鼠标事件</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Drag')">Drag 拖动事件</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Render')">Render 渲染模板</alike-button>
        </div>

        <alike-divider>自定义组件</alike-divider>
        <div class="index-wrapper">
            <alike-button class="mr-10" @click="linkUrls('Basic')">Basic 基础</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Button')">Button 按钮</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Form')">Form 表单</alike-button>
            <alike-button class="mr-10" @click="linkUrls('Scroll')">Scroll 滚动</alike-button>
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

<style lang="scss" scoped>
    .index-wrapper{
        display:flex;justify-content:center;align-items:center;flex-wrap:wrap;height:100px;padding:20px;
    }
</style>