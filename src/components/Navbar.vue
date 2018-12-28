<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <p>Logged in: {{userProfile.name}}</p>
        </div>
        <div class="navbar-item">
          <div class="buttons">
            <a @click="edit" class="button is-light">Edit profile</a>
            <a @click="logout" class="button is-light">Log out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

const fb = require("../firebaseConfig.js");

export default {
  name: "navbar",
  methods: {
    edit() {
      this.$router.push("/edit");
    },
    logout() {
      this.$store.commit("changeUserActiveStatus",false);
      this.$store.dispatch("setUserActiveStatus");
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(["userProfile"])
  }
};
</script>
<style lang="scss" scoped>
</style>
