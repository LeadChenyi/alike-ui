<template>
    <div class="alike-cascade" @click.stop="handleClick">
        <alike-input class="alike-cascade-input" placeholder="请选择" v-model="defaultValue" :readonly="true"></alike-input>
        <alike-icon class="alike-cascade-icon" type="arrow-down"></alike-icon>
        
        <transition name="alike-fade">
            <div ref="cascadePopupFinder" class="alike-cascade-popup alike-arrow-top" v-show="showPopup">
                <div class="alike-cascade-options">
                    <div class="alike-cascade-item" :class="['alike-cascade-item--'+type]" v-for="(item,index) in cascades" :key="index" @click.stop="itemClick(0,item,index)">{{item.label}}</div>
                </div>
                <div class="alike-cascade-options" v-show="f2.length">
                    <div class="alike-cascade-item" :class="['alike-cascade-item--'+type]" v-for="(item,index) in f2" :key="index" @click.stop="itemClick(1,item,index)">{{item.label}}</div>
                </div>                
                <div class="alike-cascade-options" v-show="f3.length">
                    <div class="alike-cascade-item" :class="['alike-cascade-item--'+type]" v-for="(item,index) in f3" :key="index" @click.stop="itemClick(2,item,index)">{{item.label}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name:"alike-cascade",
    props:{
        cascades:{
            type:Array,
            default:()=>[]
        },
        value:{
            type:Array,
            default:()=>[]
        },
        type:{
            type:String,
            default:"primary"
        }
    },
    data(){
        return {
            showPopup:false,
            defaultValue:"",
            f2:[],
            f3:[],
            inValue:[]
        }
    },
    mounted(){
        document.body.appendChild(this.$refs.cascadePopupFinder);
        this.initDefaultValue();
    },
    destroyed(){
        document.body.removeChild(this.$refs.cascadePopupFinder);
    },
    methods:{
        initDefaultValue(){
            this.defaultValue = this.value.join(" / ");
        },
        handleClick(){
            let rect = {
                top:this.$el.offsetTop,
                left:this.$el.offsetLeft,
                width:this.$el.offsetWidth,
                height:this.$el.offsetHeight
            }
            this.$refs.cascadePopupFinder.style.top = (rect.top + rect.height) + "px";
            this.$refs.cascadePopupFinder.style.left = rect.left + "px";
            this.showPopup = !this.showPopup;

            document.onclick = (e)=>{
                if(this.showPopup){
                    this.showPopup = false;
                    document.onclick = null;
                    document.oncontextmenu = null;
                }
            }

            document.oncontextmenu = (e)=>{
                if(this.showPopup){
                    this.showPopup = false;
                    document.onclick = null;
                    document.oncontextmenu = null;
                }
            }
        },
        itemClick(colum,item,index){
            // console.log(colum,item,index);
            
            if(colum == 0 && this.cascades[index].children && this.cascades[index].children.length){
                this.f2 = this.cascades[index].children;
                this.f3 = [];
                this.inValue = [];
                this.inValue[this.inValue.length] = item.label;
            }else if(colum == 1 && this.f2[index].children && this.f2[index].children.length){
                this.f3 = this.f2[index].children;
                this.inValue = [this.inValue[0]];
                this.inValue[this.inValue.length] = item.label;
            }else{
                this.inValue[this.inValue.length] = item.label;
                this.showPopup = false;
                this.$emit('change',this.inValue);
            }
        }
    },
    watch:{
        value(newVal,oldVal){
            if(newVal != oldVal){
                this.initDefaultValue();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.alike-fade-enter-active,.alike-fade-leave-active{
    transition-property:opacity;
    transition-duration:300ms;
    transition-timing-function:ease;
}
.alike-fade-enter-to,.alike-fade-leave{
    opacity:1;
}
.alike-fade-enter,.alike-fade-leave-to{
    opacity:0;
}
.alike-cascade{width:300px;display:inline-block;box-sizing:border-box;position:relative;}
.alike-cascade-input >>> .alike-input__inner{
    padding-right:30px;
}
.alike-cascade-icon{
    position:absolute;
    top:50%;
    right:8px;
    transform:translateY(-50%);
    cursor:pointer;
}

.alike-cascade-popup{
    position:fixed;top:0;left:0;
    background-color:#ffffff;
    border:1px solid #e8e8e8;
    border-radius:2px;
    box-shadow:0 2px 12px 0 rgba(0,0,0,.3);
    z-index:900;
}
.alike-cascade-popup{position:absolute;top:0;left:0;padding:10px 0;margin:10px 0;background-color:#fff;border:1px solid #ebeef5;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);z-index:900;}
.alike-cascade-popup.alike-arrow-top:before,.alike-cascade-popup.alike-arrow-top:after{content:"";position:absolute;top:-10px;left:50%;margin-left:-10px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;}
.alike-cascade-popup.alike-arrow-top:before{border-bottom:10px solid #e6e6e6;}
.alike-cascade-popup.alike-arrow-top:after{top:-9px;border-bottom:10px solid #ffffff;}
.alike-cascade-popup.arrow-bottom:before,.alike-cascade-popup.arrow-bottom:after{content:"";position:absolute;bottom:-10px;left:50%;margin-left:-10px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;}
.alike-cascade-popup.arrow-bottom:before{border-top:10px solid #e6e6e6;}
.alike-cascade-popup.arrow-bottom:after{bottom:-9px;border-top:10px solid #ffffff;}

.alike-cascade-options{
    width:160px;
    height:180px;
    overflow-x:hidden;
    overflow-y:auto;
    display:inline-block;
}

.alike-cascade-item{display:block;list-style:none;line-height:36px;padding:0 20px;margin:0;font-size:14px;color:#606266;cursor:pointer;outline:none}
.alike-cascade-item--primary:hover{color:$alike-color-primary;background-color:$alike-color-light-primary;}
.alike-cascade-item--success:hover{color:$alike-color-success;background-color:$alike-color-light-success;}
.alike-cascade-item--fail:hover{color:$alike-color-fail;background-color:$alike-color-light-fail;}
.alike-cascade-item--warn:hover{color:$alike-color-warn;background-color:$alike-color-light-warn;}
.alike-cascade-item--info:hover{color:$alike-color-info;background-color:$alike-color-light-info;}
</style>