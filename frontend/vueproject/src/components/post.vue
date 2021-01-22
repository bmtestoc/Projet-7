<template>
  <div>
    <ul v-show="onePost">
      <p> {{onePost.title}} {{onePost.content}} {{onePost.createdAt}}</p>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'post',
  data(){
    return {
      onePost:[]
    };
  },
  async created(){
        this.onePost = (await axios.get('http://localhost:5010/api/post/'+this.$route.params.id)).data;
  }
};

</script>

<style scoped>

</style>
