// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANGHrD-GaF9V2v_VSnjN0P-_tXsxoM_FY",
  authDomain: "live-tv-61734.firebaseapp.com",
  projectId: "live-tv-61734",
  storageBucket: "live-tv-61734.appspot.com",
  messagingSenderId: "116564471504",
  appId: "1:116564471504:web:04db627e70e513ce1778d5",
  measurementId: "G-7SWXVE0HB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app