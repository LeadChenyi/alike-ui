<template>
    <div class="alike-image" @click="handleClick">
        <img class="alike-image__default" :src="defaultSrc"
            :width="naturalWidth || width"
            :height="naturalHeight || height"
            v-if="showDefault" />
        <img class="alike-image__primary" :class="[showDefault ?'alike-image__primary-hide':'']" :src="src"
            :width="naturalWidth || width"
            :height="naturalHeight || height"
            :style="{objectFit:mode}"
            @load="loadImage"
			@error="errorImage"
            v-if="startLoading" />
    </div>
</template>

<script>
/**
 * alike-image 
 * @describe 图片组件
 * @website http://alke.galloping.xyz
 * @property defaultSrc {String} 默认图路径
 * @property src {String} 图片路径
 * @property width {String} 图片的宽度
 * @property height {String} 图片的高度
 * @property mode {String} 图片显示模式（默认值：fill，可选值参考object-fit属性）
 * @property original {Boolean} 是否显示原图的宽高度（默认值：false，可选值：true）
 * @property lazyLoad {Boolean} 是否开启图片懒加载（默认值：false，可选值：true）
 * @property disabled {Boolean} 是否禁止用户操作（默认值：false，可选值：true）
 * @event click {Function} 点击图标时触发	
 */

