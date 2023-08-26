import io from 'socket.io-client';

const userSockets = {};

export function initializeSocket(userId) {
  userSockets[userId] = io(`http://localhost:5000?userId=${userId}`);
}

export function getSocket(userId) {
  return userSockets[userId];
}