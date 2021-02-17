import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCe1s8OXlCcaNMpDaBsQGlar0dLduuI0JQ",
    authDomain: "crwn-db-70688.firebaseapp.com",
    projectId: "crwn-db-70688",
    storageBucket: "crwn-db-70688.appspot.com",
    messagingSenderId: "310777381654",
    appId: "1:310777381654:web:ce5a6987441bc9de7e8637",
    measurementId: "G-FV5ESJ926B"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' }); 
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase;