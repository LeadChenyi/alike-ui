<template>
    <div class="index-page">
        <alike-divider>unit1 - 样式效果</alike-divider>
        <div class="unit-item">
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('HoverCase')"
                >Hover</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('ClickCase')"
                >Click</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('TransitionCase')"
                >Transition</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Animation')"
                >Animation</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Animation3d')"
                >Animation 3D</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Notice')"
                >Notice</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('ScrollCase')"
                >Scroll</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('MaskCase')"
                >Mask</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('InputCase')"
                >Input Selection Cursor</alike-button
            >
        </div>

        <alike-divider>unit2 - 脚本效果</alike-divider>
        <div class="unit-item">
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Cssom')"
                >CSSOM对象模型</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Mouse')"
                >鼠标事件</alike-button
            >
            <alike-button type="primary" class="mr-10" @click="linkUrls('Drag')"
                >拖动事件</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Regexp')"
                >正则表达式</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Class')"
                >类</alike-button
            >
        </div>

        <alike-divider>alike - 自定义组件</alike-divider>
        <div class="unit-item">
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Basic')"
                >Basic 基础</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Wrapper')"
                >Wrapper 包装</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Button')"
                >Button 按钮</alike-button
            >
            <alike-button type="primary" class="mr-10" @click="linkUrls('Form')"
                >Form 表单</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Scroll')"
                >Scroll 滚动容器</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Carousel')"
                >Carousel 轮播图</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Canvas')"
                >Canvas 画布绘制</alike-button
            >
            <alike-button
                type="primary"
                class="mr-10"
                @click="linkUrls('Video')"
                >Video 播放器</alike-button
            >
        </div>
    </div>
</template>

<script>
export default {
    name: "Index",
    mounted() {
        // this.initData();
    },
    methods: {
        initData() {
            this.$api.photo
                .getPhotos()
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        linkUrls(name) {
            this.$router.push({ name: name });
        },
    },
};
</script>

<style scoped>
.unit-item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    min-height: 100px;
    padding: 20px;
}
</style>