export default {
    name:"alike-image",
    props:{
        defaultSrc:{
            type:String,
            default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAIlElEQVR4Xu2dWagcRRSGz+ncYeIChiQiKBGuD2r0mnGm2t0nQcV9IYiKgiIorrivDyqIS9wQFUTfxLhvxAVffI1bVc8M5KIgrlFRiREfLibe232kZC7G68z0XlPddfolD7f61Dn/+ahTVV01QeDHaQXQ6eg5eGAAHIeAAWAAHFfA8fB5BGAAHFfA8fB5BGAAHFfA8fB5BGAAHFfA8fB5BGAAHFfA8fB5BGAAHFfA8fB5BGAAHFfA8fB5BGAAxiuglFrred4+jutUyfCjKPpFCPH5OOdjRwAp5UZEvLCSCrDTG4UQFzEA7oLAALib+38iZwAYAC4BLjPAI4DL2S+9BBDRLCJuc1zkiYZPRKsR8dARTpQ7AhDROb7vvz1RBRzvXCl1DgC8yQA4CgID4GjiF8NmABgALgEuM8AjgMvZBwAGoIIAbN26dbft27fvPz8/v2JqauqHVqv1EyJSllAYgCyqTeCdIAj2JaJbiegERJwB+M/V/N8B4CVEfLbT6fTTuMcApFFrAm2JCIMguJuIbkPE5Qlc2IyIN3c6nY8StOUSkESkSbXZsmXLnjt37nwdAE5O6cNfAHCZEOKFuPd4BIhTaEJ/JyJPKfUBIp6Y0YWIiI71ff+Tce8zABnVLfs1pdRdAHBfnn6IaGuj0VjbarXmRtlhAPIoXNK7QRDsHUXRt4i4ewFd3CuEuIcBAAC9fFqzZs2fBYhaqgkp5e2I+EBBncw1m82VMzMzel7wv8eZEaDf708vLCw81+l0TkLEqCBxSzGjlNoMAMcUZdzzvNPa7fb7TgMQBMH9RHQHET3k+/7tRYlbhh0p5TwiThVo+xEhxC3OAjBYS/8AAPtqEWw+hzA7O7tyx44dvxWYfG3qZSHEBc4CoJTS6+gPFgUgoj8bjcaRrVZrS8FC5zbX6/X2C8NQw1rYQ0Tv+b5/ussAvAQA5+8qgF4iAcBhvu//UZjSBRgajFbhkq3evJafE0Jc7iQA/X5/j/n5+W0jtlE/tHFSKKX8AhEPypv1Xd6/UQjxuJMAKKWuAIBnxoi5QQhxW4Fi5zYlpXwUEW/MbWhgYGpq6oBWq/WNkwBIKT9GxKPGiWnbpFAptQ4AUn3VGxPfZiHEcaP+Xut9ACnlwYg49nbrYFVg3aRQKfU8AFycdxTwPO+4drut9xWGPnUH4EFETDS82zYplFKuBoDPEVH/m+nRu4mdTufOcS/XFgD9NS0Igp8BYO8U6lk1Kex2uyeGYfh+lk0hInpeCHFJ3Emh2gIQBMEpRDR0+zMGCKsmhd1u99gwDDch4qokIBPRPADc7ft+om8JtQVAKfUKAJyXRLSlbWybFEop90LES4noSkQ8cERM+pPvO41G465169Z9nTTuWgLQ7XZXhGH4KyI2kgqxazubdwqllMcDgD4X6BHRTkT8ftmyZV+2Wq0AERfSxltLAKSUVyHi02nFWAKBlTuFeWJyZh9AKfUpABxRgFhWTQoLiOd/Jmo3AiRd+6cQ06pJYQq/EzWtHQBKqYcB4OZE0SdsZNukMKHbiZrVCoCMa/9YoWyeFMY6H9OgVgBIKU9DxHfzijLsfdt2CouKsW4AvIaI64sSZ4id2k0KawNA3rV/CmgeFkLcmqK91U1rA4BS6hoAeNKE2nWaFNYJAAkAwhAA1n0+zhp3LQAoYe0fq2cZk8LBieAX9SfstNe8Yx0e0aAuABR6hCqFmIVNCvVXvyiKXgWA/fQ5gGazefio2zwp/IttWnkAylr7xyr3b4Nck8LBKeBbiOh+RFy2aNbUBZbKA6CUOgMANqVIWOFNs04KB0O+vsN/yhCnIs/zjm63258V7vAuBusAgP6VS/1TZxN7suwU9nq9I8Mw1L7rIX/oQ0RfLV++/JAyS0GlATC49o+FK82kUCl1AxFtSHLUq+xSUGkApJTXIeITsdkx12DspHBwskef9j0zhUulloKqA9BFxMNTiGmi6dCbuL1er72wsPA2Iu6f1okyS0FlAZjE2j9p4pZOCoMguDaKIr1UzXREbdBvKecSKguAUkrfdbs+aVJMtlucFDabze/m5ub0LD/NkD/K1VJKQSUBkFI2EPHHlGf+TTKg+/qW9CIfcbqojssoBVUF4GxEfKsoYStmJ9fG09JYqwqAnkydVbHEFeVuoaWgcgDon1AjIn3lyytK0arZKbIUVA4AvYkCAI9VLWkl+FtIKagcAFJKfWP24BIErZpJ8jzvqLzfCioFgN5MCcMwqFqmyvK3iFJQKQCklE8g4nVlCVpRuyN/AzBJPJUBYLD2/xUAViQJzKE2uUpBZQBQSp0LAG84lNjEoeYpBVUCQB/60Ic/+BmiABE96vt+6itxlQCA1/6JmM9UCioBgJTyJkR8JJEMDjfKUgqqAgCv/ROCnbYUWA+AUkpf9tCXPvhJpkCqUlAFAJ4CgKuTxc6ttAJpSoHVAPDaPzvQRPSY7/s3xVmwGoAgCNYT0WtxQfDfhyqQqBRYDYCU8j1EPJUTnE0BXQpWrVo1Mz09vWOUBWsB4LV/tqQvfSuuFFgLgFJK/ydHG4qRwWkrY0uBtQD0+/2ZKIoy/1K20ylfEnwURb8IIYb+bL61AHACzSjAAJjR2dpeGABrU2PGMQbAjM7W9sIAWJsaM44xAGZ0traXSQMwi4jbrFXHAceIaDUiHjoi1I1CiIvGyYBxGkkpNyLihXHt+O9WKsAAWJkWc04xAOa0trInBsDKtJhzigEwp7WVPTEAVqbFnFP5AVBKrfU8bx9zPnNPRSkw7iviYh+xy8CinGE7dirAANiZF2NeMQDGpLazIwbAzrwY84oBMCa1nR0xAHbmxZhXDIAxqe3siAGwMy/GvGIAjEltZ0cMgJ15MeYVA2BMajs7YgDszIsxrxgAY1Lb2REDYGdejHnFABiT2s6OGAA782LMKwbAmNR2dsQA2JkXY179DfxyNerhpDmOAAAAAElFTkSuQmCC"
        },
        src:{
            type:String,
            default:""
        },
        width:{
            type:String,
            default:"200"
        },
        height:{
            type:String,
            default:"200"
        },
        mode:{
            type:String,
            default:"fill"
        },
        original:{
            type:Boolean,
            default:false
        },
        lazyLoad:{
            type:Boolean,
            default:false
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            startLoading:false,
            showDefault:true,
            naturalWidth:0,
            naturalHeight:0
        }
    },
    mounted(){
        if(this.lazyLoad){
            this.initLazyLoad();
        }
    },
    methods: {
        initLazyLoad(){
            let elOffsetTop = this.$el.getBoundingClientRect().top;
            let docOffsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight;

            document.onscroll = (e)=>{
                // console.log('initLazy',e.target.scrollingElement.scrollTop);
                let scrollTop = e.target.scrollingElement.scrollTop;
                if((docOffsetHeight + scrollTop) >= elOffsetTop){
                    this.startLoading = true;
                    document.onscroll = null;
                }
            }
        },
        handleClick(){
            if(!this.disabled){
                this.$emit('click');
            }
        },
        loadImage(e){
            if(this.original){
                this.naturalWidth = e.path[0].naturalWidth;
                this.naturalHeight = e.path[0].naturalHeight;
            }
            this.showDefault = false;
        },
        errorImage(e){
            this.showDefault = true;
        }
    }
}
</script>

<style scoped>
    .alike-image{display:inline-block;}
    .alike-image__primary,.alike-image__default{max-width:100%;vertical-align:bottom;}
    .alike-image__primary-hide{width:0;height:0;opacity:0;}
</style>