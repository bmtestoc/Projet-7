<template>
  <div class="container">
    <burgerMenu></burgerMenu>
    <posts></posts>
  </div>
</template>

<script>
import posts from "../components/posts.vue";
import burgerMenu from "../components/burgerMenu.vue";

export default {
  name: "postsPage",
  components: {
    burgerMenu: burgerMenu,
    posts: posts,
  },
};
</script>

<style scoped>
</style>