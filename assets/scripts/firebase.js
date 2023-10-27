import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, ref, child, set, get, update, remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
	apiKey: "AIzaSyAziP5aJTB6_f0vesMm6EriVe_zv74ovcY",
	authDomain: "tap-village.firebaseapp.com",
	databaseURL: "https://tap-village-default-rtdb.europe-west1.firebasedatabase.app/",
	projectId: "tap-village",
	storageBucket: "tap-village.appspot.com",
	messagingSenderId: "933067395879",
	appId: "1:933067395879:web:2d43434d2906b396b74f02",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

export { app as firebase, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, database, ref, child, set, get, update, remove };
