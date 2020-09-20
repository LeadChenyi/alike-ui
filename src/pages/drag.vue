<template>
    <div class="drag-page">
        <alike-divider>拖动数据</alike-divider>
        <div class="drag-move">
            <div class="drag-move-box">
                <p id="move_text" class="drag-move__text" draggable="true" v-draggable>这是一个能拖动的文本</p>
                <img id="move_image" class="drag-move__image" src="http://cloud7.galloping.xyz/aliveui_mpcode.jpg" draggable="true" v-draggable>
            </div>
            <div class="drag-move-box">

            </div>
        </div>

        <alike-divider>拖动清理</alike-divider>
        <div class="drag-clear-list">
            <div class="drag-clear__item" v-for="(item,index) in lists1" :key="index" :id="`clear_${index}`" :data-index="index" draggable="true" v-draggable>{{item}}</div>
        </div>

        <div class="drag-clear-box">
            清理箱
        </div>

        <alike-line type="white" height="1000px"></alike-line>
        <alike-movable-view left="440px" top="30px" :enable-range="true" :z-index="9" @change="changeDragView">
            <div class="rect-view"></div>
        </alike-movable-view>
    </div>
</template>

<script>
import alikeMovableView from '../../packages/movable-view/movable-view'

export default {
    name:"Drag",
    components:{
        alikeMovableView
    },
    data(){
        return {
            lists1:[
                "Ming",
                "Xiaohu",
                "Uzi",
                "Mlxg",
                "Letme"
            ],
            currentIndex:0
        }
    },
    mounted(){
        this.exchangeArray(1,2);
    },
    methods:{
        exchangeArray(zIndex,cIndex){// 对调数组中的子元素，参数（主下标,次下标）
            let cDel = this.lists1.splice(cIndex,1,this.lists1[zIndex]);    // 接收已删除的数据，数据类型为数组
            this.lists1.splice(zIndex,1,cDel[0]);
        },
        changeDragView(e){
            // console.log('实时监听元素拖动位置：',e);
        }
    },
    directives:{
        draggable(el,binding,vnode){
            const vm = vnode.context;

            // 拖动时触发
            document.addEventListener('dragstart',function(e){
                vm.currentIndex = e.target.dataset.index;
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("eid",e.target.id);
                
                e.target.style.opacity = 0.3;
                if(e.target.className == 'drag-move__text'){
                    e.target.style.color = "#00ffff";
                }
            })
            document.addEventListener("drag", function(e) {
               e.preventDefault();
            })
            document.addEventListener('dragend',function(e){
                e.target.style.opacity = 1;
                if(e.target.className == 'drag-move__text'){
                    e.target.style.color = "#000000";
                    e.dataTransfer.clearData("eid");
                }
            })

            // 拖动到指定区时触发
            document.addEventListener("dragenter", function(e) {
                if(e.target.className == 'drag-move-box'){
                    e.target.style.border = "1px dotted #0000ff";
                }else if(e.target.className == 'drag-clear-box'){
                    e.target.style.backgroundColor = "#409EFF"
                }
            });            
            document.addEventListener("dragover", function(e) {
                e.preventDefault();
            });            
            document.addEventListener("dragleave", function(e) {
                if(e.target.className == 'drag-move-box'){
                    e.target.style.border = "1px solid #e8e8e8";
                }else if(e.target.className == 'drag-clear-box'){
                    e.target.style.backgroundColor = "#67C23A"
                }
            });
            document.addEventListener("drop", function(e) {
                e.preventDefault();

                let eid = e.dataTransfer.getData("eid");
                
                if (e.target.className == 'drag-move-box') {
                    e.target.style.border = "1px solid #e8e8e8";

                    if(eid.indexOf('move') != -1){
                        e.target.appendChild(document.getElementById(eid));
                        console.log('move....');
                    }
                }else if(e.target.className == 'drag-clear-box'){
                    e.target.style.backgroundColor = "#67C23A"

                    if(eid.indexOf('clear') != -1){
                        console.log('clear....');
                        vm.lists1.splice(vm.currentIndex,1);
                    }
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .rect-view{
        width:200px;
        height:200px;
        background-color:rgba(162, 188, 234,.5);
    }

    .drag-move-box{
        display:inline-block;
        width:200px;
        height:200px;
        margin-right:20px;
        border:1px solid #e8e8e8;
        overflow:hidden;
    }

    .drag-move__image{
        width:50px;
        height:50px;
    }

    .drag-clear-list{
        width:300px;
        overflow:hidden;
        display:inline-block;
        margin-right:20px;
    }

    .drag-clear__item{
        padding:20px;
        border:1px solid #e8e8e8;
        background-color:#f8f8f8;
        color:#666666;
        font-size:15px;
        margin-bottom:5px;
        cursor:move;
    }

    .drag-clear-box{
        width:200px;
        height:200px;
        line-height:200px;
        text-align:center;
        overflow:hidden;
        color:#ffffff;
        background-color:#67C23A;
    }
</style>