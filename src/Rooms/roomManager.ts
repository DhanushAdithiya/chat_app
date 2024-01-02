import { io } from "https://cdn.socket.io/4.7.2/socket.io.esm.min.js";

const url = window.location.href;
const roomId = url.substring(url.lastIndexOf("/") + 1);

const server = io();

server.emit('join', roomId); // Join the room based on the room ID from the URL

const sendMessage = document.querySelector(".send-message");
const messageInput = <HTMLInputElement>document.querySelector(".message");
const messageSpace = document.querySelector(".message-area");

sendMessage.addEventListener("click", () => {
  const message = messageInput.value;
  server.emit('chatMessage', { message, room: roomId }); // Sending the message with the room ID
  messageInput.value = "";
});

server.on("message", (message: string) => {
  const messageElement = document.createElement("h2");
  messageElement.innerText = message;
  messageSpace.appendChild(messageElement);
});
