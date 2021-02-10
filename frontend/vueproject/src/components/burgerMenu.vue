<template>
  <Slide right>
    <a id="menuPosts" href="/posts">
      <span><i class="far fa-comments"></i> Forum</span>
    </a>
    <a id="addPost" href="/add">
      <span><i class="far fa-envelope"></i> Créer un sujet</span>
    </a>
    <a id="myAccount" href="/myaccount">
      <span><i class="far fa-user"></i> Mon compte</span>
    </a>
    <!-- affichage du menu admin si le profil du user est = à 1 -->
    <a v-if="userConnected.profile === 1" id="admin" href="/admin">
      <span><i class="fas fa-users-cog"></i> Administration</span>
    </a>
    <a id="cgu" href="/cgu" target="_blank">
      <span><i class="fas fa-book-reader"></i> CGU</span>
    </a>
    <a id="leave" href="">
      <span @click="leave"><i class="fas fa-power-off"></i> Déconnexion</span>
    </a>
  </Slide>
</template>

<script>
import axios from "axios";
import { Slide } from "vue-burger-menu";
import router from "../router/index";

export default {
  name: "burgerMenu",
  components: {
    Slide,
  },
  data() {
    return {
      userConnected: {},
    };
  },
  async created() {
    this.userConnected = (
      await axios.get("http://localhost:5010/api/user/fromtoken", {
        headers: {
          Authorization: `token ${localStorage.getItem("user_token")}`,
        },
      })
    ).data;
  },
  methods: {
    // fonction de deconnexion
    leave: function () {
      localStorage.clear(); // reset du local storage
      this.$alert("Déconnexion en cours"); // affichage d'un message
      router.push("/signin"); // redirection vers la page de connexion
    },
  },
};
</script>

<style>
a {
  color: white;
}
a:link {
  text-decoration: none;
}
.bm-menu {
  background-color: rgb(194, 60, 60);
}
.bm-burger-bars {
  background-color: rgb(194, 60, 60);
}
.bm-burger-button {
  position: fixed;
  margin-top: 30px;
}

@media (max-width: 634px) and (orientation: portrait) {
  .bm-burger-button {
    margin-top: -20px;
  }
}
</style>
