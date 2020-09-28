<template>
    <div class="button-page">
        <alike-divider>普通按钮</alike-divider>
        <div class="global-wrapper">
            <alike-button class="mr-20" type="default">默认按钮</alike-button>
            <alike-button class="mr-20" type="primary">主要按钮</alike-button>
            <alike-button class="mr-20" type="success">成功按钮</alike-button>
            <alike-button class="mr-20" type="fail">失败按钮</alike-button>
        </div>

        <alike-divider>镂空按钮</alike-divider>
        <div class="global-wrapper">
            <alike-button class="mr-20" type="default" :plain="true">默认按钮</alike-button>
            <alike-button class="mr-20" type="primary" :plain="true">主要按钮</alike-button>
            <alike-button class="mr-20" type="success" :plain="true">成功按钮</alike-button>
            <alike-button class="mr-20" type="fail" :plain="true">失败按钮</alike-button>
        </div>

        <alike-divider>其他按钮</alike-divider>
        <div class="global-wrapper">    
                    
            <alike-button class="mr-20" type="primary" :radius="true">圆角按钮</alike-button>
            <alike-button class="mr-20" type="primary" :disabled="true">禁用按钮</alike-button>
            <alike-button class="mr-20" type="primary">
                <alike-icon type="like" color="#ffffff"></alike-icon>
                自定义内容
                <alike-icon type="like" color="#ffffff"></alike-icon>
            </alike-button>
            <alike-button class="mr-20" type="primary" size="big">定义大小按钮</alike-button>
        </div>
    </div>
</template>

<script>
export default {
    name:"Button"
}
</script>

<style>
    
</style>