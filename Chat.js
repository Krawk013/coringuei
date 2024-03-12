// components/Chat.js
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { setUsername, getUsername } from '../lib/username';

const socket = io('http://localhost:3001');

const Chat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setUsername('Anonymous');

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage) {
      socket.emit('chat message', { username: getUsername(), text: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            <strong>{msg.username}:</strong> {msg.text}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
