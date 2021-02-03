<template>
  <div id="container">
    <a href="www.groupomania.com"
      ><img src="../assets/icon-left-font2.png" alt="Groupomania"
    /></a>
    <!--<div id="singlePost" v-bind="post">
        <p><b>{{post.title}}</b></p> 
        <div>Créé le {{post.createdAt}}</div>
        <div>{{post.content}}</div> 
      </div>-->
    <div id="thePost">
      <div class="infos">
        <i class="far fa-envelope"></i> Posté le
        {{ post.createdAt | formatDate }} par {{ post.login }}
      </div>
      <div id="title">{{ post.title }}</div>
      <div id="content">{{ post.content }}</div>
    </div>
    <div id="theComments">
      <p><b>Commentaires</b></p>
      <div v-for="postComment in postComments" class="divComment">
        <!--{{postComment}}
        {{modalId(postComment.id)}}-->
        <div class="infos">
          <i class="far fa-envelope"></i> Posté le
          {{ postComment.createdAt | formatDate }} par {{ postComment.login }}
        </div>
        <div>{{ postComment.content }}</div>
        <div
          v-if="
            userConnected.id == postComment.user_id ||
            userConnected.profile == 1
          "
        >
          <b-button
            class="btn btn-sm"
            v-b-modal.modal-delete-comment
            @click="$bvModal.show(modalId(postComment.id))"
            ><i class="far fa-trash-alt"></i> Supprimer</b-button
          >
          <b-modal
            v-bind:id="modalId(postComment.id)"
            title="Supprimer ce commentaire"
            hide-footer
          >
            <div class="d-block text-center">
              <h3>Souhaitez-vous vraiment supprimer ce commentaire?</h3>
            </div>
            <b-button class="mt-3" block @click="deleteComment(postComment.id)"
              >Valider</b-button
            >
            <b-button
              class="mt-3"
              block
              @click="$bvModal.hide(modalId(postComment.id))"
              >Annuler</b-button
            >
          </b-modal>
        </div>
      </div>
    </div>

    <form method="POST" @submit.prevent="submitAddComment">
      <div class="form-group">
        <label for="add_comment"><b>Ajouter un commentaire</b></label>
        <textarea
          v-model="textComment"
          class="form-control"
          id="textComment"
          name="textComment"
        ></textarea>
      </div>
      <button class="btn btn-primary" type="submit"><i class="far fa-envelope"></i> Envoyer</button>
    </form>
    <div id="return"><a href="/posts"><button type="button" class="btn btn-primary">Retour</button></a></div>

  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "post",
  data() {
    return {
      post: {},
      postComments: [],
      userConnected: {},
      textComment: "",
    };
  },
  async created() {
    this.post = (
      await axios.get(
        "http://localhost:5010/api/post/" + this.$route.params.id,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        }
      )
    ).data;

  

    //récupération des commentaires liés au post
    this.postComments = (
      await axios.get(
        "http://localhost:5010/api/comment/?post_id=" + this.$route.params.id,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        }
      )
    ).data;

    this.userConnected = (
      await axios.get("http://localhost:5010/api/user/fromtoken", {
        headers: {
          Authorization: `token ${localStorage.getItem("user_token")}`,
        },
      })
    ).data;

  //on va chercher la ligne de la table post_read avec le user_id et le post_id qui nous intéressent
  axios.get(
        "http://localhost:5010/api/post_read/" + this.userConnected.id + "/" + this.post.id,
        {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        }
      ).then(reponse => {
        if(reponse.data === null) {
          //on ajoute l'enregistrement dans la table
          console.log('pas de post_read trouvé')
          axios.post("http://localhost:5010/api/post_read/", 
            {
              user_id: this.userConnected.id,
              post_id: this.post.id,
              last_read: new Date()
            },
            {
              headers: {
                Authorization: `token ${localStorage.getItem("user_token")}`,
              },
            }
          )
          .then(response => {
            console.log(response);
          })
          //Si échec authentification, avertissement de l'utilisateur
          .catch((err) => {
            console.log(err);
          });
        }
        else {
          //on met à jour l'enregistrement existant
          axios.put("http://localhost:5010/api/post_read/"+reponse.data.id, 
            {
              last_read: new Date()
            },
            {
              headers: {
                Authorization: `token ${localStorage.getItem("user_token")}`,
              },
            }
          )
          .then(response => {
            console.log(response)
          })
          //Si échec authentification, avertissement de l'utilisateur
          .catch((err) => {
            console.log(err)
          });
        }
    })
    .catch((err) => {
      console.log(err);
    });
    
  },
  methods: {
    modalId: function (id) {
      // `this` points to the vm instance
      return 'modal-delete-comment-'+id
    },
    submitAddComment: function () {
      //console.log(this.userConnected);
      if (this.textComment.trim() === "") {
        this.$alert("Le commentaire ne peut pas être vide");
        return false;
      }
      axios
        .post(
          "http://localhost:5010/api/comment",
          {
            user_id: this.userConnected.id,
            content: this.textComment,
            post_id: this.$route.params.id,
          },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `token ${localStorage.getItem("user_token")}`,
            },
          }
        )
        .then((response) => {
          //on recharge la page pour afficher le nouveau commentaire créé
          router.go();
        })
        .catch(() => {
          this.$alert("Echec");
        });
    },
    deleteComment: function (commentId) {
      axios
        .delete("http://localhost:5010/api/comment/" + commentId, {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        })
        .then((response) => {
          this.$alert("Commentaire supprimé");
          router.go();
        })
        .catch((errors) => {
          console.log(errors);
          this.$alert("Commentaire inexistant");
        });
    },

    /*getAllComments: function(postId) {
  axios
        .get("http://localhost:5010/api/comment/", {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        })
        .then((response) => {
          this.$alert("Post supprimé");
          window.location.reload(false);
        })
        .catch((errors) => {
          console.log(errors);
          this.$alert("Post inexistant");
        });
}*/
  },
};
</script>

<style scoped>
#container {
  background-color: #dae0e6;
}

#thePost {
  background: #eee;
  padding: 20px;
  box-shadow: 5px 10px #888888;
  border-radius: 20px;
}

#theComments {
  margin-top: 30px;
}

.divComment {
  box-shadow: 2px 5px #888888;
  border-radius: 10px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  background-color: white;
  padding: 10px;
}
#content {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
}
.infos {
  text-align: left;
  font-size: small;
  color: grey;
}
#comments {
  text-align: left;
  color: grey;
  margin-top: 10px;
}
#title {
  font-weight: bold;
  text-align: center;
}
#container {
  background-color: #dae0e6;
}
img {
  max-width: 15%;
  height: auto;
}
.fa-bell {
  transform: rotate(30deg);
  float: right;
  margin: 5px;
  color: green;
}
#return {
  position: absolute;
  top: 30px;
  left: 40px;
}

@media (max-height:850px) and (orientation: portrait) {
#return {
  position: absolute;
  top: 10px;
  left: 20px;
}
}
</style>
