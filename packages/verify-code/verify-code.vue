<template>
    <canvas ref="verifyCodeFinder" class="alike-verify-code" :style="{width:width,height:height}" @click="resetDraw">
        <p>当前浏览器不支持Canvas API，请升级至最新版本！</p>
    </canvas>
</template>

<script>
import VerifyCode from './VerifyCode.js'
export default {
    name:"alike-verify-code",
    props:{
        width:{
            type:String,
            default:"100px"
        },
        height:{
            type:String,
            default:"30px"
        }
    },
    data(){
        return {
            verifyCodeCanvas:null,
            code:null
        }
    },
    mounted(){
        this.initVerifyCode();
    },
    methods:{
        initVerifyCode(){
            this.verifyCodeCanvas = new VerifyCode(this.$refs.verifyCodeFinder);
            this.code = this.verifyCodeCanvas.code;
        },
        resetDraw(){
            this.verifyCodeCanvas.draw();
            this.code = this.verifyCodeCanvas.code;
        }
    },
    watch:{
        code(newVal){
            this.$emit('update',{code:newVal});
        }
    }
}
</script>

<style scoped>
    .alike-verify-code{position:relative;overflow:hidden;background-color:#f8f8f8;cursor:pointer;}
</style>