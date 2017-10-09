import Es6Promise from 'es6-promise';
Es6Promise.polyfill();
import 'es6-promise/auto';
import Promise from 'promise-polyfill';
if (!window.Promise) {
  window.Promise = Promise;
}


import './styles/main.css'

import Vue from 'vue'
import VueRouter from 'vue-router'
import {router} from './config/router.js'
import {cfg} from './config/config.js'

import App from './App.vue'

new Vue({
  el: '#vm',
  data(){
    return {
      
    }
  },
  render: h => h(App),
  router
});