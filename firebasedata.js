// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
/*video 2 :  0:28
 https://www.youtube.com/watch?v=xgIoPUwqmPI&list=PL0QnM-2GYvTbeknMuZbTafC1_37ZRLWOX&index=5*/
const firebaseConfig = {
  apiKey: "AIzaSyBpuDRdXqppWiLO55nFrON1xDkyiAnqesg",
  authDomain: "ranger-939f1.firebaseapp.com",
  projectId: "ranger-939f1",
  storageBucket: "ranger-939f1.appspot.com",
  messagingSenderId: "791215407521",
  appId: "1:791215407521:web:393b2c2202643d169e8be0",
  measurementId: "G-80GRQWB1XH",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// Opcional: inicializar analytics si estás utilizando Firebase Analytics
//const analytics = getAnalytics(appx);

export { db, auth };
