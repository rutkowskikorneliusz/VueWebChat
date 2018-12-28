import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Auth from './views/Auth.vue';
import Chat from './views/Chat.vue';
import EditProfile from './views/EditProfile.vue';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/chat',
    },
    {
      path: '/',
      name: 'auth',
      component: Auth,
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditProfile,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(user => user.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next('/');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});
export default router;
