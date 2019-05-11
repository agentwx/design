import Vue from 'vue'
import Homestay from './Homestay.vue'
import router from './router/'
import store from './store/'
import './registerServiceWorker'
import './config/'
import './router/beforEach'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(Homestay)
}).$mount('#homeStay')