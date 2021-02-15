import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import posts from '@/views/posts'
import post from '@/views/post.vue'
import connectionPage from '@/views/connection.vue'
import inscriptionPage from '@/views/inscription.vue'
import rules from '@/components/rules'
import component404 from '@/views/error404.vue'
import userAccount from '@/views/userAccount.vue'
import admin from '@/views/admin.vue'
import addPost from '@/views/addPost.vue'
import axios from "axios";

let router = new Router({
  mode: 'history',
  // paramétrage des URL et de leur accès
  routes: [
    {
      path: '/signup',
      name: 'inscriptionPage',
      component: inscriptionPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/signin',
      name: 'connectionPage',
      component: connectionPage,
      meta: {
        guest: true
      }
    },
    {
      path: '/posts',
      name: 'posts',
      component: posts,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/post/:id',
      name: 'postPage',
      component: post,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/cgu',
      name: 'rules',
      component: rules,
    },
    {
      path: '*',
      component: component404,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myaccount',
      name: 'userAccountPage',
      component: userAccount,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'adminPage',
      component: admin,
      meta: {
        requiresAuth: true,
        isAdmin: true
      }
    },
    {
      path: '/add',
      name: 'addPostPage',
      component: addPost,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// regles de redirection en fonction des droits
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('user_token') == null) {
      //on redirige vers signin s'il n'y a pas de user_token dans le local storage
      next({
        path: '/signin',
        params: { nextUrl: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.isAdmin)) {
        //si le user doit être admin pour accéder à la route, on va chercher ses infos à partir du token renseigné dans local storage
        axios.get("http://localhost:5010/api/user/fromtoken", {
          headers: {
            Authorization: `token ${localStorage.getItem("user_token")}`,
          },
        })
          .then((response) => {
            //si user.profile = 1 (admin), alors on l'autorise à accéder à la route
            if (response.data.profile === 1) {
              next()
            }
            else {
              //sinon, on le redirige vers le forum (liste des posts)
              next({ name: 'posts' })
            }
          })
          .catch((errors) => {

          });
      } else {
        //si pas besoin d'être admin, on redirige vers la page demandée
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('user_token') == null) {
      next()
    }
    else {
      next({ name: 'posts' })
    }
  } else {
    next()
  }
})

export default router