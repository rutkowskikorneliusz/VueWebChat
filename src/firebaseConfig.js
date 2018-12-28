import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { toast } from "bulma-toast";


// firebase init goes here
const config = {
  apiKey: 'AIzaSyD-82OponPRUm64_eX2H2tBqkpbV-fyxXs',
  authDomain: 'vuechat-cf968.firebaseapp.com',
  databaseURL: 'https://vuechat-cf968.firebaseio.com',
  projectId: 'vuechat-cf968',
  storageBucket: 'vuechat-cf968.appspot.com',
  messagingSenderId: '697585730710',
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;
const storage = firebase.storage();

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection('users');
const chatsCollection = db.collection('chats');

//firebase storages

const avatarsStorage = storage.ref('avatars/');
const chatsStorage = storage.ref('chats/');

function makeToast(message, type) {
  let toastType = ''
  if(type === "error") {
    toastType = "is-danger"
  }else {
    toastType = "is-success"
  }
  toast({
    message: message,
    type: toastType,
    duration: 5000,
    position: "top-center",
    closeOnClick: true,
    dismissible: true,
    animate: { in: "fadeIn", out: "fadeOut" }
  });
}

export {
  db,
  auth,
  currentUser,
  usersCollection,
  chatsCollection,
  makeToast,
  storage,
  avatarsStorage,
  chatsStorage,

};
