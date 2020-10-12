<template>
    <div class="drag-page">
        <alike-divider>元素拖动迁移</alike-divider>
        <div class="drag-move">
            <div id="left" class="drag-move__item" ref="moveLeftFinder">
                <div v-for="(item,index) in moveLefts" :key="index">
                    <p v-if="item.type == 'text'" :id="`move_${index}`" :data-index="index" class="drag-move__item-text" draggable="true" v-draggable-move>{{item.content}}</p>
                    <img v-else-if="item.type == 'image'" :id="`move_${index}`" :data-index="index" class="drag-move__item-image" :src="item.content" draggable="true" v-draggable-move />
                </div>
            </div>
            <div id="right" class="drag-move__item" ref="moveRightFinder">
                <div v-for="(item,index) in moveRights" :key="index">
                    <p v-if="item.type == 'text'" :id="`move_${index}`" :data-index="index"  class="drag-move__item-text" draggable="true" v-draggable-move>{{item.content}}</p>
                    <img v-else-if="item.type == 'image'" :id="`move_${index}`" :data-index="index" class="drag-move__item-image" :src="item.content" draggable="true" v-draggable-move />
                </div>
            </div>
        </div>

        <alike-divider>元素拖动清理</alike-divider>
        <div class="drag-clear">
            <div class="drag-clear-box" ref="clearBoxFinder">
                清理箱
            </div>
            <div class="drag-clear-list">
                <div class="drag-clear__item" v-for="(item,index) in clears" :key="index" :id="`clear_${index}`" :data-index="index" draggable="true" v-draggable-clear>{{item}}</div>
            </div>
        </div>

        <alike-divider>元素拖动排序</alike-divider>
        <div ref="sortFinder" class="drag-sort">
            <div class="drag-sort__item" v-for="(item,index) in sorts" :key="index" :id="`sort_${index}`" :data-index="index" draggable="true" v-draggable-sort>{{item}}</div>
        </div>
    </div>
</template>

<script>


