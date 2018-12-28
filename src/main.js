import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import { store } from './store';
import VueChatScroll from 'vue-chat-scroll'


/* Bulma */
import './assets/scss/app.scss';


/* Firebase */
const fb = require('./firebaseConfig.js');

Vue.use(Buefy);
Vue.use(VueChatScroll)

Vue.config.productionTip = false;
let app = '';

fb.auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
