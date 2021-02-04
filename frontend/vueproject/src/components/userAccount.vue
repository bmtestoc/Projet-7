<template>

<div class="container">
  <div id="changePassword">
    <form method="POST" @submit.prevent="submitNewPassword">
      <div v-b-tooltip.hover
        title="Votre mot de passe doit contenir: au moins 6 caractères, au moins une lettre en minuscule, au moins une lettre en majuscule, au moins un nombre.">
      <input type="password" class="form-control" id="newPassword" name="newPassword" placeholder="Nouveau mot de passe" v-on:focus="showdiv"
          v-on:blur="maskdiv" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" v-model="password"/>
      </div>
      <button type="submit" class="btn btn-secondary">Changer mon mot de passe</button>
      </form>
  </div>

<b-button class="btn btn-danger" v-b-modal.modal-delete-account @click="$bvModal.show('modal-delete-account')">Supprimer mon compte</b-button>
<b-modal id="modal-delete-account" title="Supprimer mon compte" hide-footer>
    <div class="d-block text-center">
      <h3>Souhaitez-vous vraiment supprimer votre compte?</h3>
    </div>
    <b-button class="mt-3" block @click="deleteAccount()">Valider</b-button>
    <b-button class="mt-3" block @click="$bvModal.hide('modal-delete-account')">Annuler</b-button>
</b-modal>

<!--<div id="return"><a href="/posts"><button type="button" class="btn btn-primary">Retour</button></a></div>-->

</div>

</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  name: 'userAccount',
  data() {
    return {
      password: "",
    };
  },
  methods: {
    deleteAccount : function() {
      console.log('je suis dans deleteAccount)');
      console.log(localStorage.getItem('user_token'))
      localStorage.getItem("user");
      let user = JSON.parse(localStorage.getItem("user"))
      //axios.delete("http://localhost:5010/api/user/"+user.userId+"")
      //Redirection vers connexion
      //window.location.href = "http://localhost:8080/signin";
      
    axios.delete("http://localhost:5010/api/user/"+user.userId, 
    { 
        headers: {
          'Authorization': `token ${localStorage.getItem('user_token')}`
        }
      }
    )    
      .then((response) => {
        localStorage.clear();
          this.$alert("Compte supprimé")
          router.push('/signin')
      })    
      .catch((errors) => {    
          this.$alert("Utilisateur inconnu")
      })    

    },
submitNewPassword : function () {
        let user = JSON.parse(localStorage.getItem("user"))
console.log(user.userId);
console.log(this.password);
axios.put("http://localhost:5010/api/user/"+user.userId, 
          {
            password: this.password
          },
          {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        })
        .then(response => {
            console.log(response);
            this.$alert("Mot de passe modifié")
          })
          .catch((err) => {
            console.log(err);
          });
return false;
},
showdiv: function () {
      //Affichage des consignes pour choisir le mot de passe
      document.getElementById("showfocus").style.display = "block";
    },

    maskdiv: function () {
      //Masquage des consignes pour choisir le mot de passe
      document.getElementById("showfocus").style.display = "none";
    },
  }
}


</script>

<style scoped>

.container {
  margin-top: 30px;
}
.container button {
  margin-bottom: 30px;
}
/*#return {
  position: absolute;
  top: 70px;
  left: 40px;
}*/
#changePassword button {
  margin-top: 20px;
}

@media (max-height:850px) and (orientation: portrait) {
/*#return {
  position: relative;
  top: 10px;
  left: 1px;
  margin: auto;
}*/
}
</style>