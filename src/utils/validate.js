export default class Validate {
    constructor(options){
        // { required: true, message: '请输入活动名称', trigger: 'blur' },
        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        console.log('validate ready')
    }

    chinese(str){
        return /^[\u4e00-\u9fa5]{1,}$/.test(str);
    }

    english(str){
        return /^[A-Za-z]{1,}$/.test(str);
    }

    accountNumber(str){
        return /^[\w]{4,15}$/.test(str);
    }

    password(str,min,max){
        if(min != null && min != 6 && max != null && max > min){
            return /^[\w]$/.test(str) && str.length >= min && str.length < max;
        }else if(min != null && min != 6){
            return /^[\w]$/.test(str) && str.length >= min;
        }else{
            return /^[\w]{6,}$/.test(str);
        }
    }

    confirm(str1,str2){
        return str1 == str2 && str1 != ""
    }

    phone(str){
        return /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(str);
    }

    tel(str){
        return /\d{3}-\d{8}|\d{4}-\d{7}/.test(str);
    }

    identityCard(str){// 身份证
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    }

    email(str){
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str);
    }

    url(str){
        return /^https?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/.test(str);
    }

    ip(str){
        return /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/.test(str);
    }
}