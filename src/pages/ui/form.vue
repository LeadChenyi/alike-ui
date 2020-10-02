<template>
    <div class="form-page">
        <alike-divider>表单选择器</alike-divider>
        <alike-select v-model="selectValue" :readonly="selectReadonly" @change="changeSelectValue">
            <alike-select-options>
                <alike-select-item name="北京">北京</alike-select-item>
                <alike-select-item name="上海">上海</alike-select-item>
                <alike-select-item name="广州">广州</alike-select-item>
            </alike-select-options>
        </alike-select>
        <div>{{selectValue}}</div>

        <alike-divider>单图上传器</alike-divider>
        <alike-uploader :enable-drag="true" :file="file" @success="successFile" @fail="failFile" @delete="deleteFile"></alike-uploader>
        
        <alike-divider>多图上传器</alike-divider>
        <alike-uploaders :enable-drag="true" :files="files" @success="successFiles" @fail="failFiles" @delete="deleteFiles"></alike-uploaders>
        
        <alike-divider>穿梭框</alike-divider>
        <alike-transfer :transfers="transfers" @change="changeTransfer"></alike-transfer>

        <alike-divider>表单控件</alike-divider>
        <alike-input v-model="userName"></alike-input>
        <div>{{userName}}</div>
        <alike-input type="password" v-model="password" :show-password="true"></alike-input>
    </div>
</template>

<script>
import alikeUploader from '../../../packages/uploader/uploader'
import alikeUploaders from '../../../packages/uploaders/uploaders'
import alikeTransfer from '../../../packages/transfer/transfer'
import alikeSelect from '../../../packages/select/select'
import alikeSelectOptions from '../../../packages/select/select-options'
import alikeSelectItem from '../../../packages/select/select-item'

export default {
    name:"Form",
    components:{
        alikeUploader,
        alikeUploaders,
        alikeTransfer,
        alikeSelect,
        alikeSelectOptions,
        alikeSelectItem
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
            userName:"此言很差矣",
            password:"123456",
            selectValue:"北京",
            // 表单选择器当前readonly为false时即可表单输入
            selectReadonly:true
        }
    },
    methods:{
        changeSelectValue(detail){
            console.log('changeSelectValue：',detail);
        },
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
        changeTransfer(detail){
            console.log('changeTransfer：',detail);
        }
    }
}
</script>

<style>

</style>