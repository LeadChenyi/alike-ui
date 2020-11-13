
import Father from './father.js'

export default class Son extends Father{

    a = "公共属性";
    static b = "静态属性";

    constructor(){
        super();
        console.log('Son Class Ready');
        
        this.functionName = "子类";
        this.c = "实例属性";
    }

    comment(){
        console.log('Son Class Comment');
    }

    getPublic(){
        console.log('公共方法');
    }

    static getPrivate(){
        console.log('静态方法');
    }
}

/**
    1、类声明规范首字母大写，调用时需要先使用new关键字实例化（同构造函数）
    2、当继承父类同时还要使用子类构造器时，必须先调用super方法获取父类权限才能正常使用子类构造器
    3、如果子类和父类拥有相同的方法，那么就近原则先获取子类的方法再向上级获取
    4、三大属性：a公共属性、b静态属性、c实例属性（公共属性等同于实例属性）
    5、两大方法：a公共属性、b静态属性
    6、静态属性或方法不能被实例化调用，只能通过类直接使用
    7、子类继承父类时必须在构造器的第一行调用super，避免this指向问题
 */

/**
    单个导出：
        遵循CommonJS
        module.exports = {Father}
        const Father = require('./father.js');

        遵循ES6
        export default class Father
        import Father from './father.js'


    多个导出：一个文件只能指定一个默认导出，其余为普通导出
        export default User
        export login
        export logout
        import User,{login,logout} from './user.js'
*/