<template>
  <section id="chatContainer">
    <Navbar/>
    <div class="columns is-gapless">
      <div id="users" class="column is-2">
        <UserCard
          @click.native="openChat(user.id,user.name)"
          :name="user.name"
          :id="user.id"
          :avatar="user.avatar"
          :active="user.active"
          v-for="user in usersWithoutMe"
        />
      </div>
      <div id="messages" class="column is-6 has-background-grey-light">
        <div id="messageList" class="is-12" v-chat-scroll="{always: false, smooth: true}">
          <MessageCard
            :messageID="message.id"
            :message="message.message"
            :senderID="message.senderID"
            :senderName="message.senderName"
            :timestamp="message.timestamp"
            v-for="message in messegesList"
          />
          <h1
            v-if="currentChatId === ''"
            class="has-text-white-bis is-size-5 has-text-centered"
          >Nothing to display..</h1>
        </div>
        <div id="messageForm">
          <InputMessage v-if="currentChatId !== ''"/>
        </div>
      </div>
      <div v-if="this.receiverUserProfile" id="receiverProfile" class="column is-2">
        <img :src="receiverUserProfile.avatar" alt="avatar">
        <h1>{{receiverUserProfile.name}}</h1>
        <h2>{{receiverUserProfile.workplace}}</h2>
        <p>{{makeDateReadable}}</p>
        <p>{{receiverUserProfile.city}}</p>
        <p>{{receiverUserProfile.phone}}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import MessageCard from "../components/MessageCard";
import InputMessage from "../components/InputMessage";

const fb = require("../firebaseConfig.js");
const moment = require("moment");

export default {
  name: "chat",
  components: {
    Navbar,
    UserCard,
    MessageCard,
    InputMessage
  },
  methods: {
    openChat(id, name) {
      this.$store.commit("setReceiverUser", id);
      this.$store.dispatch("getReceiverUserProfile");
      this.$store.dispatch("makeUsersPairChat");
      this.$store.dispatch("getChatsUploadedFile");
    }
  },
  computed: {
    ...mapState([
      "currentUser",
      "usersList",
      "receiverUserProfile",
      "messegesList",
      "currentChatId"
    ]),
    usersWithoutMe() {
      const me = this.currentUser;
      return this.usersList.filter(user => user.id !== me.uid);
    },
    makeDateReadable() {
      const data = moment(this.receiverUserProfile.birthday).format(
        "YYYY-MM-DD"
      );
      return data;
    }
  },
};
</script>
<style lang="scss" scoped>
#messages {
  height: calc(100vh - 52px);
}
#users {
  overflow-y: scroll;
  height: calc(100vh - 52px);
  background-color: #ecebf9;
}
#users::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
}
/* optional: show position indicator in red */
#users::-webkit-scrollbar-thumb {
    background: #FF0000;
}
#messageList,
#messageForm {
  width: 100%;
}
#messageList {
  height: calc(100% - 40px);
  overflow-y: scroll;
  padding: 2em;
}
.flexed {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
