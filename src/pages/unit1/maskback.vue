<template>
    <div>
        <div class="backdrop backdrop-after"></div>
        <div class="backdrop backdrop-mask"></div>
        <div class="backdrop backdrop-ani"></div>
    </div>
</template>

<script>
export default {
    name:"MaskBack"
}
</script>

<style scoped>
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