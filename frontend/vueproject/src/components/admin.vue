<template>

<div class="container">
  <div v-for="user in users">
      <div id="infos">
        Login {{ user.login }} Email {{ user.email }} Inscrit le {{ user.createdAt | formatDate }} Dernière connexion le {{ user.last_connection | formatDate }}
      </div>
  </div>

<div id="return"><a href="/posts"><button type="button" class="btn btn-primary">Retour</button></a></div>

</div>

</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  name: 'admin',

data() {
    return {
      users: [],
    };
  },
  async created() {
    this.users = (
      await axios.get("http://localhost:5010/api/user/allusers", {
        headers: {
          Authorization: `token ${localStorage.getItem("user_token")}`,
        },
      })
    ).data;
  },
  methods: {
      getAllUser: function() {
router.get('/user');
      }
  },
  };

</script>

<style scoped>

.container {
  margin-top: 30px;
}
#return {
  position: absolute;
  top: 70px;
  left: 50px;
}

</style>