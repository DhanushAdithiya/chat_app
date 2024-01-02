const messageInput = <HTMLInputElement>document.querySelector(".message");
const sendMessage = document.querySelector(".send-message");
const messageSpace = document.querySelector(".message-area");

import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";
const server = io();

sendMessage.addEventListener("click", () => {
	const message = messageInput.value;
	server.emit('message', message);

	messageInput.value = "";
});

server.on("message", (message: string) => {
  const messageElement = document.createElement("h2");
  messageElement.innerText = message;
  messageSpace.appendChild(messageElement);
});
