<template>
    <div class="form-page">
        <alike-uploader :file="file" @success="successFile" @fail="failFile" @delete="deleteFile"></alike-uploader>
        <alike-line></alike-line>
        <alike-uploaders :files="files" @success="successFiles" @fail="failFiles" @delete="deleteFiles"></alike-uploaders>
        <alike-line></alike-line>
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
            ]
        }
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
        }
    }
}
</script>

<style>

</style>