<template>
    <div class="login-page">
        <alike-button @click="toLogin">立即登录</alike-button>
    </div>
</template>

<script>
export default {
    name:"Login",
    methods:{
        toLogin(){
            localStorage.setItem('token','768472');

            // 判断先前是否是通过重定向到登录流程的，登录成功后进行指定返回或回到首页
            if(this.$route.query.redirect){
                this.$router.push({name:this.$route.query.redirect});
            }else{
                this.$router.push({name:'Index'});
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        // console.log('beforeRouteEnter');
        next();
    }
}
</script>

<style>

</style>