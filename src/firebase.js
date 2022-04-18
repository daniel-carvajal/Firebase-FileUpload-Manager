// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const {
//   initializeAppCheck,
//   ReCaptchaV3Provider,
// } = require("firebase/app-check");

// Your web app's Firebase configuration

const firebaseConfig = {
  // apiKey: "AIzaSyC7tyjJXbWmtDVw_HqJ1bEhrBXRrn7Vysc",

  // authDomain: "fruti-portal.firebaseapp.com",

  // projectId: "fruti-portal",

  // storageBucket: "fruti-portal.appspot.com",

  // messagingSenderId: "757580862986",

  // appId: "1:757580862986:web:32ffba3a88c924293db1f3",
  apiKey: "AIzaSyCbJY7_4ufLKnTod_rZKAXCBpwPgqA82xU",
  authDomain: "sj-ipa-1b3e1.firebaseapp.com",
  projectId: "sj-ipa-1b3e1",
  storageBucket: "sj-ipa-1b3e1.appspot.com",
  messagingSenderId: "901712927561",
  appId: "1:901712927561:web:a028fb76283d7931f29898"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore();

const storage = getStorage(app);

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider("6Lc-p8scAAAAAEcaWvs-VRZVXacV_VZ4zwdcDRdX"),

//   // Optional argument. If true, the SDK automatically refreshes App Check
//   // tokens as needed.
//   isTokenAutoRefreshEnabled: true,
// });

export { app, db, storage };
