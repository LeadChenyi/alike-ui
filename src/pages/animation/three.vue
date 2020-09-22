<template>
    <div class="animation-three-page">
        <alike-divider>翻牌子（左右）</alike-divider>
        <div class="brand-wrap" :class="[activeBrand ? 'brand-wrap--active':'']" @click="toggleBrand">
            <div class="brand-item brand-item--front">
                <p>正</p>
                <p>面</p>
            </div>

            <div class="brand-item brand-item--back">
                <p>反</p>
                <p>面</p>
            </div>
        </div>

        <alike-divider>查看详情（至底朝上）</alike-divider>
        <div class="face-wrap">
            <div class="face-image"></div>
            <div class="face-text"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:"AnimationThree",
    data(){
        return {
            activeBrand:false
        }
    },
    methods:{
        toggleBrand(){
            this.activeBrand = !this.activeBrand;
        }
    }
}
</script>

<style lang="scss" scoepd>
.brand-wrap{
    width:200px;height:300px;transform-style:preserve-3d;transition:transform 500ms ease-in-out;cursor:pointer;
    &.brand-wrap--active{transform:rotateY(180deg);}
    & .brand-item{display:flex;display:-webkit-flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:relative;}
    & .brand-item--front,& .brand-item--back{position:absolute;top:0;left:0;width:100%;height:100%;font-size:30px;color:#ffffff;z-index:1;box-shadow:0 0 0.1rem #EEE;backface-visibility:hidden;-webkit-backface-visibility:hidden;background:url('../../assets/img/grid.png') top left repeat;}
    & .brand-item--front{color:#409EFF;}
    & .brand-item--back{transform:rotateY(180deg);color:#ff4242;}
}

.face-wrap{
    display: inline-block;
	width: 310px;
    height: 100px;
	margin: 1em 1.5em 2em 0;
	position: relative;

	-webkit-perspective: 4000px;
	-moz-perspective: 4000px;
	-ms-perspective: 4000px;
	-o-perspective: 4000px;
	perspective: 4000px;

    -webkit-transform-style: preserve-3d;
	-moz-transform-style: preserve-3d;
	-ms-transform-style: preserve-3d;
	-o-transform-style: preserve-3d;
	transform-style: preserve-3d;
	-webkit-transition: -webkit-transform .6s;
	-moz-transition: -moz-transform .6s;
	-ms-transition: -ms-transform .6s;
	-o-transition: -o-transform .6s;
	transition: transform .6s;
    cursor:pointer;

    &:hover{
        -webkit-transform: translateZ(-50px) rotateX(95deg);
        -moz-transform: translateZ(-50px) rotateX(95deg);
        -ms-transform: translateZ(-50px) rotateX(95deg);
        -o-transform: translateZ(-50px) rotateX(95deg);
        transform: translateZ(-50px) rotateX(95deg);
    }

    & .face-image{
        position: absolute;
        top: 0;
        left:0;
        width:100%;
        height:100%;
        border-radius:3px;
        box-shadow:0px 3px 3spx rgba(0,0,0,0.3);
        -webkit-transform: translateZ(50px);
        -moz-transform: translateZ(50px);
        -ms-transform: translateZ(50px);
        -o-transform: translateZ(50px);
        transform: translateZ(50px);
        background:url('../../assets/img/grid.png') top left repeat;

        &:hover{
            border-radius:15px;
        }
    }

    & .face-text{
        position: absolute;
        top: 0;
        left:0;
        height: 80px;
        width: 290px;
        text-align: left;
        border-radius: 15px;
        padding: 10px;
        font-size: 12px;
        text-shadow: 1px 1px 1px rgba(255,255,255,0.5);
        box-shadow: none;
        background: rgb(236,241,244);
        background: -webkit-linear-gradient(to bottom,  rgba(236,241,244,1) 0%,rgba(190,202,217,1) 100%);
        background: -ms-linear-gradient(to bottom,  rgba(236,241,244,1) 0%,rgba(190,202,217,1) 100%);
        background: linear-gradient(to bottom,  rgba(236,241,244,1) 0%,rgba(190,202,217,1) 100%);

        -webkit-transform: rotateX(-90deg) translateZ(50px);
        -moz-transform: rotateX(-90deg) translateZ(50px);
        -ms-transform: rotateX(-90deg) translateZ(50px);
        -o-transform: rotateX(-90deg) translateZ(50px);
        transform: rotateX(-90deg) translateZ(50px);

        &:hover{
            border-radius:3px;
        }
    }
}
</style>