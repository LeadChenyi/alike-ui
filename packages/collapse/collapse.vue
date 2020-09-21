<template>
    <div class="alike-collapse">
        <slot></slot>
    </div>
</template>

<script>
/**
 * alike-collapse 
 * @describe 折叠面板
 * @website http://alike.galloping.xyz
 * @property accordion {Boolean} 是否启用手风琴模式
 * @property active {String,Array} 折叠面板激活项
 * @event change {Function} 点击子面板时触发
 */
export default {
    name:"alike-collapse",
    props:{
        accordion:{
            type:Boolean,
            default:false
        },
        active:[String,Array]   // 不使用Number类型的原因是这两项数据类型都支持indexOf方法，更方便判断
    },
    provide(){
        return {
            collapse:this
        }
    },
    data(){
        return {
            activeName:this.active
        }
    },
    created() {
        this.$on('item-click', this.handleItemClick);
    },
    methods:{
        handleItemClick(item){
            if(this.accordion){
                if(this.activeName != item.name){
                    this.activeName = item.name;
                }else{
                    this.activeName = "";
                }
            }else{
                // 这里不推荐直接判断布尔值，因为数组是下标从0开始，而0即表示为false，或者用includes方法判断
                if(this.activeName.indexOf(item.name) != -1){
                    let index = this.activeName.indexOf(item.name);
                    this.activeName.splice(index,1);
                }else{
                    this.activeName.push(item.name);
                }
            }

            this.$emit('change',{value:this.activeName});
        }
    }
}
</script>

<style scoped>
    .alike-collapse{
        position:relative;overflow:hidden;
    }
</style>