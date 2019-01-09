import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const config = {
  apiKey: 'AIzaSyD-82OponPRUm64_eX2H2tBqkpbV-fyxXs',
  authDomain: 'vuechat-cf968.firebaseapp.com',
  databaseURL: 'https://vuechat-cf968.firebaseio.com',
  projectId: 'vuechat-cf968',
  storageBucket: 'vuechat-cf968.appspot.com',
  messagingSenderId: '697585730710',
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const currentUser = auth.currentUser;
const storage = firebase.storage();

const settings = {
  timestampsInSnapshots: true,
};
db.settings(settings);

// firebase collections
const usersCollection = db.collection('users');
const chatsCollection = db.collection('chats');

// firebase storages

const avatarsStorage = storage.ref('avatars/');
const chatsStorage = storage.ref('chats/');

export {
  db,
  auth,
  currentUser,
  usersCollection,
  chatsCollection,
  storage,
  avatarsStorage,
  chatsStorage,
};
