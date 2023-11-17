import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBK1OGcRx33iaVdVlFBQXqVpycshkrrHSk",
  authDomain: "amigo-the-chat-app.firebaseapp.com",
  projectId: "amigo-the-chat-app",
  storageBucket: "amigo-the-chat-app.appspot.com",
  messagingSenderId: "858254578858",
  appId: "1:858254578858:web:6948c9dd837bbde61cecd3",
  measurementId: "G-QNHR5LW4ET"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("startButton").onclick = async function () {
  // Get the user's name from the input field
  // const name = document.getElementById("nameInput").value;

  // if (name === "") {
  //   alert("Please enter a name");
  //   return;
  // }

  // Initialize the Google Sign-In provider
  const provider = new GoogleAuthProvider();

  try {
    // Sign in with Google
    const result = await signInWithPopup(auth, provider);

    // Check if the user is authenticated
    if (result.user) {
      // Store the user's name in localStorage
      localStorage.setItem("name", result.user.displayName);

      // Redirect to the chat page
      window.location.href = "./chat.html";
    } else {
      alert("Authentication failed. Please try again.");
    }
  } catch (error) {
    // Handle authentication errors here
    console.error(error);
  }
};
