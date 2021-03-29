<template>
    <div class="index-page">
        <alike-divider>登录状态</alike-divider>
        <div class="global-wrapper">{{isLogin ? '欢迎光临' :'未登录'}}</div>
        <alike-button @click="unLogin" v-if="isLogin">退出登录</alike-button> 
       

        <alike-divider>unit1 - 样式效果</alike-divider>
        <div class="global-wrapper">
            <alike-button type="primary" class="mr-10" @click="linkUrls('Hover')">Hover</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('HoverUp')">Hover Up</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Atransition')">Transition</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Animation')">Animation</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('AnimationUp')">Animation Up</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Barrage')">Barrage</alike-button>
        </div>

        <alike-divider>unit2 - 脚本效果</alike-divider>
        <div class="global-wrapper">
            <alike-button type="primary" class="mr-10" @click="linkUrls('Cssom')">CSSOM对象模型</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Regexp')">正则表达式</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Mouse')">鼠标事件</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Drag')">拖动事件</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Class')">类</alike-button>
        </div>

        <alike-divider>unit3 - vue进阶</alike-divider>
        <div class="global-wrapper">
            <alike-button type="primary" class="mr-10" @click="linkUrls('Render')">Render渲染模板</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Tree')">Tree无限递归组件</alike-button>
        </div>

        <alike-divider>example - 场景示例</alike-divider>
        <div class="global-wrapper">
            <alike-button type="primary" class="mr-10" @click="linkUrls('Login')">登录</alike-button>
        </div>

        <alike-divider>library - 第三方库</alike-divider>
        <div class="global-wrapper">
            <alike-button type="primary" class="mr-10" @click="linkUrls('Jsx')">Jsx渲染模板</alike-button>
        </div>        

        <alike-divider>editor - 编辑器</alike-divider>
        <div class="global-wrapper">
            <alike-button type="primary" class="mr-10" @click="linkUrls('Wang')">Wang富文本编辑器</alike-button>
        </div>

        <alike-divider>alike - 自定义组件</alike-divider>
        <div class="global-wrapper">
            <alike-button type="primary" class="mr-10" @click="linkUrls('Basic')">Basic 基础</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Wrapper')">Wrapper 包装</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Button')">Button 按钮</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Form')">Form 表单</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Scroll')">Scroll 滚动容器</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Carousel')">Carousel 轮播图</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Canvas')">Canvas 画布绘制</alike-button>
            <alike-button type="primary" class="mr-10" @click="linkUrls('Video')">Video 播放器</alike-button>
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