<template>
    <div class="alike-input">
        <input class="alike-input__inner" :type="elType" :value="value" :readonly="readonly" :placeholder="placeholder" @input="$emit('input',$event.target.value)" />
        <div class="alike-input__password" @click="toggleType" v-if="showPassword">
            <alike-icon :type="elType == 'password' ? 'like-fill':'like' " color="#999999"></alike-icon>
        </div>
    </div>
</template>

<script>
/**
* alike-input
* @describe 表单
* @website http://alike.galloping.xyz
* @property type {String} 表单类型（默认值：text，可选值参考原生input标签）
* @property value {String,Number} 表单的值（默认值：text，可选值参考原生input标签）
* @property placeholder {String} 表单为空时的占位符
* @property showPassword {Boolean} 是否显示明文密码
* @event input {Function} 修改表单的值时触发
*/
export default {
    name:"alike-input",
    props:{
        type:{
            type:String,
            default:"text"
        },   
        value:{
            type:[String,Number],
            default:""
        },  
        readonly:{
            type:Boolean,
            default:false
        },
        placeholder:{
            type:String,
            default:""
        },
        showPassword:{
            type:Boolean,
            default:false
        }
    },
    model:{
        prop:'value',
        event:'input'
    },
    data(){
        return {
            elType:this.type
        }
    },
    methods:{
        toggleType(){
            if(this.elType == 'password'){
                this.elType = 'text';
            }else{
                this.elType = 'password';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .alike-input{
        position:relative;
        font-size:14px;
        display:inline-block;
        width:100%;
        cursor:pointer;

        .alike-input__inner{
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);
            width: 100%;

            &:focus{
                border: 1px solid $alike-color-primary;
            }
        }

        .alike-input__inner{
            &:focus{
                border: 1px solid $alike-color-primary;
            }

            &[readonly]{
                cursor:pointer;
            }            

            &[readonly]:focus{
                border: 1px solid #dcdfe6;
            }
        }

        .alike-input__password{
            position: absolute;
            height: 40px;
            line-height: 40px;
            right: 10px;
            top: 0;
            bottom: 0;
            cursor: pointer;
            user-select: none;
        }
    }
</style>