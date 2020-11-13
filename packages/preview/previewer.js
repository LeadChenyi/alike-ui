import Vue from 'vue';
import PreviewTemp from './previewer.vue';

const previewer = (options)=>{
    let MyPreview =  Vue.extend(PreviewTemp)

    new MyPreview({
        el:document.createElement('div'),
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
                document.body.appendChild(this.$el);
            },
            close(){
                this.aniShow = false;
                document.body.removeChild(this.$el);
            },
            handleMask(){
                if(!this.maskClose){
                    return false;
                }
                this.close();
            }
        }
    });

    // console.log('vm',vm.$el)
}
export default previewer;