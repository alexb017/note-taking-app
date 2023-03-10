import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvgzOCwbHN9FtcepICptHyJknKggeCRZI",
    authDomain: "note-taking-app-8432a.firebaseapp.com",
    databaseURL: "https://note-taking-app-8432a-default-rtdb.firebaseio.com",
    projectId: "note-taking-app-8432a",
    storageBucket: "note-taking-app-8432a.appspot.com",
    messagingSenderId: "572699717734",
    appId: "1:572699717734:web:de42c83ca57b649992fda7",
    measurementId: "G-QXC1GWYLZL"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default db;