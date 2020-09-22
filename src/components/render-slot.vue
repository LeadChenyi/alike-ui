<script>
export default {
    name:"render-slot",
    props:{
        size:{
            type:[String,Number],
            default:6
        }
    },
    render(createElement){
        return createElement('h'+this.size,this.$scopedSlots.default({
            size:this.size
        }));
    }
}
</script>

<style>

</style>