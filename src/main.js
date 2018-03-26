// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/style/css/icon-base64.css'
import './assets/style/css/main.css'

import store from './store'

Vue.use(VueAxios,axios);

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
