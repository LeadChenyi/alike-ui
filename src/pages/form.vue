<template>
    <div class="form-page">
        <alike-divider>单图上传器</alike-divider>
        <alike-uploader :enable-drag="true" :file="file" @success="successFile" @fail="failFile" @delete="deleteFile"></alike-uploader>
        
        <alike-divider>多图上传器</alike-divider>
        <alike-uploaders :enable-drag="true" :files="files" @success="successFiles" @fail="failFiles" @delete="deleteFiles"></alike-uploaders>
        
        <alike-divider>穿梭框</alike-divider>
        <div class="alike-transfer">
            <div class="alike-transfer-area alike-transfer-left">
                <div class="alike-transfer-header">
                    左列表 - {{getTotalLeft}}/{{transferLeft.length}}
                </div>                
                <div class="alike-transfer-section">
                    <label class="alike-transfer__item" v-for="(item,index) in transferLeft" :key="index">
                        <input class="alike-transfer__item-input" type="checkbox" v-model="item.checked" />
                        <span class="alike-transfer__item-label">{{item.label}}</span>
                    </label>
                </div>
            </div>
            <div class="alike-transfer-handle alike-transfer-center">
                <alike-button :disabled="getTotalRight == 0 ? true : false" @click="toTransferLeft">
                    <alike-icon type="arrow-left" color="#ffffff"></alike-icon>
                </alike-button>                
                <alike-button :disabled="getTotalLeft == 0 ? true : false" @click="toTransferRight">
                    <alike-icon type="arrow-right" color="#ffffff"></alike-icon>
                </alike-button>
            </div>
            <div class="alike-transfer-area alike-transfer-right">
                <div class="alike-transfer-header">
                    右列表 - {{getTotalRight}}/{{transferRight.length}}
                </div>                
                <div class="alike-transfer-section">
                    <label class="alike-transfer__item" v-for="(item,index) in transferRight" :key="index">
                        <input class="alike-transfer__item-input" type="checkbox" v-model="item.checked" />
                        <span class="alike-transfer__item-label" :class="[item.checked ? 'alike-transfer__item-label--active':'']">{{item.label}}</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import alikeUploader from '../../packages/uploader/uploader'
import alikeUploaders from '../../packages/uploaders/uploaders'

export default {
    name:"Form",
    components:{
        alikeUploader,
        alikeUploaders
    },
    data(){
        return {
            file:"http://cloud7.galloping.xyz/aliveui_mpcode.jpg",
            files:[
                {
                    url:"http://cloud7.galloping.xyz/aliveui_mpcode.jpg",
                    file:""
                }
            ],
            transfers:[
                {
                    id:1,
                    label:"北京",
                    enabled:false,
                    checked:false,
                    disabled:false
                },
                {
                    id:2,
                    label:"上海",
                    enabled:false,
                    checked:false,
                    disabled:false
                },                
                {
                    id:3,
                    label:"广州",
                    enabled:false,
                    checked:false,
                    disabled:false
                },               
                {
                    id:4,
                    label:"深圳",
                    enabled:true,
                    checked:false,
                    disabled:false
                },                
                {
                    id:5,
                    label:"厦门",
                    enabled:true,
                    checked:false,
                    disabled:false
                }
            ],
            transferLeft:[],
            transferRight:[]
        }
    },
    mounted(){
        this.initTransfer();
    },
    methods:{
        successFile(e){
            console.log(e);
            this.file = e.filePath;

            let formData = new FormData();
            formData.append('avatar',e.file);

            // this.$axios({
            //     url:'/upload',
            //     method:'post',
            //     data:formData,
            //     headers:{'Content-Type':'multipart/form-data','X-Requested-With': 'XMLHttpRequest'}
            // }).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});

            /*
                为什么要使用multipart/form-data
                因为此类型不适合用于传输大型二进制数据或者包含非ASCII字符的数据。
                平常我们使用application/x-www-form-urlencoded这个类型都是把表单数据使用url编码后传送给后端，
                二进制文件当然没办法一起编码进去了。所以multipart/form-data就诞生了，专门用于有效的传输文件。
            */
        },
        failFile(detail){
            console.log(detail);
        },
        deleteFile(){
            this.file = "";
        },
        successFiles(e){
            console.log(e);
            let tempFiles = e.files;
            let tempFilePaths = e.filePaths;

            tempFiles.forEach((item,index)=>{
                this.files.push({
                    url:tempFilePaths[index],
                    file:item
                })
            })

            let formData = new FormData();
            this.files.forEach((item)=>{
                formData.append('albums[]',item.file);
            })
            console.log(formData);
        },
        failFiles(detail){
            console.log(detail);
        },
        deleteFiles(index){
            this.files.splice(index,1);
        },
        initTransfer(){
            this.transfers.forEach((item,index)=>{
                if(item.enabled){// 分组判断哪些是启用的
                    this.transferRight.push(item);
                }else{
                    this.transferLeft.push(item);
                }
            })
        },
        toTransferLeft(){
            // 这里不能使用下标删除否则会影响后续的下标顺序，所以先保留未被选中的项
            let originals = this.transferRight.filter((item)=>{
                return !item.checked;
            })

            this.transferRight.forEach((item,index)=>{
                if(item.checked){
                    this.transferLeft.push({
                        ...item,
                        checked:false,
                        enabled:false
                    });
                }
            })

            this.transferRight = originals;
            this.toTransferDispatch();
        },
        toTransferRight(){
            let originals = this.transferLeft.filter((item)=>{
                return !item.checked;
            })

            this.transferLeft.forEach((item,index)=>{
                if(item.checked){
                    this.transferRight.push({
                        ...item,
                        checked:false,
                        enabled:true
                    });
                }
            })

            this.transferLeft = originals;
            this.toTransferDispatch();
        },
        toTransferDispatch(){
            let details = [...this.transferLeft,...this.transferRight];
            details.sort((a,b)=>{
                return a.id - b.id
            });
            console.log('toTransferDispatch：',details)
        }
    },
    computed:{
        getTotalLeft(){
            let count = 0;
            this.transferLeft.forEach((item,index)=>{
                if(item.checked){
                    count++;
                }
            })
            return count;
        },
        getTotalRight(){
            let count = 0;
            this.transferRight.forEach((item,index)=>{
                if(item.checked){
                    count++;
                }
            })
            return count;
        }
    }
}
</script>

<style lang="scss" scoped>
.alike-transfer{
    width:600px;
    display:flex;

    & .alike-transfer-area{
        flex:1;
        border-radius:5px;
        border: 1px solid rgba(0,0,0,.125);
    }
    & .alike-transfer-header{
        padding:10px 15px;
        background-color: rgba(0,0,0,.03);
        border-bottom: 1px solid rgba(0,0,0,.125);
    }

    & .alike-transfer-center{
        width:100px;margin:0 20px;display:flex;justify-content:space-between;align-items:center;
    }

    & .alike-transfer__item{
        display:flex;
        align-items:center;
        padding:10px;
        cursor: pointer;
        &:hover{
            background-color:#f8f8f8;
        }

        & .alike-transfer__item-input{
            margin-right:5px;
            cursor: pointer;
            width:20px;
            height:20px;
        }

        & .alike-transfer__item-label{
            font-size:15px;color:#333333;user-select:none;
            &:hover{
                color:#3485FB;
            }
        }
        & .alike-transfer__item-label--active{
            color:#3485FB;
        }
    }
}
</style>