import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

const fb = require('./firebaseConfig.js');

Vue.use(Vuex);

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit('setCurrentUser', user);
    store.dispatch('fetchUserProfile');
    store.dispatch('fetchUsersList');
  }
});

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    usersList: [],
    receiverUser: null,
    receiverUserProfile: null,
    currentChatId: '',
    messegesList: [],
  },
  actions: {
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then((res) => {
          commit('setUserProfile', res.data());
          commit("changeUserActiveStatus",true);
          store.dispatch("setUserActiveStatus")
        })
        .catch((err) => {
          fb.makeToast(err, 'error')
        });
    },
    logoutUser({ commit }) {
      fb.auth
        .signOut()
        .then(() => {
          commit('setCurrentUser', null);
          commit('setUserProfile', {});
          fb.makeToast("Successfully logged out");
         
        })
        .catch(err => {
          // fb.makeToast(err, "error");
          console.log(err)
        });

    },
    fetchUsersList({ commit }) {
      fb.usersCollection.onSnapshot((snapshot) => {
        const usersArray = [];
        snapshot.forEach((users) => {
          const user = users.data();
          user.id = users.id;
          usersArray.push(user);
        });
        commit('setUsersList', usersArray);
      });
    },
    makeUsersPairChat({ state, commit }) {
      let chatID = '';
      if (state.currentUser.uid < state.receiverUser) {
        chatID = state.currentUser.uid + state.receiverUser;
      } else {
        chatID = state.receiverUser + state.currentUser.uid;
      }
      commit('setMessegesList', []);
      commit('setCurrentChatId', chatID);
      store.dispatch('fetchMessegesList');
    },
    fetchMessegesList({ state, commit }) {
      fb.chatsCollection.doc(state.currentChatId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((query) => {
        const messegesList = [];
        query.forEach((messages) => {
          const message = messages.data();
          message.id = messages.id;
          messegesList.push(message);
        });
        commit('setMessegesList', messegesList);
      });
    },
    sendMessage({ state }, payload) {
      fb.chatsCollection.doc(state.currentChatId).collection('messages').doc().set({
        message: payload,
        senderID: state.userProfile.id,
        senderName: state.userProfile.name,
        timestamp: Date.now(),
      })
        .then()
        .catch((err) => {
          fb.makeToast(err, 'error')
        });
    },
    deleteMessage({ state }, payload) {
      if (state.currentUser.uid === payload.senderID) {
        fb.chatsCollection.doc(state.currentChatId).collection('messages').doc(payload.messageID).delete()
      } else {
        fb.makeToast("You can't delete someone's message", 'error')
      }
    },
    updateUserProfile({ state }, payload) {
      let avatarURL = ""
      if (typeof state.userProfile.avatar === "string") {
        fb.usersCollection.doc(state.userProfile.id).update({
          name: payload.name,
          workplace: payload.workplace,
          city: payload.city,
          birthday: Date.parse(payload.birthday),
          phone: payload.phone,
        }).then(() => {
          fb.makeToast("Succesfully update profile")
          this.$router.push('/chat')
        }).catch(err => {
          fb.makeToast(err, 'error')
        })
      } else {
        fb.avatarsStorage.child(state.userProfile.id).put(payload.avatar).then((snapshot) => {
          fb.avatarsStorage.child(state.userProfile.id).getDownloadURL().then(url => {
            fb.usersCollection.doc(state.userProfile.id).update({
              name: payload.name,
              workplace: payload.workplace,
              city: payload.city,
              birthday: Date.parse(payload.birthday),
              phone: payload.phone,
              avatar: url,
              avatarPreview: url,
            }).then(() => {
              fb.makeToast("Succesfully update profile")
              this.$router.push('/chat')
            }).catch(err => {
              fb.makeToast(err, 'error')
            })
          })
        })
      }

    },
    getReceiverUserProfile({ state, commit }) {
      fb.usersCollection.doc(state.receiverUser).get().then(snapshot => {
        commit("setReceiverUserProfile", snapshot.data())
      })

    },
    getChatsUploadedFile({ state, commit }) {

    },
    setUserActiveStatus({ state }) {
      fb.usersCollection.doc(state.userProfile.id).update({
        active: state.userProfile.active
      }).then(() => {
        console.log("zmieniłem status na: " + state.userProfile.active)
        if(!state.userProfile.active) store.dispatch("logoutUser")
      }).catch(err => {
        console.log(err)
      })
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    changeUserActiveStatus(state,val) {
        state.userProfile.active = val
    },
    setUsersList(state, val) {
      state.usersList = val;
    },
    setCurrentChatId(state, val) {
      state.currentChatId = val;
    },
    setMessegesList(state, val) {
      state.messegesList = val;
    },
    setReceiverUser(state, val) {
      state.receiverUser = val;
    },
    setReceiverUserProfile(state, val) {
      state.receiverUserProfile = val;
    }
  },
});
