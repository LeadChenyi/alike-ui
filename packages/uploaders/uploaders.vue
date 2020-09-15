<template>
    <div class="alike-uploaders">
        <div class="alike-previews" v-if="files.length">
            <div class="alike-preview__item" v-for="(item,index) in files" :key="index">
                <img class="alike-preview__item-image" :src="item.url" />
                <alike-icon class="alike-preview__item-delete" type="delete" size="30px" color="#666666" @click="deleteFiles(index)"></alike-icon>
            </div>
        </div>

        <div class="alike-uploader" :class="[files.length ? 'alike-uploader--active':'alike-uploader--invalid']" v-if="files.length < count" @click="chooseFiles">
            <alike-icon type="plus" size="30px" color="#999999"></alike-icon>
            <input class="alike-uploader__input" ref="uploaderFinder" type="file" :multiple="count > 1" @change="changeFiles" />
        </div>
    </div>
</template>

<script>
/**
 * alive-uploaders
 * @property files {Array} 图片集合
 * @property count {Number} 最大上传数量（默认值：9）
 * @property automatic {Boolean} 是否开启文件自动验证
 * @property size {Boolean} 支持上传文件的大小
 * @property types {Array} 支持上传文件的格式
 * @event change {Function} 上传图片时触发
 * @event delete {Function} 删除图片时触发
 * @event fail {Function} 删除图片时触发
 * @event delete {Function} 删除图片时触发
 */

export default {
    name:"alike-uploaders",
    props:{
        files:{
            type:Array,
            default:()=>[]
        },
        count:{
            type:Number,
            default:9
        },
        automatic:{
            type:Boolean,
            default:true
        },
        size:{
            type:Number,
            default:2097152
        },
        types:{
            type:Array,
            default:()=>["image/png","image/jpg","image/jpeg","image/gif"]
        }
    },
    methods:{
        chooseFiles() {
			this.$refs.uploaderFinder.click();
		},
		changeFiles(e) {
			// 由于配置了babel-loader，无需处理兼容性
            let tempFiles = e.target.files;
            let tempFilePaths = [];
            
            if((tempFiles.length + this.files.length) > this.count){
                this.$emit('fail',{msg:`最大支持上传${this.count}文件`});
                return false;
            }

            for(let i = 0;i < tempFiles.length;i++){
                let item = window.URL.createObjectURL(tempFiles[i]);
                tempFilePaths.push(item);
            }

            this.$emit('change',tempFiles,tempFilePaths);

            if(this.automatic){
                const {collectFiles,collectFilePaths} = this.verifyFiles(tempFiles,tempFilePaths);
                this.$emit('success',{files:collectFiles,filePaths:collectFilePaths});
            }
        },
        verifyFiles(tempFiles,tempFilePaths){
            let collectFiles = [];				// 储存符合标准的文件
            let collectFilePaths = [];			// 储存符合标准的临时文件
            let collectIndexs = [];				// 储存不符合标准的文件下标（用于删除tempFilePaths中对应的临时路径）
            let collectNames = [];				// 储存不符合标准的文件名称（用于提示哪些文件不符合标准）

            // 验证图片大小及图片类型
            tempFiles.forEach((item,index)=>{
                if(item.size < this.size && this.types.includes(item.type)){
                    collectFiles.push(item);
                }else{
                    collectNames.push(item.name);
                    collectIndexs.push(index);
                }
            });
            
            // 根据验证结果取出相对应的临时路径
            if(collectIndexs.length){
                this.$emit('fail',{size:this.size,types:this.types,names:collectNames,msg:'以上资源文件大小或文件类型不符合标准'});
                
                tempFilePaths.forEach((item,index)=>{
                    if(!collectIndexs.includes(index)){
                        collectFilePaths.push(item);
                    }
                })
            }else{
                collectFilePaths = tempFilePaths;
            }
            
            return {
                collectFiles,
                collectFilePaths
            }
        },
		deleteFiles(index) {
            this.$emit('delete',index);
		}
    }
}
</script>

<style scoped>
    .alike-uploader{
        display:inline-block;
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
    .alike-uploader--invalid:hover{
        border-color:#409EFF;
    }

    .alike-previews{
        display:inline-flex;
    }

    .alike-preview__item{
        position:relative;width: 178px;height: 178px;border-radius:6px;margin-right:10px;
    }
    
    .alike-preview__item-image{width:100%;height:100%;border-radius:6px;}
    .alike-preview__item-delete{
        position:absolute;top:5px;right:5px;cursor:pointer;
    }

    .alike-uploader__input {
        display: none;
    }
</style>