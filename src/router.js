import Vue from 'vue';
import Router from 'vue-router';
import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import Chat from './views/Chat.vue';

const fb = require('./firebaseConfig.js');

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/',
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/',
      name: 'chat',
      component: Chat,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(user => user.meta.requiresAuth);
  const currentUser = fb.auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/signin');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});
export default router;
