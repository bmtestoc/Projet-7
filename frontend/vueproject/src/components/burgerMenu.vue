<template>
    <Slide right width="350">
      <a id="addPost" href="/add">
        <span><i class="far fa-envelope"></i> Créer un sujet</span>
      </a>
      <!--<a id="allRead" href="#/">
        <span><i class="far fa-flag"></i> Tout marquer comme lu</span>
      </a>-->
      <a id="myAccount" href="/myaccount">
        <span><i class="far fa-user"></i> Mon compte</span>
      </a>
      <!--<a id="admin" href="/admin">
        <span><i class="fas fa-users-cog"></i> Administration</span>
      </a>-->
      <a v-if="userConnected.profile === 1" id="admin" href="/admin">
        <span><i class="fas fa-users-cog"></i> Administration</span>
      </a>
      <a id="cgu" href="/cgu" target="_blank">
        <span><i class="fas fa-book-reader"></i> CGU</span>
      </a>
      <a id="leave" href="">
        <span @click= "leave"><i class="fas fa-power-off"></i> Déconnexion</span>
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

  methods:{
         leave: function(){
              localStorage.clear();
              this.$alert("Déconnexion en cours")
              router.push('/signin');
      }
}
}

</script>

<style>
a {
  color: white;
}
a:link {
  text-decoration: none;
}
.bm-menu {
      background-color:rgb(194, 60, 60);
    }
.bm-burger-bars {
    background-color: rgb(194, 60, 60);
}  
.bm-burger-button {
position: fixed;
}  
</style>
