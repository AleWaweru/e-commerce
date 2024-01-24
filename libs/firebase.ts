// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7U5omtC7oRCo1c9AALdJ30XWkmMJZP_s",
  authDomain: "e-commerce-pic.firebaseapp.com",
  projectId: "e-commerce-pic",
  storageBucket: "e-commerce-pic.appspot.com",
  messagingSenderId: "266750719917",
  appId: "1:266750719917:web:fce9e52c9503d7b5975324"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;