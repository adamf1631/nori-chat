import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDf8dC58u0pa3IKN9m4z9KmvC27Tu6TdHg",
    authDomain: "nori-chat-c08df.firebaseapp.com",
    projectId: "nori-chat-c08df",
    storageBucket: "nori-chat-c08df.appspot.com",
    messagingSenderId: "683642402778",
    appId: "1:683642402778:web:42d2c8ba687f29ec8172e3"
});

export const firestore = app.firestore();
export const auth = app.auth();
export default app;