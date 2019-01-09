<template>
  <div @dblclick="deleteMessage" class="message" :class="{ me : this.isMe}">
    <div class="messageBody">
      <div class="messageContent" :class="{ me : this.isMe}">
        <p>{{message}}</p>
      </div>
      <div class="messageMeta" :class="{ me : this.isMe}">
        <p>{{makeDateReadable}}</p>
      </div>
    </div>
    <div class="messageSender" >
      <img v-if="this.isMe" :src="this.userProfile.avatar" alt="avatar">
      <div v-else>
        <img v-if="this.renderReceiverAvatar" :src="this.receiverUserProfile.avatar" alt="avatar">
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
  data() {
    return {
      isMe: false,
      interval: null,
      renderReceiverAvatar: false,
    };
  },
  computed: {
    ...mapState(['userProfile', 'receiverUserProfile']),
    makeDateReadable() {
      const data = moment(this.timestamp)
        .startOf('s')
        .fromNow();
      return data;
    },
  },
  watch: {
    receiverUserProfile() {
      this.renderReceiverAvatar = true;
    },
  },
  methods: {
    deleteMessage() {
      this.$store.dispatch('deleteMessage', {
        messageID: this.messageID,
        senderID: this.senderID,
      });
    },
  },
  beforeMount() {
    if (this.userProfile.id === this.senderID) {
      this.isMe = true;
    } else {
      this.isMe = false;
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/var.scss";

.message {
  width: 100%;
  display: flex;
  padding: 1rem 0;
  justify-content: flex-end;
  &.me {
    flex-direction: row;
  }
  &:not(.me) {
    flex-direction: row-reverse;
  }
  .messageBody {
    max-width: 75%;
    display: flex;
    flex-direction: column;
    @media screen and (max-width: $break-small) {
      max-width: 100%;
    }

    .messageContent {
      &.me {
        background-color: $main-color;
        color: #fff;
        padding: 1rem 2rem 1rem 1rem;
        border-radius: 15px 0 15px 15px;
        @media screen and (max-width: $break-small) {
          padding: 1rem 1rem 1rem 1rem;
        }
      }
      &:not(.me) {
        background-color: $grey-accent;
        padding: 1rem 1rem 1rem 2rem;
        border-radius: 0 15px 15px 15px;
        @media screen and (max-width: $break-small) {
          padding: 1rem 1rem 1rem 1rem;
        }
      }
    }
    .messageMeta {
      display: flex;
      font-size: 0.8em;
      &.me {
        justify-content: flex-end;
      }
      &:not(.me) {
        justify-content: flex-start;
      }
    }
  }
  .messageSender {
    padding: 0 1rem;
    img {
      width: 64px;
      width: 32px;
      border-radius: 100%;
      @media screen and (max-width: $break-small) {
        width: 32px;
        height: 32px;
      }
    }
  }
}
</style>
