<template>
  <div id="container">
    <div id="nav">
      <h1>Connexion</h1>
    </div>
    <!-- formulaire -->
    <form method="POST" id="formulaire" @submit.prevent="envoi">
      <!-- champ login -->
      <div class="form-group col-lg-3 col-sm-6">
        <label for="login">Login</label>
        <input
          type="text"
          class="form-control"
          placeholder="Login"
          name
          value
          id="login"
          v-model="login"
        />
      </div>
      <!-- champ mot de passe -->
      <div class="form-group col-lg-3 col-sm-6">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          placeholder="Mot de passe"
          name
          value
          id="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Connexion</button>
      <p>
        Vous n'avez pas encore de compte ? Cliquer
        <a href="/signup">ici</a> pour vous inscrire
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  name: "connection",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  methods: {
    envoi: function () {
      //envoi des informations de connexion à l'API pour authentification
      let token = "";
      if (this.login == "" || this.password == "") {
        this.$alert("Veuillez entrer votre login et votre mot de passe");
      } else {
        axios
          .post(
            "http://localhost:5010/api/user/login",
            {
              login: this.login,
              password: this.password,
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer${token}`, // envoi du token par l'api
              },
            }
          )
          .then((response) => {
            //Si authentification réussie
            let reponse = response.data;
            //Stockage du token d'authentification dans local storage
            localStorage.setItem("user_token", reponse.token);
            //Message personnalisé de bienvenue
            this.$alert("Bienvenue " + response.data.userLogin + " !");
            //Redirection vers les posts
            router.push("posts");
          })
          //Si échec authentification, avertissement de l'utilisateur
          .catch(() => {
            this.$alert("Echec de la connexion");
            document.querySelector("#noAccess").innerHTML =
              "Login ou mot de passe incorrect";
          });
      }
    },
  },
};
</script>

<style  scoped>
h1 {
  position: relative;
  display: inline;
  @media screen and (max-width: 1024px) {
    bottom: 0px;
    margin-top: 0px;
  }
}

#formulaire {
  margin-top: 90px;
}

#container {
  height: 100%;
  background-image: url(../assets/icon.svg);
  background-repeat: no-repeat;
  background-position: center top;
}
.form-group {
  position: relative;
  bottom: 80px;
  margin-right: auto;
  margin-left: auto;
}

button {
  position: relative;
  bottom: 80px;
}

p {
  position: relative;
  bottom: 60px;
}
</style>