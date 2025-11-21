import io from "socket.io-client";

const url =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? window.location.origin : "http://localhost:8080");
let socket;

const connect = () => {
  socket = io(url);
};

const join = (roomName, username) => {
  if (!socket) {
    connect();
  }
  socket.emit("joinAuction", {
    username,
    roomName,
  });
};

const create = (roomName, username) => {
  if (!socket) {
    connect();
  }
  socket.emit("createAuction", {
    username,
    roomName,
  });
};

socket.on("joinAuction", () => {});
export { create, join };
