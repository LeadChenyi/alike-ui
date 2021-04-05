<template>
    <div class="clickcase-page">
        <h1>穿透点击</h1>
        <div class="picture-view">
            <div class="picture-mask"></div>
            <div class="picture-cut" @click="cut"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:"ClickCase",
    methods:{
        cut(){
            console.log('--- cut ---');
        }
    }
}
</script>

<style scoped>
    .picture-view{
        position:relative;
        width:375px;
        height:668px;
        background-color:#f5f6fa;
    }
    .picture-mask{
        position:absolute;
        top:0;
        right:0;
        width:375px;
        height:375px;
        z-index:2;
        background-color:rgba(255,255,255,.3);
        pointer-events:none;
    }

    .picture-cut{
        position:absolute;
        top:0;
        right:0;
        width:375px;
        height:375px;
        z-index:1;
        background-color:rgba(63, 80, 238, 1);
        pointer-events:auto;
    }
</style>