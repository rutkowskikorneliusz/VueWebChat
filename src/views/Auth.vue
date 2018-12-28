<template>
  <section class="hero is-primary is-fullheight is-bold">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title is-2">Welcome in VueChat!</h1>
        <h2 class="subtitle ">Make an account and easy chat with yours friends</h2>

        <nav class="level">
          <div class="level-item">
            <div class="box">
              <Login/>
            </div>
          </div>
          <div class="level-item">
            <div class="box">
              <Register />
            </div>
          </div>
        </nav>
      </div>
    </div>
  </section>
</template>

<script>
import Login from '../components/Login';
import Register from '../components/Register';

export default {
  name: 'auth',
  components: {
    Login,
    Register,
  },
};
</script>

<style lang="scss" scoped>
  .box {
   padding: 2.5rem;
  }
</style>
