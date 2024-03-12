// lib/username.js
let username = '';

const setUsername = (newUsername) => {
  username = newUsername;
};

const getUsername = () => username;

module.exports = { setUsername, getUsername };
