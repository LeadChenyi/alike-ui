<template>
    <div>
        <h1>scroll dehavior</h1>
        <nav>
            <a href="#page-1">1</a>
            <a href="#page-2">2</a>
            <a href="#page-3">3</a>
        </nav>
        <main>
            <section id="page-1">1</section>
            <section id="page-2">2</section>
            <section id="page-3">3</section>
        </main>
        <h1>scrolling 、scroll up 、scroll down</h1>
        <div style="widht:100%;height:2000px;">
            <p v-for="item in 66" :key="item">text content {{item}}</p>
        </div>
        <div style="position:fixed;top:100px;left:200px;color:#000000;backgroundColor:#ffffff;">
            <p>isScroll状态:{{isScroll ? '激活中':'未激活'}}</p>
            <p>isScrollUp状态:{{isScrollUp ? '激活中':'未激活'}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:"ScrollUp",
    data(){
        return {
            isScroll:false,     // 是否处于滚动中
            isScrollUp:false,    // 是否处于向上滚动
            scrollTimer:null,
            scrollUpTimer:null,
            scrollTop:0,
            scrollType:'top'
        }
    },
    mounted(){
        const bodyEle = document.body || document.documentElement;
        bodyEle.onscroll = () => {
            // 该函数只判断是否正在滚动
            this.rightNowScroll();

            let value = document.documentElement.body || document.documentElement.scrollTop;
            // 该函数判断向上还是向下滚动
            this.directionScroll(value);
        }

        // 防抖函数封装
        // body.onscroll = this.debounceScroll(()=>{
        //     this.isScroll = true;
        // },()=>{
        //     this.isScroll = false;
        //     this.scrollTimer = null;
        // });
    },
    methods:{
        debounceScroll(created,callback,delay = 1500){ 
            let timer = null;
            return function(){
                created && created();
                clearTimeout(timer);
                timer = setTimeout(callback,delay);
            }
        },
        rightNowScroll(){
            this.isScroll = true;
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(()=>{
                this.isScroll = false;
                this.scrollTimer = null;
            },1500);
        },
        directionScroll(value){
            if(value > this.scrollTop){
                this.isScrollUp = true;
            }else{
                this.isScrollUp = false;
            }
            this.scrollTop = value;
        }
    }
}
</script>

<style scoped>
/* https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior */
a {
  display: inline-block;
  width: 50px;
  text-decoration: none;
}
nav, main {
  display: block;
  margin: 0 auto;
  text-align: center;
}
nav {
  width: 339px;
  padding: 5px;
  border: 1px solid black;
}
main {
  display: block;
  width: 350px;
  height: 200px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 5em;
}
</style>