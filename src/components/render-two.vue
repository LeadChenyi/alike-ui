<script>
export default {
    name:"render-two",
    props:{
        types:{
            type:Array,
            default:()=>[]
        }
    },
    render(createElement){
        if(this.types.length){
            return createElement('ul',this.types.map((item)=>{
                return createElement('li',item)
            }));
        }else{
            return createElement('div','暂无相关数据');
        }
    }
}
</script>

<style>

</style>