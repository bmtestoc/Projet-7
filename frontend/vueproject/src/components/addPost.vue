<template>

<div class="container">
  <!--<div id="return"><a href="/posts"><button type="button" class="btn btn-primary">Retour</button></a></div>-->
<form method="POST" @submit.prevent="submitAddPost">
      <div class="form-group">
        <!--<label for="add_post"><b>Créer un sujet</b></label>-->
        <input type="text"
          v-model="title"
          class="form-control"
          id="title"
          name="title"
          placeholder="Titre"
          maxlength="80"
        />
        <textarea
          v-model="content"
          class="form-control"
          id="content"
          name="content"
          placeholder="Contenu"
        ></textarea>
      </div>
      <button class="btn btn-primary" type="submit"><i class="far fa-envelope"></i> Envoyer</button>
    </form>
</div>

</template>

<script>
import axios from "axios";
import router from "../router/index";

export default {
  name: 'addPost',
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
      if (this.title.trim() === "" || this.content.trim() === "") {
        this.$alert("Le titre ou le contenu est vide");
        return false;
      }
      axios
        .post(
          "http://localhost:5010/api/post",
          {
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
          //redirection vers la liste des posts
          this.$alert("Merci pour votre participation !");
          /*window.location.href = "http://localhost:8080/posts";*/
          router.push('posts');
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
/*#return {
  position: absolute;
  top: 70px;
  left: 50px;
}*/
#title {
margin-top: 100px;
}
#content {
margin-top: 20px;
}

@media (max-height:850px) and (orientation: portrait) {
/*#return {
  position: relative;
  top: 10px;
  left: 1px;
  margin: auto;
}*/
#title {
margin-top: 20px;
}
}
</style>