<template>
    <div class="index-page">
        <div class="index-wrap">
            <div class="index-item">
                index
            </div>
        </div>
    </div>
</template>

<script>
import Api from '@/api/axios/index.js'

export default {
    name:"Index",
    mounted(){
        this.initData();
    },
    methods:{
        initData(){
            Api.photo.getPhotos().then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .text-primary{color:$alike-color-primary;}
    .index-wrap{
        cursor:pointer;
        display:flex;
        background-color:$alike-color-white;

        &:hover{
            background-color:$alike-color-default;
        }

        .index-item{
            font-size:18px;
            color:$alike-color-primary;
        }
    }
</style>