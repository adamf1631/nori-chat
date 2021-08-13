import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import sendImg from "./nori-chat-logo-mini.png";
import logo from "./nori-chat-logo.png";
import firebase from "firebase/app";
import { auth, firestore } from "./firebase";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <img className="logo" src={logo} alt="Nori Logo" />
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button onClick={signInWithGoogle}>
      <i className="fab fa-google"></i> Sign in
    </button>
  );
}
function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}
function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(25);
  const dummy = useRef();

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
  };

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          type="text"
          placeholder="Type here"
        />
        <button type="submit" disabled={!formValue}>
          <img className="sm-img" src={sendImg} alt="Nori Chat Logo" />
        </button>
      </form>
    </>
  );
}
function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img className="profile-img" src={photoURL} alt={uid} />
        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
