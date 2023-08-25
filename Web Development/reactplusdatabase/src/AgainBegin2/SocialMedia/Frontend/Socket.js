const userSockets = {};

export function initializeSocket(userId) {
    userSockets[userId] = new WebSocket(`wss://localhost:5000/ws?userId=${userId}`);
}

export function getSocket(userId) {
  return userSockets[userId];
}