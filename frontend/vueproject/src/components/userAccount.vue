<template>
  <div class="container">
    <h1>Mon compte</h1>
    <!-- pour changer son mot de passe avec rappel des consignes -->
    <div id="changePassword">
      <form method="POST" @submit.prevent="submitNewPassword">
        <div
          v-b-tooltip.hover
          title="Votre mot de passe doit contenir: au moins 6 caractères, au moins une lettre en minuscule, au moins une lettre en majuscule, au moins un nombre."
        >
          <label for="newPassword">Mot de passe</label>
          <input
            type="password"
            class="form-control"
            id="newPassword"
            name="newPassword"
            placeholder="Saisissez votre nouveau mot de passe"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            v-model="password"
          />
        </div>
        <button type="submit" class="btn btn-secondary">
          Changer mon mot de passe
        </button>
      </form>
    </div>
    <!-- pour supprimer son compte -->
    <b-button
      class="btn btn-danger"
      v-b-modal.modal-delete-account
      @click="$bvModal.show('modal-delete-account')"
      >Supprimer mon compte</b-button
    >
    <b-modal id="modal-delete-account" title="Supprimer mon compte" hide-footer>
      <div class="d-block text-center">
        <h3>Souhaitez-vous vraiment supprimer votre compte?</h3>
      </div>
      <b-button class="mt-3" block @click="deleteAccount()">Valider</b-button>
      <b-button
        class="mt-3"
        block
        @click="$bvModal.hide('modal-delete-account')"
        >Annuler</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  name: "userAccount",
  data() {
    return {
      password: "",
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
    // suppression du compte
    deleteAccount: function () {
      axios
        .delete("http://localhost:5010/api/user/" + this.userConnected.id, {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        })
        .then((response) => {
          localStorage.clear();
          this.$alert("Compte supprimé");
          router.push("/signin");
        })
        .catch((errors) => {
          this.$alert("Utilisateur inconnu");
        });
    },
    // changement du mot de passe
    submitNewPassword: function () {
      axios
        .put(
          "http://localhost:5010/api/user/" + this.userConnected.id,
          {
            password: this.password,
          },
          {
            headers: {
              Authorization: `token ${localStorage.getItem("user_token")}`,
            },
          }
        )
        .then((response) => {
          this.$alert("Mot de passe modifié");
        })
        .catch((err) => {
          this.$alert("Une erreur est survenue lors de la modification");
        });
      return false;
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}
.container button {
  margin-bottom: 30px;
}
#changePassword button {
  margin-top: 20px;
}
</style>