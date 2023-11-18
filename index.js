import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

import {
  onSnapshot,
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBK1OGcRx33iaVdVlFBQXqVpycshkrrHSk",
  authDomain: "amigo-the-chat-app.firebaseapp.com",
  projectId: "amigo-the-chat-app",
  storageBucket: "amigo-the-chat-app.appspot.com",
  messagingSenderId: "858254578858",
  appId: "1:858254578858:web:6948c9dd837bbde61cecd3",
  measurementId: "G-QNHR5LW4ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication

const db = getFirestore(app);

document.getElementById("send-button").onclick = async function (e) {
  e.preventDefault();
  if (document.getElementById("message-input").value === "") {
    alert("Type anything");
    return;
  }
  const docRef = await addDoc(collection(db, "messages"), {
    message: document.getElementById("message-input").value,
    time: new Date(),
    // name: localStorage.getItem("name"),
  });
  document.getElementById("message-input").value = "";
  messageGet();
};
const messageGet = async function () {
  // const user = localStorage.getItem("name");

  // if (!user) {
  //   window.location.href = "./"; // Redirect to the home page if no user is authenticated
  //   return;
  // }

  // const currentHour = new Date().getHours();

  // let greeting = "";

  // if (currentHour >= 5 && currentHour < 12) {
  //   greeting = "Good morning,";
  // } else if (currentHour >= 12 && currentHour < 18) {
  //   greeting = "Good afternoon,";
  // } else {
  //   greeting = "Good evening,";
  // }

  // document.getElementById("greeting").textContent = `${greeting}`;
  // document.getElementById("userNameSpan").textContent =
    // localStorage.getItem("name");

  let currentDate = null; // Track the current date
  const messagesElement = document.getElementById("messages");
  let messagesHTML = "";

  // Subscribe to real-time updates
  onSnapshot(
    query(collection(db, "messages"), orderBy("time")),
    (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        // console.log(data);
        const messageDate = new Date(data.time.toMillis());

        // Check if the date has changed, and add a date separator
        if (
          !currentDate ||
          currentDate.toDateString() !== messageDate.toDateString()
        ) {
          currentDate = messageDate;
          const messageDateString = messageDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });
          // messagesHTML += `<p class="date">${messageDateString}</p>`;
        }

        const hours = messageDate.getHours();
        const minutes = String(messageDate.getMinutes()).padStart(2, "0");
        const amPm = hours >= 12 ? "PM" : "AM";

        const formattedHours = hours % 12 || 12; // Convert to 12-hour format

        const time = `${formattedHours}:${minutes} ${amPm}`;
        const message = data.message;
        // const name = data.name;
        const messageDiv = `<div id="chat-messages">
          
        <div class="message received">
        <p>${message}</p>
    </div>
          
        </div>`;
        messagesHTML += messageDiv;
      });

      messagesElement.innerHTML = messagesHTML;
    }
  );
};

window.onload = messageGet;
