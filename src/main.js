import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

Vue.use(VueResource);
Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyA-0Ix3T_Urcx3v2Z7Lupvjd-GhUwevGjs",
    authDomain: "todolist-937d8.firebaseapp.com",
    databaseURL: "https://todolist-937d8.firebaseio.com",
    projectId: "todolist-937d8",
    storageBucket: "todolist-937d8.appspot.com",
    messagingSenderId: "782305159323",
    appId: "1:782305159323:web:2ea1a1bac8fb0e5f267e3e",
    measurementId: "G-MJVWS9VPKT"
}

firebase.initializeApp(config)

export const db = firebase.database()

new Vue({
  router,
  store,            
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
