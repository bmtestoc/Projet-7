<template>

<div class="container">
  <div id="changePassword"><button type="button" class="btn btn-secondary">Changer mon mot de passe</button></div>

<b-button class="btn btn-warning" v-b-modal.modal-delete-account @click="$bvModal.show('modal-delete-account')">Supprimer mon compte</b-button>
<b-modal id="modal-delete-account" title="Supprimer mon compte" hide-footer>
    <div class="d-block text-center">
      <h3>Souhaitez-vous vraiment supprimer votre compte?</h3>
    </div>
    <b-button class="mt-3" block @click="deleteAccount()">Valider</b-button>
    <b-button class="mt-3" block @click="$bvModal.hide('modal-delete-account')">Annuler</b-button>
</b-modal>

<div id="return"><a href="/posts"><button type="button" class="btn btn-primary">Retour</button></a></div>

</div>

</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  name: 'userAccount',
  methods: {
    deleteAccount : function() {
      console.log('je suis dans deleteAccount)');
      console.log(localStorage.getItem('user_token'))
      localStorage.getItem("user");
      //console.log(localStorage.getItem("user"));
      let user = JSON.parse(localStorage.getItem("user"))
      //console.log(user);
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

    }
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
#return {
  position: absolute;
  top: 70px;
  left: 50px;
}

</style>