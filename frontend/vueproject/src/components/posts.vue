<template>
  <div>
    <!--<ul id="disclaimer">
      <p><a href="#/cgu" target="_blank">Conditions générales d'utilisation</a></p>
      <p></p>
    </ul>-->
    <ul v-for="post in posts">
<p> Posté par {{ post.user_login }} le {{ post.post_createdAt }} </p>
<p>{{ post.post_title }} </p>
<p>{{ post.post_content }} </p>
<p>Nombre de commentaires : {{ post.nb_comments }} </p>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'posts',
  data(){
    return {
      posts:[]
    };
  },
  async created(){
    this.posts = (await axios.get('http://localhost:5010/api/post', { params : { userId: 22}})).data;
  }
};

</script>

<style scoped>
ul {
  border: thick double #3f3f41;
  border-radius: 10px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

</style>
