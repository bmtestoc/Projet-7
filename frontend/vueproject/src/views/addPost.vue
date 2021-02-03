<template>
  <div class="userAcc">
    <addPostHeader></addPostHeader>
    <addPost></addPost>
  </div>
  
</template>

<script>
import addPostHeader from "../components/addPostHeader.vue";
import addPost from "../components/addPost.vue";

export default {
  name: "addPostPage",
  components: {
    addPostHeader: addPostHeader,
    addPost: addPost
  },
};
</script>

<style scoped>
</style>
