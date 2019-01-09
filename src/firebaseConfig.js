import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
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
