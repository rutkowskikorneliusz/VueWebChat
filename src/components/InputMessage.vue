<template>
  <form @keyup.enter="sendMessage" @submit.prevent>
    <div class="messageForm">
      <input v-model="message" class="input is-medium" type="text" placeholder="Type a message">
      <a @click="sendMessage">
        <i class="fas fa-chevron-right"></i>
      </a>
    </div>
  </form>
</template>

<script>
export default {
  name: 'inputMessage',
  data() {
    return {
      message: '',
    };
  },
  methods: {
    sendMessage() {
      if (this.message !== '') {
        this.$store
          .dispatch('sendMessage', this.message)
          .then(() => {
            this.$store.dispatch('fetchMessegesList');
          })
          .catch((err) => {
            this.$toasted.show(err, {
              position: 'top-center',
              duration: 5000,
              action: { text: 'OK' },
            });
          });
      }
      this.message = '';
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/var.scss";
.messageForm {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 1rem;
  input {
    height: 40px;
    width: 100%;
    border: 2px solid $grey-accent;
    border-radius: 20px;
    outline: none;
    text-indent: 1rem;
    font-size: 1.1em;
    &:focus {
      outline: 0;
      box-shadow: 0 0 0 1px rgba(35, 35, 35, 0.5);
    }
  }
    a {
    margin-left: -2rem;
    color: rgba(35, 35, 35, 0.5);
    font-size: 1.3em !important;

    &:hover {
      color: rgba(35, 35, 35, 0.5);
    }
  }
}
</style>
