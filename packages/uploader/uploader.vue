<template>
	<div class="alike-uploader" :class="[file ? 'alike-uploader--active':'alike-uploader--default']" @click="chooseFile">
        <div class="alike-uploader__preview" v-if="file">
            <img class="alike-uploader__preview-image" :src="file" />
            <div class="alike-uploader__preview-mask">
                <span class="alike-uploader__preview-icon" @click.stop="deleteFile">
                    <alike-icon type="delete" size="30px" color="#ffffff"></alike-icon>
                </span>
            </div>
        </div>
        <alike-icon type="plus" size="30px" color="#999999" v-else></alike-icon>

        <input class="alike-uploader__input" ref="uploaderFinder" type="file" @change="changeFile" />
    </div>
</template>

<script>
/**
 * alive-uploader
 * @property file {String} 图片地址
 * @property automatic {Boolean} 是否开启文件自动验证
 * @property size {Boolean} 支持上传文件的大小
 * @property types {Array} 支持上传文件的格式
 * @event change {Function} 上传图片时触发
 * @event delete {Function} 删除图片时触发
 */

export default {
    name: "alike-uploader",
    props:{
        file:{
            type:String,
            default:""
        },
        automatic:{
            type:Boolean,
            default:true
        },
        size:{
            type:Number,
            default:2097152     //  2md = 2 * 1024 * 1024
        },
        types:{
            type:Array,
            default:()=>["image/png","image/jpg","image/jpeg","image/gif"]
        }
    },
	methods: {
		chooseFile() {
            // 是否已经有上传的文件
			if (this.file || this.$refs.uploaderFinder.value) {
				return false;
            }

			this.$refs.uploaderFinder.click();
		},
		changeFile(e) {
			// 由于配置了babel-loader，无需处理兼容性
            let tempFile = e.target.files[0];
            let tempFilePath = window.URL.createObjectURL(tempFile);
            this.$emit('change',tempFile); 

            if(this.automatic){
                if(tempFile.size > this.size){
                    this.$emit('fail',{msg:`图片上传大小不得超过${this.size}字节`});
                    return false;
                }

                if(!this.types.includes(tempFile.type)){
                    this.$emit('fail',{msg:`图片类型仅支持${this.types.join(',')}`});
                    return false;
                }
            }

            this.$emit('success',{file:tempFile,filePath:tempFilePath});
		},
		deleteFile() {
            // 解决单文件上传模式被删除后无法再次触发上传控件的问题
            if(this.$refs.uploaderFinder.value){
                this.$refs.uploaderFinder.value = null;
            }

            this.$emit('delete');
		}
	}
};
</script>

<style scoped>
    .alike-uploader{
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
    .alike-uploader--default:hover{
        border-color:#409EFF;
    }
    .alike-uploader--active{
        cursor:auto;
    }

    .alike-uploader__preview{position:relative;width:100%;height:100%;border-radius:6px;}
    .alike-uploader__preview-image{width:100%;height:100%;border-radius:6px;}
    .alike-uploader__preview-mask{
        position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,.7);opacity:0;
        transition:opacity 500ms ease;
    }
    .alike-uploader__preview:hover .alike-uploader__preview-mask{opacity:1;}
    .alike-uploader__preview-icon{
        cursor: pointer;
    }
    .alike-uploader__input {
        display: none;
    }
</style>