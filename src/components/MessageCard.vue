<template>
  <div>
    <div class="column is-two-thirds" :class="isMessageFromMe">
      <div @dblclick="deleteMessage()" class="card">
        <div class="card-content">
          <div class="media-content">
            <p class="title is-6">{{message}}</p>
            <div class="subtitle" :class="isMessageFromMe">
              <span class="tag is-white">{{senderName}}</span>
              <span class="tag is-info">{{makeDateReadable}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const moment = require('moment');

export default {
  name: 'messageCard',
  props: {
    messageID: String,
    message: String,
    senderID: String,
    senderName: String,
    timestamp: Number,
  },
  computed: {
    ...mapState(['currentUser']),
    isMessageFromMe() {
      if (this.currentUser.uid === this.senderID) {
        return 'is-pulled-right';
      }
      return 'is-pulled-left';
    },
    makeDateReadable() {
      const data = moment(this.timestamp).format('YYYY-MM-DD HH:mm');
      return data;
    },
  },
  methods: {
    deleteMessage() {
      this.$store.dispatch('deleteMessage', { messageID: this.messageID, senderID: this.senderID });
    },
  },
};
</script>
