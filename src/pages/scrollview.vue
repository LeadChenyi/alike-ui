<template>
    <div class="scroll-view">
        scrollview
    </div>
</template>

<script>
/**
 * 
 * 触发滚动到底部的公式：(滚动容器的滚动值 + 滚动容器的高度) >= 最后一个子元素的偏移顶部值
 */
export default {
    name:"ScrollView"
}
</script>

<style>

</style>