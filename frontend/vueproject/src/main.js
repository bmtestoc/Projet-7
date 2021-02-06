import App from './App'
import router from './router'

Vue.config.productionTip = false

import Vue from 'vue'

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// Plugin de création des alertes
import VueSimpleAlert from "vue-simple-alert";
Vue.use(VueSimpleAlert);

//scroll infini
import InfiniteLoading from 'vue-infinite-loading';
Vue.use(InfiniteLoading,{
  slots: {
    noMore: 'Fin des posts',
  },
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// Plugin de formatage des dates heures
import moment from 'moment';
Vue.filter('formatDate', function(value) {
  if (value) {
      return moment(String(value)).format('DD/MM/YYYY HH:mm:ss')
  }
});