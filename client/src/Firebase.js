import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "what-s-in-my-fridge-577c3.firebaseapp.com",
    projectId: "what-s-in-my-fridge-577c3",
    storageBucket: "what-s-in-my-fridge-577c3.appspot.com",
    messagingSenderId: "1032733877583",
    appId: "1:1032733877583:web:d0e3ade581738e677c913a",
    measurementId: "G-LV3P037CXW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };