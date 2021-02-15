<template>
  <div id="container">
    <a href="http://www.groupomania.com"
      ><img src="../assets/icon-left-font2.png" alt="Groupomania"
    /></a>
    <h1>Forum</h1>
    <!-- affichage de tous les posts -->
    <div id="posts">
      <div class="div-posts" v-for="post in posts">
        <!-- affichage animation cloche si le post a moins de 48h -->
        <span v-if="post.nb_hours_post < 48"
          ><i class="far fa-bell" title="Nouveau !"></i
        ></span>
        <!-- affichage des infos du post -->
        <div class="infos">
          <i class="far fa-envelope"></i> Posté par {{ post.user_login }} le
          {{ post.post_createdAt | formatDate }}
        </div>
        <div class="title cursorPointer" @click="goToPost(post.post_id)">
          {{ post.post_title }}
        </div>
        <div class="content" @click="goToPost(post.post_id)">
          {{ post.post_content }}
        </div>
        <!-- affichage nombre total de commentaires -->
        <div class="comments">
          <i class="far fa-comments"></i> {{ post.nb_comments }} commentaire(s)
        </div>
        <!-- affichage nombre nouveaux commentaires -->
        <div
          class="newComments"
          v-if="post.nb_comments_unread > 0 && post.last_read !== NULL"
        >
          <span class="light">
            {{ post.nb_comments_unread }} nouveau(x) commentaire(s)</span
          >
        </div>
        <!-- affichage bouton supprimer si le user est l'auteur du post ou s'il est admin -->
        <div
          v-if="
            userConnected.profile == 1 || userConnected.id == post.post_user_id
          "
          class="deleteButton"
        >
          <b-button
            class="btn btn-sm"
            v-b-modal.modal-delete-post
            @click="$bvModal.show(modalId(post.post_id))"
            ><i class="far fa-trash-alt"></i> Supprimer</b-button
          >
          <b-modal
            v-bind:id="modalId(post.post_id)"
            title="Supprimer ce post"
            hide-footer
          >
            <div class="d-block text-center">
              <h3>Souhaitez-vous vraiment supprimer ce post?</h3>
            </div>
            <b-button class="mt-3" block @click="deletePost(post.post_id)"
              >Valider</b-button
            >
            <b-button
              class="mt-3"
              block
              @click="$bvModal.hide(modalId(post.post_id))"
              >Annuler</b-button
            >
          </b-modal>
        </div>
      </div>
    </div>
    <!-- scroll infini -->
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router";

export default {
  name: "posts",
  data() {
    return {
      posts: [],
      page: 1,
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
    goToPost: function (postId) {
      // pour consulter un post et ses commentaires
      router.push("/post/" + postId);
    },
    modalId: function (id) {
      return "modal-delete-post-" + id;
    },
    deletePost: function (postId) {
      // pour supprimer un post
      axios
        .delete("http://localhost:5010/api/post/" + postId, {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        })
        .then((response) => {
          this.$alert("Post supprimé");
          window.location.reload(false);
        })
        .catch((errors) => {
          this.$alert("Post inexistant");
        });
    },
    // scroll infini
    infiniteHandler($state) {
      axios
        .get("http://localhost:5010/api/post/", {
          params: {
            page: this.page,
          },
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        })
        .then(({ data }) => {
          if (data.hits.length) {
            this.page += 1;
            this.posts.push(...data.hits);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    },
  },
};
</script>

<style scoped>
.div-posts {
  border: 1px solid #888888;
  border-radius: 10px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  box-shadow: 5px 5px #888888;
  padding: 10px;
  margin-bottom: 20px;
}
.content {
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
.comments {
  text-align: left;
  color: grey;
  margin-top: 10px;
}
.title {
  font-weight: bold;
  text-align: center;
}
.deleteButton {
  text-align: right;
  padding-right: 5px;
  padding-bottom: 5px;
}
#container {
  background-color: #dae0e6;
  padding-bottom: 15px;
}
img {
  max-width: 15%;
  height: auto;
}
.fa-bell {
  float: right;
  margin-right: 5px;
  color: rgb(194, 60, 60);
  animation: shake 0.5s;
  animation-iteration-count: infinite;
}
/* animation cloche */
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
.newComments {
  color: rgb(194, 60, 60);
}
.newComments span {
  display: block;
}
/* animation nouveau message */
.newComments span:not(.light) {
  opacity: 0;
  animation: flashText 0.5s ease-out alternate infinite;
}
.newComments span.light {
  position: relative;
  display: inline-block;
}
.newComments span.light:before {
  position: absolute;
  left: 0;
  top: -10%;
  width: 100%;
  height: 120%;
  background: white;
  filter: blur(10px);
  content: "";
  opacity: 0;
  animation: flash 0.5s ease-out alternate infinite;
}
@keyframes flash {
  to {
    opacity: 0.4;
  }
}
@keyframes flashText {
  to {
    opacity: 0.15;
  }
}

.cursorPointer {
  cursor: pointer;
}
</style>
