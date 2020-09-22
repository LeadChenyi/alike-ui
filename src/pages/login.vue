<template>
    <div class="login-page">
        <div>登录状态：{{isLogin ? '欢迎光临' :'未登录'}}</div>
        <alike-button @click="toLogin" v-if="!isLogin">立即登录</alike-button>
        <alike-button @click="unLogin" v-else>退出登录</alike-button>
    </div>
</template>

<script>
export default {
    name:"Login",
    data(){
        return {
            isLogin:localStorage.getItem('token') || false
        }
    },
    methods:{
        toLogin(){
            this.isLogin = true;
            localStorage.setItem('token','768472');
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