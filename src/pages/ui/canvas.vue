<template>
    <div class="canvas-page">
        <alike-verify-code width="200px" height="60px" @update="updateVerifyCode"></alike-verify-code>
    </div>
</template>

<script>
import alikeVerifyCode from '../../../packages/verify-code/verify-code'

export default {
    name:"Canvas",
    components:{
        alikeVerifyCode
    },
    methods:{
        updateVerifyCode(detail){
            console.log('验证码更新了：',detail.code.join(''));
        }
    }
}
</script>

<style>

</style>