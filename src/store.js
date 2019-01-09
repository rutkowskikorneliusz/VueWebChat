import Vue from 'vue';
import Vuex from 'vuex';

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
    // Users actions
    registerUser({ commit }, payload) {
      const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/vuechat-cf968.appspot.com/o/avatars%2FKxswgzbmF5c9WpUHbx61gy2JnI23?alt=media&token=2d77a398-2f53-471e-a065-832cfc91c36e';
      return fb.auth.createUserWithEmailAndPassword(payload.email, payload.password).then((newUser) => {
        commit('setCurrentUser', newUser.user);
        return fb.usersCollection.doc(newUser.user.uid).set({
          id: newUser.user.uid,
          name: payload.name,
          avatar: defaultAvatar,
          workplace: '',
          city: '',
          birthday: '',
          phone: '',
        }).then(() => {
          store.dispatch('fetchUserProfile');
        });
      });
    },
    loginUser({ commit }, payload) {
      return fb.auth.signInWithEmailAndPassword(payload.email, payload.password).then((user) => {
        commit('setCurrentUser', user.user);
        store.dispatch('fetchUserProfile');
        store.dispatch('fetchUsersList');
      });
    },
    logoutUser() {
      return store.dispatch('setUserActiveStatus').then(() => fb.auth.signOut());
    },
    setUserActiveStatus({ state }) {
      return fb.usersCollection.doc(state.userProfile.id).update({
        active: state.userProfile.active,
      });
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid).get().then((res) => {
          commit('setUserProfile', res.data());
          commit('changeUserActiveStatus', true);
          store.dispatch('setUserActiveStatus');
        })
        .catch((err) => {
          this.$toasted.show(err, { position: 'top-center', duration: 5000, action: { text: 'OK' } });
        });
    },
    updateUserProfile({ state }, payload) {
      const avatarURL = '';
      if (typeof state.userProfile.avatar === 'string') {
        return fb.usersCollection.doc(state.userProfile.id).update({
          name: payload.name,
          workplace: payload.workplace,
          city: payload.city,
          birthday: payload.birthday,
          phone: payload.phone,
        });
      }
      return fb.avatarsStorage.child(state.userProfile.id).put(payload.avatar).then(snapshot => fb.avatarsStorage.child(state.userProfile.id).getDownloadURL().then(url => fb.usersCollection.doc(state.userProfile.id).update({
        name: payload.name,
        workplace: payload.workplace,
        city: payload.city,
        birthday: payload.birthday,
        phone: payload.phone,
        avatar: url,
      })));
    },
    getReceiverUserProfile({ state, commit }) {
      fb.usersCollection.doc(state.receiverUser).get().then((snapshot) => {
        commit('setReceiverUserProfile', snapshot.data());
      });
    },
    fetchUsersList({ commit }) {
      return fb.usersCollection.onSnapshot((snapshot) => {
        const usersArray = [];
        snapshot.forEach((users) => {
          const user = users.data();
          user.id = users.id;
          usersArray.push(user);
        });
        commit('setUsersList', usersArray);
      });
    },

    // Chat actions
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
      return fb.chatsCollection.doc(state.currentChatId).collection('messages').doc().set({
        message: payload,
        senderID: state.userProfile.id,
        senderName: state.userProfile.name,
        timestamp: Date.now(),
      });
    },
    deleteMessage({ state }, payload) {
      if (state.currentUser.uid === payload.senderID) {
        fb.chatsCollection.doc(state.currentChatId).collection('messages').doc(payload.messageID).delete();
      } else {
        this.$toasted.show("You can't delete someone's message", { position: 'top-center', duration: 5000, action: { text: 'OK' } });
      }
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    changeUserActiveStatus(state, val) {
      state.userProfile.active = val;
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
    },
  },
});
