<template>
  <div>
    <ul v-for="user in users">
      <li> {{user.login}} {{user.email}} {{user.last_connection}} {{user.createdAt}}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'users',
  data(){
    return {
      users:[]
    };
  },
  async created(){
    this.users = (await axios.get('http://localhost:5010/api/user')).data;
  }
};

</script>

<style scoped>

</style>
