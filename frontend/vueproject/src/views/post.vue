<template>
  <div class="container">
    <burgerMenu></burgerMenu>
    <post></post>
  </div>
</template>

<script>
import post from "../components/post.vue";
import burgerMenu from "../components/burgerMenu.vue";

export default {
  name: "postPage",
  components: {
    burgerMenu: burgerMenu,
    post: post,
  },
};
</script>

<style scoped>

</style>