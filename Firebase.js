// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgeeYNp9F2rgnW6pjJgXDDa9yBRwUavKY",
    authDomain: "auth-3928a.firebaseapp.com",
    projectId: "auth-3928a",
    storageBucket: "auth-3928a.appspot.com",
    messagingSenderId: "1090611562290",
    appId: "1:1090611562290:web:b89ac6e68d1ba62ef2f92b"
  };

// let app;
// if(firebase.apps.length === 0){
//  app = firebase.initializeApp(firebaseConfig);
// }else{
//     app = firebase.app();
// }
// const auth = firebase.auth()
// export {auth};
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
console.log(FIREBASE_AUTH);