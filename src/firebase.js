// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyX4vi3wOzdfLc-rES750HZXK-hEOBUVM",
  authDomain: "reelpractice.firebaseapp.com",
  projectId: "reelpractice",
  storageBucket: "reelpractice.appspot.com",
  messagingSenderId: "322126121414",
  appId: "1:322126121414:web:7787b518a3be644d6c0ac7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const firestore = firebase.firestore();
export const database = ({
    users: firestore.collection("users"),
    posts: firestore.collection("posts"),
    comments: firestore.collection("comments"),
    getTimeStamp: firebase.firestore.FieldValue.serverTimestamp
})
export const storage = firebase.storage();
