
<template>
    <div class="render-slots">
        <slot name="header" value="header"></slot>
        <div>这里是main</div>
        <slot name="footer" value="footer"></slot>
    </div>
</template>

<script>
/*
    动态创建多个slot是否无法被识别，只会视为普通标签
    render(createElement){
        return createElement('div',{},
            [
                createElement('slot',{
                    slot:"header",      // 仅用于该组件还有自己组件的情况
                    attrs:{
                        value:"header",
                        name:"header"
                    }
                }),            
                createElement('slot',{
                    slot:"footer",
                    attrs:{
                        value:"footer",
                        name:"footer"
                    }
                })
            ]
        )
    }

    render & jsx：需要安装jsx依赖
    render(h){
        return (
            <div class="render-slots">
                <slot name="hedaer" value="header"></slot>
                <div>这里是main部分</div>
                <slot name="footer" value="footer"></slot>
            </div>
        )
    }
*/
export default {
    name:"render-slots"
}
</script>

<style>

</style>