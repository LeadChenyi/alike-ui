<template>
    <div>
        <div class="backdrop backdrop-after"></div>
        <div class="backdrop backdrop-mask"></div>
        <div class="backdrop backdrop-ani"></div>

        <alike-divider>遮罩层镂空</alike-divider>
        <!-- <div class="mask-shadow"></div> -->
        <!-- <div class="mask-border"></div> -->
    </div>
</template>

<script>
export default {
    name:"MaskCase"
}
</script>

<style scoped>
    .mask-shadow{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        z-index:2;
        
        width:300px;
        height:300px;
        border-radius:5px;
        border:1px dashed #ff0000;
        box-shadow: 0px 0px 0px 1000px rgba(0,0,0,.5);
        box-sizing: border-box;
    }
    .mask-border{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        z-index:2;
        
        width: 300px;
        height: 300px;
        border-radius:5px;
        border: 1000px solid rgba(0,0,0,0.5);
    }

    .backdrop{
        position:relative;
        width:640px;
        height:300px;
        background:url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-1drkl6bpt7rp8b95ea/7b3ef130-643c-11eb-8ff1-d5dcf8779628.jpg) 100% 100% no-repeat;
    }
    .backdrop-mask{
        /* 填充的部分会进行重叠， */
        mask: linear-gradient(0deg, transparent, #ffffff);
    }
    .backdrop-after:after {
        content:"";
        display:block;
        width:100%;
        height:100%;
        position:absolute;
        top:0%;
        left:0%;
        background:linear-gradient(0deg, #ffffff, transparent);
    }
    .backdrop-ani{
        mask: radial-gradient(circle at 100px 100px, #ffffff 60px, transparent 80px, transparent 100%);
        animation: mask 10s infinite alternate;
    }
    @keyframes mask {
        100% {
            mask-position:100vw 50px;
        }
    }
</style>