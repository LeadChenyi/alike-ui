<template>
    <div class="alike-sticky" :class="[sticked && !scrollView ? 'alike-sticky--active':'',sticked && scrollView ? 'alike-sticky-scrollview--active':'']" :style="{top:this.scrollView ? topValue:top,left:left}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name:"alike-sticky",
    props:{
        top:{
            type:String,
            default:"0px"
        },        
        left:{
            type:String,
            default:"0px"
        },
        scrollView:{
            type:String,
            default:""
        }
    },
    data(){
        return {
            sticked:false,
            offsetTop:parseInt(this.top),
            topValue:0
        }
    },
    mounted(){
        this.initSticky();
    },
    methods:{
        initSticky(){
            if(this.scrollView){
                let doc = document.querySelector(`#${this.scrollView}`);
                doc.onscroll = (e)=>{
                    // console.log('scrollview scrollTop',e.target.scrollTop);
                    let scrollTop = e.target.scrollTop;
                    let offsetHeight = e.target.offsetHeight;
                    // console.log(scrollTop,this.offsetTop,offsetHeight,this.$el.offsetTop)
                    if(scrollTop >= (offsetHeight - this.offsetTop)){
                        this.sticked = true;
                    }else{
                        this.sticked = false;
                    }
                }
            }else{
                document.onscroll = (e)=>{
                    // console.log('document scrollTop',e.target.scrollingElement.scrollTop);
                    let scrollTop = e.target.scrollingElement.scrollTop;
                    let offsetHeight = e.target.scrollingElement.offsetHeight;
                    // console.log(scrollTop,this.offsetTop)
                    if(scrollTop >= (offsetHeight - this.offsetTop)){
                        this.sticked = true;
                    }else{
                        this.sticked = false;
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.alike-sticky{z-index:1;}
.alike-sticky--active{position:fixed;}
.alike-sticky-scrollview--active{position:absolute;}
</style>