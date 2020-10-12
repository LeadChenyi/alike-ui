<template>
    <div class="reg-page">
        
    </div>
</template>

<script>
/**
 * 
 * 正则表达式：https://www.runoob.com/regexp/regexp-tutorial.html
 * RegExp：https://www.runoob.com/jsref/jsref-obj-regexp.html
 * 在线测试：http://c.runoob.com/front-end/854
 */
import Validate from '@/utils/validate'
export default {
    name:"Reg",
    data(){
        return {
            username:"愁云楚驿长",
            password:"a123456",
            validate:null,
            test1:"lala不正确",
            test2:"0000false",
            test3:"0000false"
        }
    },
    mounted(){
        this.validateUsername();
        this.validatePassword();
        this.initValidate();
    },
    methods:{
        validateUsername(){
            // RegExp的对象方法
            let r1 = /云/.exec(this.username);          // 返回有关的数组信息（同于String的对象match方法）
            let r2 = /\w+/.test(this.username);         // 返回Boolean

            console.log('r1',r1);
            console.log('r2',r2);
            console.log('-----分界线-----');


            // String的对象方法
            let s1 = this.username.search(/云/);        // 返回下标
            let s2 = this.username.match(/云/);         // 返回有关的数组信息
            let s3 = this.username.replace(/云/,"彩");  // 返回替换的新字符串
            let s4 = this.username.split(/云/);         // 返回切割的数组

            console.log('s1',s1);
            console.log('s2',s2);
            console.log('s3',s3);
            console.log('s4',s4);
            console.log('-----分界线-----');
        },
        validatePassword(){
            // a-zA-Z0-9_ 等同于 \w
            let p1 = /^[a-zA-Z0-9_]{6,40}$/.test(this.password);
            let p2 = /^[\w]{6,40}$/.test(this.password);
            console.log('p1',p1)
            console.log('p2',p2)
            console.log('-----分界线-----');
        },
        initValidate(){
            this.validate = new Validate();
            console.log(this.validate.chinese(this.test1));
            console.log(this.validate.chinese(this.test2));
            console.log(this.validate.password(this.test3));
            console.log(this.validate.confirm(this.test2,this.test3));
            console.log('-----分界线-----');
        }
    }
}
</script>

<style>

</style>