export default {
    name:"Drag",
    data(){
        return {
            moveLefts:[
                {
                    type:"text",
                    content:"这是一个可迁移的文本"
                },
                {
                    type:"image",
                    content:"http://cloud7.galloping.xyz/aliveui_mpcode.jpg"
                }
            ],
            moveRights:[],
            moveIndex:0,
            clears:["Ming","Xiaohu","Uzi","Mlxg","Letme"],
            clearIndex:0,
            sorts:["小明","小虎","小狗","小锅","小让"],
            sortBeforeIndex:null,
            sortAfterIndex:null
        }
    },
    mounted(){
        this.initMoveEvent('moveLeftFinder');
        this.initMoveEvent('moveRightFinder');
        this.initClearEvent();
        this.initSortEvent();
    },
    methods:{
        initMoveEvent(finder){
            let vm = this; 
            this.$refs[finder].ondragenter = function(e){
                e.preventDefault();
                let el = e.target || e.srcElement;

                if(el.className == 'drag-move__item'){
                    el.style.border = '1px dotted #409eff';
                }   
            }
            this.$refs[finder].ondragover = function(e){
                e.preventDefault();
            }   
            this.$refs[finder].ondragleave = function(e){
                e.preventDefault();

                let el = e.target || e.srcElement;
                if(el.className == 'drag-move__item'){
                    el.style.border = '1px dotted #e8e8e8';
                }
            }
            this.$refs[finder].ondrop = function(e){
                e.preventDefault();
                // console.log(`${e.target.id} area...`);
                if(e.target.className == 'drag-move__item'){
                    let moveElement = e.dataTransfer.getData("move");
                    if(moveElement.indexOf('move') != -1){
                        if(e.target.id == 'right'){
                           vm.moveRights.push(vm.moveLefts.splice(vm.moveIndex,1)[0]);
                        }else{
                            vm.moveLefts.push(vm.moveRights.splice(vm.moveIndex,1)[0]);
                        }
                    }
                    e.target.style.border = '1px dotted #e8e8e8';
                }
            }            
        },
        initClearEvent(){
            let vm = this;
            this.$refs.clearBoxFinder.ondragenter = function(e){
                e.preventDefault();

                let el = e.target || e.srcElement;
                if(el.className == 'drag-clear-box'){
                    el.style.backgroundColor = '#F56C6C';
                }
            }            
            this.$refs.clearBoxFinder.ondragover = function(e){
                e.preventDefault();
            }            
            this.$refs.clearBoxFinder.ondragleave = function(e){
                e.preventDefault();

                let el = e.target || e.srcElement;
                if(el.className == 'drag-clear-box'){
                    el.style.backgroundColor = '#67C23A';
                }
            }            
            this.$refs.clearBoxFinder.ondrop = function(e){
                e.preventDefault();
                let el = e.target || e.srcElement;
                if(el.className == 'drag-clear-box'){
                    let clearElement = e.dataTransfer.getData("clear");
                    if(clearElement.indexOf('clear') != -1){
                        vm.clears.splice(vm.clearIndex,1);
                    }
                    el.style.backgroundColor = '#67C23A';
                }
            }
        },
        initSortEvent(){
            let vm = this;
            this.$refs.sortFinder.ondragenter = function(e){
                e.preventDefault();
                // 这里只能获取到经过区域的元素
                if(e.target.className == 'drag-sort__item'){
                    e.target.style.border = '1px solid #409eff';
                }
            }            
            this.$refs.sortFinder.ondragover = function(e){
                e.preventDefault(); 
                // 这里可以获取到当前区域的元素
                if(e.target.className == 'drag-sort__item'){
                    vm.sortAfterIndex = e.target.dataset.index;
                }else{
                    vm.sortAfterIndex = null;
                }
            }            
            this.$refs.sortFinder.ondragleave = function(e){
                e.preventDefault();
                if(e.target.className == 'drag-sort__item'){
                    e.target.style.border = '1px solid #e8e8e8';
                }
            }            
            this.$refs.sortFinder.ondrop = function(e){
                e.preventDefault();
                // console.log(vm.sortBeforeIndex,vm.sortAfterIndex);
                e.target.style.border = '1px solid #e8e8e8';
                if(vm.sortBeforeIndex && vm.sortAfterIndex){
                    vm.exchangeArray(vm.sorts,vm.sortBeforeIndex,vm.sortAfterIndex);
                    vm.$nextTick(function(){
                        vm.sortBeforeIndex = null;
                        vm.sortAfterIndex = null;
                    })
                }
            }
        },
        exchangeArray(datas,zIndex,cIndex){// 对调数组中的子元素，参数为（数据源,主下标,次下标）
            let cDel = datas.splice(cIndex,1,datas[zIndex]);
            datas.splice(zIndex,1,cDel[0]);
        }
    },
    directives:{
        draggableMove(el,bindng,vnode){
            let vm = vnode.context;
            el.addEventListener('dragstart',function(e){
                vm.moveIndex = e.target.dataset.index;
                // 表示允许的拖动操作 （move:一个项目可能被移动到新位置）
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("move",e.target.id);
                e.target.style.opacity = 0.3;
            })

            el.addEventListener("drag", function(e) {
               e.preventDefault();
            })

            el.addEventListener('dragend',function(e){
                e.target.style.opacity = 1;
            })
        },
        draggableClear(el,bindng,vnode){
            let vm = vnode.context;
            el.addEventListener('dragstart',function(e){
                vm.clearIndex = e.target.dataset.index;
                e.dataTransfer.setData("clear",e.target.id);
                e.target.style.opacity = 0.3;
            })

            el.addEventListener("drag", function(e) {
               e.preventDefault();
            })

            el.addEventListener('dragend',function(e){
                e.target.style.opacity = 1;
            })
        },
        draggableSort(el,bindng,vnode){
            let vm = vnode.context;
            el.addEventListener('dragstart',function(e){
                vm.sortBeforeIndex = e.target.dataset.index;
                e.dataTransfer.setData("sort",e.target.id);
                e.target.style.opacity = 0.3;
            })

            el.addEventListener("drag", function(e) {
               e.preventDefault();
            })

            el.addEventListener('dragend',function(e){
                e.target.style.opacity = 1;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .drag-move__item{
        display:inline-block;
        width:200px;
        height:200px;
        margin-right:20px;
        border:1px solid #e8e8e8;
        overflow:hidden;

        & .drag-move__item-image{
            width:50px;
            height:50px;
        }
    }

    .drag-clear{
        position:relative;overflow:hidden;display:flex;

        & .drag-clear-box{
            display:inline-block;
            width:200px;
            height:200px;
            line-height:200px;
            text-align:center;
            margin-right:20px;
            overflow:hidden;
            color:#ffffff;
            background-color:#67C23A;
        }

        & .drag-clear-list{
            display:inline-block;
            width:300px;
            overflow:hidden;
            display:inline-block;
            margin-right:20px;
        }

        & .drag-clear__item{
            padding:20px;
            border:1px solid #e8e8e8;
            background-color:#f8f8f8;
            color:#666666;
            font-size:15px;
            margin-bottom:5px;
            cursor:move;
        }
    }

    .drag-sort{
        position:relative;overflow:hidden;width:300px;

        & .drag-sort__item{
            padding:20px;
            border:1px solid #e8e8e8;
            background-color:#f8f8f8;
            color:#666666;
            font-size:15px;
            margin-bottom:5px;
            cursor:move;
        }
    }
</style>