import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import posts from '@/views/posts'
import users from '@/components/users'
import post from '@/components/post'
import connectionPage from '@/views/connection.vue'
import inscriptionPage from '@/views/inscription.vue'
import rules from '@/components/rules'

/* POUR TESTS
import burgerMenu from '@/components/burgerMenu'
*/

export default new Router({
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
      name: 'post',
      component: post
    },
    {
      path: '/cgu',
      name: 'rules',
      component: rules
    
    }
    /* POUR TESTS,
    {
      path: '/bk',
      name: 'burgerMenu',
      component: burgerMenu
    }*/
  ]
})
