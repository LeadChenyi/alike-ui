<script>
export default {
    name:"render-one",
    props:{
        message:{
            type:String,
            default:"这是一个使用render函数渲染的节点"
        }
    },
    render(createElement){
        // createElement 参数（标签，数据，子节点）
        return createElement('div',this.message);
    }
}
</script>

<style>

</style>