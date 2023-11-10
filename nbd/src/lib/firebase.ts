import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENTID 
};

// Initialize Firebase
let firebaseApp;

if (!getApps().length) {
firebaseApp = initializeApp(firebaseConfig);
}

// Auth
const firebaseAuth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();


export { firebaseApp, firebaseAuth, provider};