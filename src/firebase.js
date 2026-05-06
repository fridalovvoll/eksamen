import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDhFv9uNM7juSeQfiVAmXM6rBXyXSB2RYk",
  authDomain: "eksamen-120dd.firebaseapp.com",
  projectId: "eksamen-120dd",
  storageBucket: "eksamen-120dd.firebasestorage.app",
  messagingSenderId: "1059288211760",
  appId: "1:1059288211760:web:d5d81acd1d5e5650b8e8f5",
  measurementId: "G-GMCKG9BN33"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { db };