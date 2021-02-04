// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

//scroll infini
import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading,{
  slots: {
    noMore: 'Fin des posts', // you can pass a string value
  },
});

// eslint-disable no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// Pour la gestion du format des dates heures
import moment from 'moment';
Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
  }
});