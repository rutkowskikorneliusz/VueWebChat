<template>
  <form @submit.prevent>
    <div class="is-fullwidth">
      <b-field>
        <b-input
          v-model="emailUser"
          size="is-medium"
          placeholder="Email"
          type="email"
          icon-pack="fas"
          icon="envelope"
        ></b-input>
      </b-field>
      <b-field>
        <b-input
          v-model="passwordUser"
          size="is-medium"
          placeholder="Password"
          type="password"
          icon-pack="fas"
          icon="unlock"
        ></b-input>
      </b-field>
      <div class="control">
        <button
          @click="loginUser"
          class="button is-primary is-medium is-outlined is-fullwidth"
        >Login</button>
      </div>
    </div>
  </form>
</template>

<script>
const fb = require('../firebaseConfig.js');

export default {
  name: 'login',
  data() {
    return {
      emailUser: 'rutkowski.korneliusz@gmail.com',
      passwordUser: 'samsung',
    };
  },
  methods: {
    loginUser() {
      fb.auth
        .signInWithEmailAndPassword(this.emailUser, this.passwordUser)
        .then((user) => {
          this.$store.commit('setCurrentUser', user.user);
          this.$store.dispatch('fetchUserProfile');
          this.$router.push('/chat');
        })
        .catch(err => {
          console.log(err)
        });

    },
  },
};
</script>