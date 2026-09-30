const socket = io();

let username = "";

const nameScreen = document.getElementById("nameScreen");
const chatScreen = document.getElementById("chatScreen");
const nameInput = document.getElementById("nameInput");
const enterBtn = document.getElementById("enterBtn");

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const emptyState = document.getElementById("emptyState");
const welcomeText = document.getElementById("welcomeText");

const colors = [
    "#8be9fd",
    "#ff79c6",
    "#bd93f9",
    "#50fa7b",
    "#ffb86c",
    "#f1fa8c",
    "#ff7b72",
    "#79c0ff"
];

function colorForName(name) {
    let total = 0;

    for (let i = 0; i < name.length; i++) {
        total += name.charCodeAt(i);
    }

    return colors[total % colors.length];
}

function enterClub() {
    const name = nameInput.value.trim();

    if (name === "") {
        nameInput.focus();
        return;
    }

    username = name;

    socket.emit("join", username);

    nameScreen.classList.add("hidden");
    chatScreen.classList.remove("hidden");

    welcomeText.textContent = `You're in as ${username}`;
    messageInput.focus();
}

enterBtn.addEventListener("click", enterClub);

nameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        enterClub();
    }
});

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();

    if (message === "" || username === "") {
        return;
    }

    socket.emit("message", {
        name: username,
        text: message
    });

    messageInput.value = "";
    messageInput.focus();
});

socket.on("message", (data) => {
    if (emptyState) {
        emptyState.remove();
    }

    const message = document.createElement("div");
    message.className = "message";

    const name = document.createElement("div");
    name.className = "message-name";
    name.textContent = data.name;
    name.style.color = colorForName(data.name);

    const text = document.createElement("div");
    text.className = "message-text";
    text.textContent = data.text;

    message.appendChild(name);
    message.appendChild(text);

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
});
