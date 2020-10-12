<template>
    <div class="barrage-page">
        <alike-divider>弹幕</alike-divider>
        <div class="barrage-wrap">
            <div class="barrage-item" :class="[isActive ? 'barrage-item-active':'']">
                <p>天干物燥小心火烛，人生百态我劝你好生走路！</p>
            </div>
        </div>
        <alike-button @click="sendBarrage">发射</alike-button>
    </div>
</template>

<script>
export default {
    name:"Barrage",
    data(){
        return {
            isActive:false
        }
    },
    methods:{
        sendBarrage(){
            this.isActive = true;
        }
    }
}
</script>

<style lang="scss" scoepd>
    .barrage-wrap{
        width:500px;height:200px;border-radius:1px;position:relative;overflow:hidden;background-color:#81C9FA;

        & .barrage-item{
            display:flex;
            white-space:nowrap;
            color:#ffffff;
            font-size:16px;
            position:absolute;
            top:10px;
            left:100%;
            transform:translateX(0);
            transition:transform 3s linear;
        }
        & .barrage-item-active{
            transform:translateX(calc(-500px + -100%));
        }
    }

</style>