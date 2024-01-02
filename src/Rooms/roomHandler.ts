const createRoom = document.querySelector(".create-room");
const roomTitle = document.querySelector(".room-title");

const getId = function (): number {
  // TODO - Change this to return a longer integer/string in order to avoid collisions.
  const id = Math.floor(Math.random() * 10000);
  return id;
};

createRoom?.addEventListener("click", function () {
  const roomId: number = getId();
  window.location.href = `/room/${roomId}`;
});
