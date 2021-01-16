import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: "react-imgs.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
});

export function getStorage() {
  return firebase.storage(app);
}

export function getFirestore() {
  return firebase.firestore(app);
}
