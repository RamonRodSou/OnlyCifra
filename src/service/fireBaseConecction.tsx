import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

let firebaseConfig = {
  apiKey: "AIzaSyCfqJy9CeRG0u-4TKx6QGDFomYcyjmfQpA",
  authDomain: "cifra-3739d.firebaseapp.com",
  projectId: "cifra-3739d",
  storageBucket: "cifra-3739d.appspot.com",
  messagingSenderId: "588504489368",
  appId: "1:588504489368:web:88d4c5760335dc788bdfed",
  measurementId: "G-VW4NHMQB78"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const storage = firebase.storage()

export default firebase