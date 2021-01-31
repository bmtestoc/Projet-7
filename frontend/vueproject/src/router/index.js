import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import posts from '@/views/posts'
import users from '@/components/users'
import post from '@/views/post.vue'
import connectionPage from '@/views/connection.vue'
import inscriptionPage from '@/views/inscription.vue'
import rules from '@/components/rules'
import component404 from '@/views/error404.vue'
import userAccount from '@/views/userAccount.vue'
import admin from '@/views/admin.vue'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/signup',
      name: 'inscriptionPage',
      component: inscriptionPage
    
    },
    {
      path: '/signin',
      name: 'connectionPage',
      component: connectionPage
    
    },
    {    
      path: '/posts',
      name: 'posts',
      component: posts
    },
    {    
      path: '/users',
      name: 'users',
      component: users
    },
    {    
      path: '/post/:id',
      name: 'postPage',
      component: post
    },
    {
      path: '/cgu',
      name: 'rules',
      component: rules
    
    },
    {
      path: '*',
      component: component404
    
    },
    {
      path: '/myaccount',
      name: 'userAccountPage',
      component: userAccount
    },
    {
      path: '/admin',
      name: 'adminPage',
      component: admin
    }
  ]
})
