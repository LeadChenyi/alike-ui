<template>
  <ul class="children-tree">
    <li v-for="(item,index) in children" :key="index">
      <h3>{{item.name}}</h3>
      <children-tree v-if="item.children" :children="item.children"></children-tree>
    </li>
  </ul>
</template>


<script>
//子组件自调无需再次引用，使用与父组件中的同名标签即可生效
export default {
  name: 'ChildrenTree',
  props:{
    children:{
        type:Array,
        default:()=>[]
    }
  }
}
</script>


<style>

</style>