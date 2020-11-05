<template>
    <div class="class-page">
        类
    </div>
</template>

<script>
import Children from '@/utils/children.js'
export default {
    name:"Class",
    data(){
        return {
            children:null
        }
    },
    mounted(){
        this.initChildren();
    },
    methods:{
        initChildren(){
            this.children =  new Children();
            this.children.comment();
            console.log('-------class method-------');
            this.children.getPublic();
            Children.getPrivate();
            console.log('-------class data-------');
            console.log(this.children.a);
            console.log(Children.b);
            console.log(this.children.c);
        }
    }
}
</script>

<style>

</style>