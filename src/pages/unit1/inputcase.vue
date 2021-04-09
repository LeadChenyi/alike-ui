<template>
    <div class="inputcase-page">
        <textarea ref="queryTextarea" v-model="content" style="width:500px;height:300px;" @blur="blur"></textarea>
        <button @click="cursorPosition(6)">指定光标位置</button>
        <button @click="addEmoji">添加大笑表情</button>
        <button @click="selectionRange($refs.queryTextarea,6,10)">指定选取范围兼拷贝</button>
        <button @click="selectionRange($refs.queryTextarea,6)">指定选取光标位置</button>

        <alike-divider>普通元素模拟编辑器 contenteditable/blur/getRangeAt</alike-divider>
        <div contenteditable="editor" @blur="blur">
            <p>asdasfafjsisdfji</p>
            <p>asdasfafjsisdfjimismnerognmio</p>
            <p>asdasfafjsisdfjimismnerognmiomiadfmn</p>
            <p>asdasfafjsisdfjimismnerognmiomiadfmnmidfgnio</p>
            <p>asdasfafjsisdfjimismnerognmiomiadfmnmidfgniorfgndkfgn</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            content:"原谅我这一生不羁放纵爱自由",
            emoji:"[大笑]"
        }
    },
    methods:{
        addEmoji(){
            if(document.selection){
                let selection = document.selection.createRange();
                selection.text = this.emoji;
                selection.select();
            }else{
                let selectIndex = this.$refs.queryTextarea.selectionStart;
                let start = this.content.slice(0,selectIndex);
                let end = this.content.slice(selectIndex);
                start += this.emoji;
                this.content = start + end;
                this.cursorPosition(start.length);
            }
        },
        selectionRange(el,start,end){
            if(!end){
                end = start;
            }
            
            if(el.setSelectionRange) {
                el.focus();
                el.setSelectionRange(start, end);
            }else if(el.createTextRange) {
                let range = el.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
            if(start != end){// 如果start等于end，表示指定光标，否则视为选取拷贝
                document.execCommand('copy');
            }
        },
        selectionNodeContent(el){
            let selection = window.getSelection();
            let range = document.createRange();
            range.selectNodeContents(el); // this.$refs.queryTextarea.$el
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            selection.removeAllRanges();
        },
        cursorPosition(start,end){
            if(!end){
                end = start;
            }
            console.log(start);
            this.$refs.queryTextarea.focus();
            setTimeout(()=>{
                this.$refs.queryTextarea.selectionStart = start;
                this.$refs.queryTextarea.selectionEnd = end;
            },300)
        },
        blur(){// 普通元素设为编辑器时通过getRangeAt的方式获取光标选取范围
            let selection = window.getSelection();
            if(selection.rangeCount > 0){
                let range = selection.getRangeAt(0);
                console.log(range);
            }
        }
    }
}
</script>

<style>

</style>