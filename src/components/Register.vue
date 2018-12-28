<template>
  <form @submit.prevent>
    <div class="is-fullwidth">
      <b-field>
        <b-input
          v-model="nameUser"
          size="is-medium"
          placeholder="Name and surname"
          type="text"
          icon-pack="fas"
          icon="user"
        ></b-input>
      </b-field>
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
          @click="registerUser"
          class="button is-primary is-medium is-outlined is-fullwidth"
        >Register</button>
      </div>
    </div>
  </form>
</template>

<script>
import { toast } from 'bulma-toast';

const fb = require('../firebaseConfig.js');

export default {
  name: 'register',
  data() {
    return {
      nameUser: '',
      emailUser: '',
      passwordUser: '',
    };
  },
  methods: {
    registerUser() {
      fb.auth
        .createUserWithEmailAndPassword(this.emailUser, this.passwordUser)
        .then((createdUser) => {
          const user = createdUser.user;
          this.$store.commit('setCurrentUser', user);

          fb.usersCollection.doc(user.uid).set({
              id: user.uid,
              name: this.nameUser,
            }).then(() => {
              this.$store.dispatch('fetchUserProfile');
              this.$router.push('/chat');
            })
            .catch((err) => {
              fb.makeToast(err,'error')
            })
        })
        .catch((err) => {
          fb.makeToast(err,'error')
        });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
