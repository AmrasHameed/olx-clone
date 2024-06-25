import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA21YkgA0_x8pQR7Jmx1Dk-B5hCwJlSIqc",
    authDomain: "olx-clone-bc169.firebaseapp.com",
    projectId: "olx-clone-bc169",
    storageBucket: "olx-clone-bc169.appspot.com",
    messagingSenderId: "762168320089",
    appId: "1:762168320089:web:fb858c4d3c109bd3915148",
    measurementId: "G-PFBS4JR6GZ"
};

const app = firebase.initializeApp(firebaseConfig)

export default app