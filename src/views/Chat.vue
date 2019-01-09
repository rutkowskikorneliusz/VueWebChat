<template>
  <section id="chatContainer">
    <Navbar/>
    <div class="columns">
      <div id="users" v-if="usersWithoutMe">
        <UserCard
          @click.native="openChat(user.id)"
          :name="user.name"
          :id="user.id"
          :avatar="user.avatar"
          :active="user.active"
          v-for="user in usersWithoutMe"
          :key="user.id"
        />
      </div>
      <div id="messages">
        <div class="userProfile" v-if="currentChatId !== '' && receiverUserProfile">
          <img :src="this.receiverUserProfile.avatar" :alt="this.receiverUserProfile.name">
          <p>{{this.receiverUserProfile.name}}</p>
          <div class="userInformationSlider">
            <div class="sliderIcon" @click="isOpen = !isOpen">
              <template v-if="isOpen">
                <span>
                  <i class="fas fa-angle-double-right"></i>
                </span>
              </template>
              <template v-else>
                <span>
                  <i class="fas fa-angle-double-left"></i>
                </span>
              </template>
            </div>
            <div @click="isOpen = !isOpen" class="userInformation" :class="{ open : isOpen}">
              <ReceiverProfile/>
            </div>
          </div>
        </div>
        <div
          id="messageList"
          :class="{ open : isOpen}"
          v-chat-scroll="{always: false, smooth: true}"
        >
          <MessageCard
            :messageID="message.id"
            :message="message.message"
            :senderID="message.senderID"
            :senderName="message.senderName"
            :timestamp="message.timestamp"
            v-for="message in messegesList"
            :key="message.id"
          />
          <h1
            v-if="currentChatId === ''"
            class="has-text-white-bis is-size-5 has-text-centered"
          >Nothing to display..</h1>
        </div>
        <div v-if="currentChatId !== ''" id="messageForm">
          <InputMessage/>
        </div>
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
import ReceiverProfile from "../components/ReceiverProfile";

const moment = require("moment");
const fb = require("../firebaseConfig.js");

export default {
  name: "chat",
  components: {
    Navbar,
    UserCard,
    MessageCard,
    InputMessage,
    ReceiverProfile
  },
  data() {
    return {
      isOpen: false,
      sidebarIcon: "fa-angle-double-left"
    };
  },
  methods: {
    openChat(id) {
      this.$store.commit("setReceiverUser", id);
      this.$store.dispatch("getReceiverUserProfile");
      this.$store.dispatch("makeUsersPairChat");
    }
  },
  computed: {
    ...mapState([
      "currentUser",
      "receiverUserProfile",
      "currentChatId",
      "usersList",
      "messegesList"
    ]),
    usersWithoutMe() {
      const me = this.currentUser;
      return this.usersList.filter(user => user.id !== me.uid);
    }
  },
  watch: {
    usersList(val) {
      const me = this.currentUser;
      const users = this.usersList.filter(user => user.id !== me.uid);
      this.$store.commit("setReceiverUser", users[0].id);
      this.$store.dispatch("getReceiverUserProfile");
      this.$store.dispatch("makeUsersPairChat");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/var.scss";

.columns {
  display: flex;
  flex-direction: row;
  @media screen and (max-width: $break-small) {
    flex-direction: column;
  }
}
#users {
  overflow-y: scroll;
  height: calc(100vh - 4rem);
  width: 15vw;
  background-color: $grey-accent;
  @media screen and (max-width: $break-small) {
    width: 100vw;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 50%;
    padding: 2rem 1rem;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 10rem;
    align-self: center;
    .userCard {
      height: 100px;
    }
  }
}
#messages {
  height: calc(100vh - 4rem);
  width: 85vw;
  border-right: 2px solid $grey-accent;
  position: relative;

  @media screen and (max-width: $break-small) {
    width: 100vw;
    height: calc(100vh - 4rem - 128px);
  }
  .userProfile {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid $grey-accent;
    padding: 1rem 0;
    @media screen and (max-width: $break-small) {
      position: sticky;
      top: 0;
      background: #fff;
    }
    img {
      width: 64px;
      height: 64px;
      margin-right: 1rem;
    }

    p {
      color: #232323;
      font-weight: bold;
      text-align: center;
    }
    .userInformationSlider {
      position: absolute;
      right: 3rem;
      color: $main-black;
      font-size: 1.5em;

      &:hover {
        color: $main-color;
      }
      .userInformation:not(.open) {
        right: -100rem;
        @media screen and (max-width: $break-small) {
          position: absolute;
          right: -100rem;
          opacity: 0;
        }
      }
      .userInformation {
        position: absolute;
        top: 4rem;
        right: -3rem;
        width: 30vw;
        max-width: 400px;
        height: calc(100vh - 14rem);
        background: $main-color;
        transition: all 0.7s ease-in;
        @media screen and (max-width: $break-small) {
          position: fixed;
          opacity: 1;
          width: 100vw;
          top: 0rem;
          left: 0;
          right: 0;
          height: 100vh;
          transition: all 0.7s ease-in-out;
          z-index: 999;
          overflow-y: scroll;
        }
      }
    }
  }
  #messageList {
    overflow-y: scroll;
    height: calc(100vh - 14rem);
    padding: 2rem;
    width: 55vw;
    transition: width 0.7s ease-in;
    &:not(.open) {
      width: 100%;
    }
    @media screen and (max-width: $break-small) {
      width: 100vw;
      height: 100vh;
      padding: 0.5rem;
    }
    &::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }
  #messageForm {
    width: 100%;
    height: 4rem;
    border-top: 2px solid $grey-accent;
    padding: 0 1rem;
  }
}
</style>
