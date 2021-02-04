<template>

<div class="container">
  <!--<div v-for="user in users">
      <div id="infos">
        Login {{ user.login }} Email {{ user.email }} Inscrit le {{ user.createdAt | formatDate }} Dernière connexion le {{ user.last_connection | formatDate }}
      </div>
  </div>-->
  <input type="text" class="form-control" v-model="keyword" placeholder="Rechercher" />
  <div class="table-responsive">
  <b-table stacked="md" striped hover :items="items" :fields="fields" :keyword="keyword" >
    <template #cell(is_active)="data">
        <!--{{data}}-->
        <i title="Désactiver" v-if="data.item.is_active == 1" v-on:click="activeInactiveUser(data.item.is_active, data.item.id)" :class="' cursorPointer fas fa-check'"></i>
        <i title="Activer" v-if="data.item.is_active == 0" v-on:click="activeInactiveUser(data.item.is_active, data.item.id)" :class="' cursorPointer fas fa-minus-circle'"></i>
    </template>
  </b-table>
<!--<div id="return"><a href="/posts"><button type="button" class="btn btn-primary">Retour</button></a></div>-->
</div>
</div>

</template>

<script>
import axios from "axios";
import router from "../router/index";
import moment from 'moment';

export default {
  name: 'admin',

data() {
    return {
      keyword: '',
      users: [],
      fields: [
        {key: 'login', label: 'Nom', sortable: true},
        {key: 'email', label: 'Adresse email', sortable: true},
        {key: 'last_connection', label: 'Dernière connexion', sortable: true,
          formatter: function(value, key, item) {
            return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
          }
        },
        {key: 'createdAt', label: 'Créé le', sortable: true, 
          formatter: function(value, key, item) {
            return moment(String(value)).format('DD/MM/YYYY')
          }
        },
        {key: 'updatedAt', label: 'Mis à jour le', sortable: true,
          formatter: function(value, key, item) {
            return moment(String(value)).format('DD/MM/YYYY')
          }
        },
        {key: 'is_active', label: 'Actif', sortable: true,
          //formatter: 'getActiveInactive',
        }
      ]
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
    this.users = (
      await axios.get("http://localhost:5010/api/user/allusers", {
        headers: {
          Authorization: `token ${localStorage.getItem("user_token")}`,
        },
      })
    ).data;
  },
  methods: {
      getAllUser: function() {
        router.get('/user');
      },
      activeInactiveUser(oldValueIsActive, userId) {
        let newValueIsActive = 0;
        //si le user est inactif,
        if(oldValueIsActive === 0) {
          //on l'active
          newValueIsActive = 1;
        }
        
        //todo appeler API pour push la nouvelle valeur de is_active au userId
        axios.put("http://localhost:5010/api/user/"+userId, 
          {
            is_active: newValueIsActive
          },
          {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        })
        .then(response => {
            console.log(response);
            router.go();
          })
          //Si échec authentification, avertissement de l'utilisateur
          .catch((err) => {
            console.log(err);
          });
    }
  },
  computed: {
    items() {
      return this.keyword
        ? this.users.filter(item => item.login.includes(this.keyword) || item.email.includes(this.keyword))
        : this.users
    }
  }
  };

</script>

<style scoped>

.container {
  margin-top: 30px;
}
/*#return {
  position: absolute;
  top: 70px;
  left: 40px;
}*/
.cursorPointer {
    cursor: pointer;
}

@media (max-width:850px) and (orientation: portrait) {
/*#return {
  position: relative;
  top: 10px;
  left: 1px;
  margin: auto;
}*/
}
</style>