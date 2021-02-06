<template>
  <div class="userAcc">
    <addPostHeader></addPostHeader>
    <burgerMenu></burgerMenu>
    <addPost></addPost>
  </div>
</template>

<script>
import addPostHeader from "../components/addPostHeader.vue";
import burgerMenu from "../components/burgerMenu.vue";
import addPost from "../components/addPost.vue";

export default {
  name: "addPostPage",
  components: {
    addPostHeader: addPostHeader,
    burgerMenu: burgerMenu,
    addPost: addPost,
  },
};
</script>

<style scoped>
</style>
