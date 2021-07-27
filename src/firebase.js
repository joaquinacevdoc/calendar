//firebase is a Google database
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyD9iLmim6N7oXQp_MKjkMydmB_JLo8bDgI",
  authDomain: "calendar-44172.firebaseapp.com",
  projectId: "calendar-44172",
  storageBucket: "calendar-44172.appspot.com",
  messagingSenderId: "1077447792623",
  appId: "1:1077447792623:web:f347d6fd54568b8b40481a"
})

export { firebaseConfig as firebase};
