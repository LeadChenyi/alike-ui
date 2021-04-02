<template>
    <div>
        <nav>
            <a href="#page-1">1</a>
            <a href="#page-2">2</a>
            <a href="#page-3">3</a>
        </nav>
        <main>
            <section id="page-1">1</section>
            <section id="page-2">2</section>
            <section id="page-3">3</section>
        </main>
    </div>
</template>

<script>
export default {
    name:"ScrollBehavior"
}
</script>

<style scoped>
/* https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior */
a {
  display: inline-block;
  width: 50px;
  text-decoration: none;
}
nav, main {
  display: block;
  margin: 0 auto;
  text-align: center;
}
nav {
  width: 339px;
  padding: 5px;
  border: 1px solid black;
}
main {
  display: block;
  width: 350px;
  height: 200px;
  overflow-y: scroll;
  scroll-behavior: smooth;
}
section {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 5em;
}
</style>