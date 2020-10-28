import Vue from 'vue';

/*
    Vue.extend扩展方式不能使用template
    1、无法存放组件自带样式
    2、无法有效控制组件插入的位置
*/
const previewer = (options)=>{
    let MyPreview =  Vue.extend({
        template:'<p>这里必须是字符串模板，而不只能存放组件</p>',
        data(){
            return {
                urls:options.urls || [],
                current:options.current || "",
                maskClose:options.maskClose || true,
                aniShow:true,
                activeIndex:0
            }
        },
        mounted(){
            console.log('Vue.extend mounted')
            this.open();
        },
        methods:{
            getCurrent(){
                if(!this.urls.length){
                    return false;
                }
                this.activeIndex = this.urls.indexOf(this.current);
            },
            prevPreview(){
                this.activeIndex--;
                if(this.activeIndex < 0){
                    this.activeIndex = this.urls.length - 1;
                }
            },
            nextPreview(){
                this.activeIndex++;
                if(this.activeIndex > (this.urls.length - 1)){
                    this.activeIndex = 0;
                }
            },
            open(){
                this.getCurrent();
                this.aniShow = true;
                // document.body.appendChild(this.$el);
            },
            close(){
                this.aniShow = false;
                // document.body.removeChild(this.$el);
            },
            handleMask(){
                if(!this.maskClose){
                    return false;
                }
                this.close();
            }
        }
    })

    new MyPreview().$mount('body');
}
export default previewer;


