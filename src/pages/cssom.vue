<template>
    <div class="cssom-page">
        <alike-button @click="goScrollIntoView('otherFinder')">跳至Other区域</alike-button>
        <alike-divider>WindowView 属性</alike-divider>
        <div class="cssom-wrapper">
            {{windowView}}
        </div>          
        
        <alike-divider>DocumentView 属性</alike-divider>
        <div class="cssom-wrapper">
            {{documentView}}
        </div>      

        <alike-divider>ElementView 属性</alike-divider>
        <div class="cssom-wrapper">
            {{elementView}}
        </div>
        <alike-line type="white" height="1000px"></alike-line>

        <alike-divider>Other</alike-divider>
        <div ref="otherFinder" class="cssom-wrapper">
            这是一段文本...
        </div>
        <alike-line type="white" height="1000px"></alike-line>
    </div>
</template>

<script>
export default {
    name:"Cssom",
    data(){
        return {
            windowView:null,
            documentView:null,
            elementView:null
        }
    },
    mounted(){
        this.windowView = JSON.stringify(this.getWindowView());
        this.documentView = JSON.stringify(this.getDocumentView());
        this.elementView = JSON.stringify(this.getElementRect('otherFinder'));
    },
    methods:{
        goScrollIntoView(el){// 滚动到元素选择器的指定位置
            return typeof el === "string" ? this.$refs[el].scrollIntoView() : el.scrollIntoView();
        },
        getWindowView(){
            /**
             * pageYOffset（直接获取滚动值） = scrollTop（必须监听DOM滚动时）
             * innerWidth = clientWidth + 滚动条宽度
             * outerWidth = 当前浏览器的宽度
             * availWidth 桌面分辨率（不计算任务栏）
             * screenWidth 屏幕分辨率
             */

            return {
                innerWidth:window.innerWidth,
                innerHeight:window.innerHeight,
                outerWidth:window.outerWidth,
                outerHeight:window.outerHeight,    
                pageXOffset:window.pageXOffset,
                pageYOffset:window.pageYOffset,
                screenX:window.screenX,
                screenY:window.screenY,
                screenLeft:window.screenLeft,
                screenTop:window.screenTop,
                screenWidth:window.screen.width,
                screenHeight:window.screen.height,
                availWidth:window.screen.availWidth,
                availHeight:window.screen.availHeight
            }
        },
        getDocumentView(){// 获取文档视图属性
            /** 
             * client = width/height + padding
             * offset = width/height + padding + border
             * scroll = width/height + 溢出容量
            */
            
            return document.body ? {
                clientWidth: document.body.clientWidth,
                clientHeight: document.body.clientHeight,                
                clientTop: document.body.clientTop,
                clientLeft: document.body.clientLeft, 
                offsetWidth:document.body.offsetWidth,
                offsetHeight: document.body.offsetHeight,                 
                offsetTop:document.body.offsetTop,
                offsetLeft: document.body.offsetLeft,   
                scrollWidth: document.body.scrollWidth,
                scrollHeight: document.body.scrollHeight,
                scrollTop: document.body.scrollTop,
                scrollLeft: document.body.scrollLeft
            }:{
                clientWidth: document.documentElement.clientWidth,
                clientHeight: document.documentElement.clientHeight,
                clientTop: document.documentElement.clientTop,
                clientLeft: document.documentElement.clientLeft,
                offsetWidth: document.documentElement.offsetWidth,
                offsetHeight: document.documentElement.offsetHeight,                
                offsetTop: document.documentElement.offsetTop,
                offsetLeft: document.documentElement.offsetLeft,
                scrollWidth: document.documentElement.scrollWidth,
                scrollHeight: document.documentElement.scrollHeight,
                scrollTop: document.documentElement.scrollTop,
                scrollLeft: document.documentElement.scrollLeft
            }
        },
        getElementRect(el){// 获取矩形元素的属性
            return typeof el === "string" ? this.$refs[el].getBoundingClientRect() : el.getBoundingClientRect();
        },
        getElementStyle(el,attr){// 获取元素当前样式的属性
            return el.currentStyle ? el.currentStyle[attr] : window.getComputedStyle(el,null)[attr];
        },
        getElementFromPoint(x,y){// 通过坐标值获取元素实例
            return document.elementFromPoint(x,y);
        },
        getEventView(e){// 获取事件属性
            return {
                target:e.target || e.srcElement,
                key:e.keyCode || e.charCode || e.which,
                x:e.x || e.pageX,
                y:e.y || e.pageY
            }
        },
        stopPreventEvent(e){// 阻止事件冒泡和默认行为
            e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            e.preventDefault ? e.preventDefault() : e.returnValue= false;
        }
    }
}
</script>

<style scoped>
    .cssom-wrapper{
        padding:20px;
        word-wrap:break-word;
        word-break:normal;
    }
</style>