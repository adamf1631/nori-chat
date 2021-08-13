import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  YOUR FIREBASE CONFIG OBJECT
});

export const firestore = app.firestore();
export const auth = app.auth();
export default app;
