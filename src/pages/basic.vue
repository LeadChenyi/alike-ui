<template>
    <div class="basic-page">
        <div class="alike-collapses">
            <div class="alike-collapse-item" v-for="(item,index) in collapses" :key="index" @click="changeCollapse(index)">
                <div class="alike-collapse__header">
                    <div class="alike-collapse__header-theme">{{item.title}}-{{index}}</div>
                    <alike-icon type="arrow-right" size="16px" color="#999999"></alike-icon>
                </div>
                <div class="alike-collapse__bodyer" :class="[item.checked ? 'alike-collapse__bodyer--active':'alike-collapse__bodyer--default']">
                    <div class="alike-collapse__bodyer-inner">
                        <p>是他就是他我们的朋友小哪吒</p>
                        <p>是他就是他我们的朋友小哪吒</p>
                        <p>是他就是他我们的朋友小哪吒</p>
                    </div>
                </div>
            </div>
        </div>
        <alike-line></alike-line>

        <div class="alike-drag" v-drag>
            <img class="alike-drag__image" src="http://cloud7.galloping.xyz/aliveui_mpcode.jpg" alt="" />
        </div>

        <alike-line></alike-line>

        <div class="alike-drag-upload" v-drag-upload>

        </div>
    </div>
</template>

<script>
export default {
    name:"Basic",
    data(){
        return {
            showOnly:true,
            collapses:[
                {
                    title:"折叠面板",
                    checked:false
                },
                {
                    title:"折叠面板",
                    checked:false
                }
            ]
        }
    },
    methods:{
        changeCollapse(index){
            if(this.showOnly){
                this.collapses.forEach((item,i)=>{
                    if(index == i){
                        item.checked = !item.checked;
                    }else{
                        item.checked = false;
                    }
                })
            }else{
                this.collapses[index].checked = !this.collapses[index].checked;
            }
        }
    },
    directives: {
        drag(el) {
            //获取当前元素
            let dragBox = el; 
            dragBox.onmousedown = (e) => {
                //算出鼠标相对元素的位置
                let disX = e.clientX - dragBox.offsetLeft;
                let disY = e.clientY - dragBox.offsetTop;
                document.onmousemove = (e) => {
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;
                    //移动当前元素
                    dragBox.style.left = left + "px";
                    dragBox.style.top = top + "px";
                };
                document.onmouseup = () => {
                    //鼠标弹起来的时候不再移动
                    document.onmousemove = null;
                    //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）  
                    document.onmouseup = null;
                };
            };
        },
        dragUpload(el){
            let dragBox = el;

            // 阻止浏览器默认行为（防止个别浏览器直接打开图片）
            document.ondragleave = (e) => {//拖离
                e.preventDefault();
            };            
            document.ondrop = (e) => {//拖后放
                e.preventDefault();
            };            
            document.ondragenter = (e) => {//拖进
                e.preventDefault();
            };            
            document.ondragover = (e) => {//拖来拖去
                e.preventDefault();
            };
         
            // 监听上传区域拖后放的事件
            dragBox.addEventListener('drop', function(e) {
                e.preventDefault();
                e.stopPropagation();

                e.dataTransfer.dropEffect = 'copy';
                console.log(e.dataTransfer.files);
            });
        }
    }
}
</script>

<style scoped>
    .alike-collapse-item{
        border-radius:6px;
        border:1px solid #DFDFDF;
        cursor:pointer;
    }
    .alike-collapse__header{
        display:flex;background-color:#f8f8f8;
        padding:10px;
    }
    .alike-collapse__header-theme{
        flex:1;
    }
    .alike-collapse__bodyer{
        overflow:hidden;border-top:1px solid transparent;
        transition:height 300ms ease-in-out;
    }
    .alike-collapse__bodyer--active{
        height:100px;border-top:1px solid #DFDFDF;
    }
    .alike-collapse__bodyer-inner{
        padding:15px;
    }
    .alike-collapse__bodyer--default{
        height:0;
    }

    .alike-drag{
        position:fixed;
        top:20px;
        left:200px;
        width:200px;
        height:200px;
        /* background-color:rgba(162, 188, 234,.5); */
    }
    .alike-drag__image{
        width:100%;
        height:100%;
        pointer-events:none;
    }

    .alike-drag-upload{
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .alike-drag-upload:hover{
        border-color:#409EFF;
    }
</style>