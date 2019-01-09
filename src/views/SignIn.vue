<template>
  <div class="columns">
    <div class="slug">
      <h1>Welcome Back!</h1>
      <p>To keep connected with us please login with your email and password</p>
    </div>
    <div class="loginForm">
      <form @submit.prevent>
        <h1>Sign in</h1>
        <div class="form-element" :class="{ isError: isValidated.email }" >
          <input type="email" v-model="userCredentials.email" placeholder="Email">
          <label for>Email</label>
        </div>
        <div class="form-element" :class="{ isError: isValidated.password }">
          <input type="password" v-model="userCredentials.password" placeholder="Password">
          <label for>Password</label>
        </div>
        <div class="form-element">
          <input @click="loginUser" type="submit" value="Sign In">
        </div>
        <div class="form-options">
          <a href>Reset password</a>
          <span>or</span>
          <a @click="goToSignUp">Create an account</a>
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
        email: '',
        password: '',
      },
      isValidated: {
        email: false,
        password: false,
      },
    };
  },
  methods: {
    loginUser() {
      if (this.userCredentials.email === '' || this.userCredentials.password === '') {
        (this.userCredentials.email === '') ? this.isValidated.email = true : this.isValidated.email = false;
        (this.userCredentials.password === '') ? this.isValidated.password = true : this.isValidated.password = false;
      } else {
        this.isValidated.email = false;
        this.isValidated.password = false;

        this.$store.dispatch('loginUser', this.userCredentials).then(() => {
          this.$router.push('/');
        }).catch((err) => {
          this.$toasted.show(err, { position: 'top-center', duration: 5000, action: { text: 'OK' } });
        });
      }
    },
    goToSignUp() {
      this.$router.push('/signup');
    },
  },
};
</script>
