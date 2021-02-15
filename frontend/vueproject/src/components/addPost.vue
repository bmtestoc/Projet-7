<template>
  <div class="container">
    <div id="return">
      <a href="/posts"
        ><i
          class="far fa-arrow-alt-circle-left fa-3x"
          title="Retour au forum"
        ></i
      ></a>
    </div>
    <h1>Créer un sujet</h1>
    <!-- formulaire d'envoi -->
    <form method="POST" @submit.prevent="submitAddPost">
      <div class="form-group">
        <!-- champ titre -->
        <label for="title">Titre</label>
        <input
          type="text"
          v-model="title"
          class="form-control"
          id="title"
          name="title"
          placeholder="Votre titre"
          maxlength="80"
        />
        <!-- champ contenu -->
        <label for="content">Contenu</label>
        <textarea
          v-model="content"
          class="form-control"
          id="content"
          name="content"
          placeholder="Votre contenu"
        ></textarea>
      </div>
      <button class="btn btn-primary" type="submit">
        <i class="far fa-envelope"></i> Envoyer
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  name: "addPost",
  data() {
    return {
      userConnected: {},
      title: "",
      content: "",
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
    submitAddPost: function () {
      // envoi refusé si titre ou contenu vide
      if (this.title.trim() === "" || this.content.trim() === "") {
        this.$alert("Le titre ou le contenu est vide");
        return false;
      }
      axios
        .post(
          "http://localhost:5010/api/post",
          {
            // envoi des données à l'api pour insertion en bdd du nouveau sujet
            user_id: this.userConnected.id,
            title: this.title,
            content: this.content,
          },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `token ${localStorage.getItem("user_token")}`,
            },
          }
        )
        .then((response) => {
          axios
            .post(
              "http://localhost:5010/api/post_read/",
              {
                // envoi des données à l'api pour insertion en bdd du nouveau post_read
                user_id: this.userConnected.id,
                post_id: response.data.post.id,
                last_read: new Date(),
              },
              {
                headers: {
                  Authorization: `token ${localStorage.getItem("user_token")}`,
                },
              }
            )
            .then((response) => {})
            //Si échec authentification, avertissement de l'utilisateur
            .catch((err) => {});
          this.$alert("Merci pour votre participation !"); // message à l'utilisateur
          router.push("posts"); //redirection vers la liste des posts
        })
        .catch(() => {
          this.$alert("Echec");
        });
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
#return {
  position: absolute;
  top: 60px;
  left: 50px;
}
.fa-arrow-alt-circle-left {
  color: rgb(194, 60, 60);
}

@media (max-height: 850px) and (orientation: portrait) {
  #return {
    position: relative;
    top: 10px;
    left: 1px;
    margin: auto;
  }
  #title {
    margin-top: 20px;
  }
}
</style>