<template>
  <div id="container">
    <div id="nav">
      <h1>Inscription</h1>
    </div>
    <form method="POST" id="formulaire" @submit.prevent="envoi">
      <div class="form-group col-lg-3 col-sm-6">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          name=""
          value=""
          id="email"
          pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}"
          v-model="email"
        />
        <small id="emailHelp" class="form-text text-muted"></small>
      </div>
      <div class="form-group col-lg-3 col-sm-6">
        <label for="login">Login</label>
        <input
          type="text"
          class="form-control"
          placeholder="Login"
          name=""
          value=""
          id="login"
          v-model="login"
        />
        <small id="login" class="form-text text-muted"></small>
      </div>
      <div
        class="form-group col-lg-3 col-sm-6"
        v-b-tooltip.hover
        title="Votre mot de passe doit contenir: au moins 6 caractères, au moins une lettre en minuscule, au moins une lettre en majuscule, au moins un nombre."
      >
        <label for="password">Mot de passe</label>
        <input
          type="password"
          v-on:focus="showdiv"
          v-on:blur="maskdiv"
          class="form-control"
          placeholder="Mot de passe"
          name=""
          value=""
          id="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          v-model="password"
        />
      </div>
      <div class="form-group col-lg-3 col-sm-6">
        <label for="password2"> Confirmez votre mot de passe</label>
        <input
          type="password"
          v-on:blur="verif"
          class="form-control"
          placeholder="Mot de passe"
          name=""
          value=""
          id="password2"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
          v-model="password2"
        />
        <small id="confirm" class="text-danger"></small>
      </div>
      <button type="submit" class="btn btn-primary">S'inscrire</button>
      <p>Déjà inscrit ? <a href="/signin">Veuillez vous connecter</a></p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "inscription",
  data() {
    return {
      email: "",
      login: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    envoi: function () {
      //Envoi du formulaire à l'API
      let token = "";
      if (this.email == "" || this.login == "" || this.password == "") {
        this.$alert("Veuillez remplir tous les champs !");
      } else if (this.password != this.password2) {
        this.$alert("Les mots de passe saisis sont différents !");
      } else {
        axios.post(
            "http://localhost:5010/api/user/signup",
            {
              email: this.email,
              login: this.login,
              password: this.password,
            },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer${token}`,
              },
            }
          )
          .then((response) => {
            this.$alert("Inscription réussie !");
            let reponse = response.data;
            console.log(response);
            //let userObject = JSON.stringify(reponse);
            //console.log(localStorage);
            //localStorage.setItem("user", userObject);
            //let user = JSON.parse(localStorage.getItem("user"));
            //Token d'authentification
            //token = user.token; 
            //Redirection vers la page de connexion
            this.$alert("Merci pour votre inscription, vous pouvez maintenant vous connecter");
            window.location.href = "http://localhost:8080/signin";
          })
          .catch(() => this.$alert("Echec de l'inscription"));
      }
    },

    showdiv: function () {
      //Affichage des consignes pour choisir le mot de passe
      document.getElementById("showfocus").style.display = "block";
    },

    maskdiv: function () {
      //Masquage des consignes pour choisir le mot de passe
      document.getElementById("showfocus").style.display = "none";
    },
    verif: function () {
      //Fonction pour vérifier que les passwords saisis sont identiques
      if (this.password != this.password2) {
        document.getElementById("confirm").innerHTML =
          "Veuillez resaisir votre mot de passe";
      } else {
        document.getElementById("confirm").innerHTML = "";
      }
    },
  },
};
</script>

<style scoped>
h1 {
  position: relative;
  display: inline;
  @media screen and (max-width: 1024px) {
    bottom: 0px;
    margin-top: 0px;
  }
}
#formulaire {
  font-size: 13.5px;
}
#container {
  height: 100%;
  background-image: url(../assets/icon.svg);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: 350px;
}
.form-group {
  position: relative;
  margin-right: auto;
  margin-left: auto;
}
button {
  position: relative;
  margin-bottom: 5px;
}
li {
  list-style-type: none;
  font-weight: bolder;
}
p {
  position: relative;
}
</style>

