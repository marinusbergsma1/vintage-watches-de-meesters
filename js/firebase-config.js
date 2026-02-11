/* ============================================
   Firebase Configuration — Vintage Watches De Meesters
   Shared config for both main site and admin panel
   ============================================ */

const firebaseConfig = {
  apiKey: "AIzaSyDJxZoTI3Jce8ijjw7isg6sy02kgUcb-GU",
  authDomain: "gen-lang-client-0077068220.firebaseapp.com",
  projectId: "gen-lang-client-0077068220",
  storageBucket: "gen-lang-client-0077068220.firebasestorage.app",
  messagingSenderId: "106013827350",
  appId: "1:106013827350:web:be7c4640e735af16dfb037",
  measurementId: "G-F31KW332BS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const WATCHES_COLLECTION = 'watches';
