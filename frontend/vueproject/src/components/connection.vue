<template>
  <div id="container">
    <div id="nav">
      <h1>Connexion</h1>
    </div>
    <form method="POST" id="formulaire" @submit.prevent="envoi">
      <div class="form-group col-lg-3 col-sm-6">
        <label for="login">Login</label>
        <input
          type="text"
          class="form-control"
          name
          value
          id="login"
          v-model="login"
        />
        <small id="login" class="form-text text-muted"></small>
      </div>
      <div class="form-group col-lg-3 col-sm-6">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          name
          value
          id="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          v-model="password"
        />
        <small id="noAccess" class="text-danger"></small>
      </div>
      <button type="submit" class="btn btn-primary">Connexion</button>
      <p>Vous n'avez pas encore de compte ? Cliquer <a href="/#/signup">ici</a> pour vous inscrire</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "connection",
  data() {
    return {
      login: "",
      password: ""
    };
  },
  methods: {
    envoi: function() {
      //envoie des informations de connexion à l'API pour authentification
      let token = "";
      if (this.login == "" || this.password == "") {
        alert(
          "Veuillez entrer votre login et votre mot de passe"
        );
      } else {
        axios
          .post(
            "http://localhost:5010/api/user/login",
            {
              login: this.login,
              password: this.password
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer${token}` //Renvoi du token par l'api en cas d'authentification
              }
            }
          )
          .then(response => {
            //Si authentification réussie autorisation d'accès au mur pour les utilisateur
            // ou au tableau de bord admin pour l'administrateur de l'applcation
            let reponse = response.data;
            console.log("Vous êtes connecté(e) !");
            let userObject = JSON.stringify(reponse);
            this.$localStorage.set("user", userObject);
            let user = JSON.parse(this.$localStorage.get("user"));
            token = user.token;
            if (user.status == "admin") {
              window.location.href = "http://localhost:8080/#/posts";
              location.reload(true);
            } else {
              window.location.href = "http://localhost:8080/#/posts";
              location.reload(true);
            }
          })
          .catch(() => {
            console.log("Echec de la connexion"); //En cas d'echec envoie de l'information à l'utilisateur
            document.querySelector("#noAccess").innerHTML =
              "Login ou mot de  passe incorrect";
          });
      }
    }
  }
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
  /*margin-bottom: 20px;
  padding-bottom: 10px;*/
  background-image:url(../assets/icon.svg);
background-repeat:no-repeat;
background-position:center top;
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