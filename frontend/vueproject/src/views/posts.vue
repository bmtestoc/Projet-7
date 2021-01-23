<template>
  <div class="container">
      <burgerMenu></burgerMenu>
    <posts></posts>
  </div>
</template>

<script>
import posts from "../components/posts.vue";
/*import rules from "../components/rules.vue";*/
import burgerMenu from "../components/burgerMenu.vue";

export default {
  name: "postsPage",
  components: {
    burgerMenu: burgerMenu,
    posts: posts
    /*mainHeader: mainHeader,*/
  },
};
</script>

<style scoped>
</style>