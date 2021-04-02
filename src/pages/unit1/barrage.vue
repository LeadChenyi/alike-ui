<template>
    <div class="barrage-page">
        <alike-divider>弹幕</alike-divider>
        <div class="barrage-wrap">
            <div ref="queryBarrage" class="barrage-item" :class="[isActive ? 'barrage-item-active':'barrage-item-await']">
                <p>天干物燥小心火烛，人生百态我劝你好生走路！</p>
            </div>
        </div>
        <alike-button :type="isActive ?'default':'primary'" @click="sendBarrage">{{isActive ? '发射中':'开始发射'}}</alike-button>
        <div class="notice-view">
            <div class="notice-item" v-for="(item,index) in notices" :key="index">{{item}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name:"Barrage",
    data(){
        return {
            isActive:false,
            notices:[
                "今天是个好日子1",
                "今天是个好日子2",
                "今天是个好日子3"
            ]
        }
    },
    mounted(){
        this.$refs.queryBarrage.ontransitionend = (e)=>{
            console.log('过度动画执行完毕',e);
            this.isActive = false;
        }

        // this.setNotice();
        requestAnimationFrame(this.aniNotice);
    },
    methods:{
        sendBarrage(){
            if(this.isActive){
                console.log('已经在发射中请稍后...');
                return false;
            }   
            this.isActive = true;
        },
        setNotice(){
            setInterval(()=>{
                if(this.notices.length){
                    this.notices.pop();
                }
                let timeStamp = new Date().getTime();
                this.notices.unshift(`今天是个好日子${timeStamp}`);
            },1000);
        },
        aniNotice(){
            if(this.notices.length){
                this.notices.pop();
            }
            let timeStamp = new Date().getTime();
            this.notices.unshift(`今天是个好日子${timeStamp}`);
            requestAnimationFrame(this.aniNotice);
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
            // transform:translateX(0);
            will-change:transform;
        }
        & .barrage-item-active{
            transition:transform 3s linear;
            transform:translateX(calc(-500px + -100%));
        }        
        & .barrage-item-await{
            transform:translateX(0);
        }
    }

</style>