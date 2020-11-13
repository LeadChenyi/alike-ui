<template>
    <div class="class-page">
        类
    </div>
</template>

<script>
import Son from '@/utils/son.js'
export default {
    name:"Class",
    data(){
        return {
            son:null
        }
    },
    mounted(){
        this.initSon();
    },
    methods:{
        initSon(){
            this.son =  new Son();
            this.son.comment();
            console.log('-------class method-------');
            this.son.getPublic();
            Son.getPrivate();
            console.log('-------class data-------');
            console.log(this.son.a);
            console.log(Son.b);
            console.log(this.son.c);
        }
    }
}
</script>

<style>

</style>