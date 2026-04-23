// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-teqSeE-DrF0qYEjiGIV0EzRyWMXVVkA",
  authDomain: "travel-ai-caf34.firebaseapp.com",
  projectId: "travel-ai-caf34",
  storageBucket: "travel-ai-caf34.firebasestorage.app",
  messagingSenderId: "483992349785",
  appId: "1:483992349785:web:b84b9add757c383cbd1548",
  measurementId: "G-63J7WNWG6V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export default app;