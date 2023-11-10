import { auth, set, ref, get, child, database, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "../firebase.js";

import { loginTemplate, registerTemplate } from "./templates.js";

import { initGame } from "../game/Game.js";

auth.onAuthStateChanged((user) => {
    if (!user) {
        changeTemplate(0);
    } else {
        document.getElementById("auth").remove();

        initGame(user.uid);
    }
});

async function loginHandler(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);

        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `users/${user.uid}`));

        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    } catch (err) {
        console.error(err.message);
    }
}

async function registerHandler(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeat-password").value;

    if (password === repeatPassword) {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            const dbRef = ref(database);

            await set(ref(database, "users/" + user.uid), {
                email: email,
                last_login: Date.now(),
            });
        } catch (err) {
            console.error(err.message);
        }
    }
}

const authElement = document.getElementById("auth");

var currentTemplate;

function linkHandler() {
    changeTemplate(currentTemplate === 0 ? 1 : 0);
}

export function changeTemplate(id) {
    if (currentTemplate !== undefined) {
        clearEvents();
    }

    currentTemplate = id;

    applyTemplate(id === 0 ? loginTemplate : registerTemplate);

    applyEvents();
}

function applyTemplate(template) {
    authElement.innerHTML = template;
}

function clearEvents() {
    const authButton = document.getElementById("auth-button");
    const authLink = document.getElementById("auth-link");

    if (currentTemplate === 0) {
        authButton.removeEventListener("click", loginHandler);
    } else {
        authButton.removeEventListener("click", registerHandler);
    }

    authLink.removeEventListener("click", linkHandler);
}

function applyEvents() {
    const authButton = document.getElementById("auth-button");
    const authLink = document.getElementById("auth-link");

    if (currentTemplate === 0) {
        authButton.addEventListener("click", loginHandler);
    } else {
        authButton.addEventListener("click", registerHandler);
    }

    authLink.addEventListener("click", linkHandler);
}
