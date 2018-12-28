<template>
  <form @keyup.enter="sendMessage" @submit.prevent>
    <div class="field has-addons is-fullwidth">
      <div class="control is-expanded">
        <input v-model="message" class="input is-medium" type="text" placeholder="Type a message">
      </div>
      <div class="control">
        <a @click="sendMessage" class="button is-info is-medium">Send</a>
      </div>
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
        this.$store.dispatch('sendMessage', this.message);
      }
      this.message = '';
    },
  },
};
</script>
