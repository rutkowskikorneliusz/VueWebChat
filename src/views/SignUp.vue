<template>
  <div class="columns">
    <div class="slug">
      <h1>Nice to see you!</h1>
      <p>We are happy that you want to join us. Many wonderful moments await you with your friends</p>
    </div>
    <div class="loginForm">
      <form @submit.prevent>
        <h1>Sign up</h1>
        <div class="form-element" :class="{ isError: isValidated.name }">
          <input name="name" type="text" v-model="userCredentials.name" placeholder="Full name">
          <label for="name">Full name</label>
        </div>
        <div class="form-element" :class="{ isError: isValidated.email }">
          <input name="email" type="email" v-model="userCredentials.email" placeholder="Email">
          <label for="email">Email</label>
        </div>
        <div class="form-element" :class="{ isError: isValidated.password }">
          <input name="password" type="password" v-model="userCredentials.password" placeholder="Password">
          <label for="password">Password</label>
        </div>
        <div class="form-element">
          <input @click="registerUser" type="submit" value="Sign Up">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data() {
    return {
      userCredentials: {
        name: '',
        email: '',
        password: '',
      },
      isValidated: {
        name: false,
        email: false,
        password: false,
      },
    };
  },
  methods: {
    registerUser() {
      if (this.userCredentials.name === '' || this.userCredentials.email === '' || this.userCredentials.password === '' || this.userCredentials.password.length < 6) {
        (this.userCredentials.name === '') ? this.isValidated.name = true : this.isValidated.name = false;
        (this.userCredentials.email === '') ? this.isValidated.email = true : this.isValidated.email = false;
        (this.userCredentials.password === '' || this.userCredentials.password.length < 6) ? this.isValidated.password = true : this.isValidated.password = false;
      } else {
        this.isValidated.name = false;
        this.isValidated.email = false;
        this.isValidated.password = false;

        this.$store.dispatch('registerUser', this.userCredentials).then(() => {
          this.$router.push('/');
        }).catch((err) => {
          this.$toasted.show(err, { position: 'top-center', duration: 5000, action: { text: 'OK' } });
        });
      }
    },
  },
};
</script>
