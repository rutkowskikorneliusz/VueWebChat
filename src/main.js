import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
import Toasted from 'vue-toasted';
import VueScrollTo from 'vue-scrollto';
import App from './App.vue';
import router from './router';
import { store } from './store';


/* Firebase */
const fb = require('./firebaseConfig.js');

// Vue.use(Buefy);
Vue.use(VueChatScroll);
Vue.use(Toasted);
Vue.use(VueScrollTo);

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
