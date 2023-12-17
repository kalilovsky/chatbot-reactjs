import * as React from "react";

const ChatsList = ({ messages, isSending }) => {
  if (!messages) {
    return null;
  }

  return (
    <ul className="message-list">
      {messages.map((message, index) => (
        <li key={index} className={`message chat-list-${message.sender}`}>
          <div>{message.sender}</div>
          <div>{message.text}</div>
        </li>
      ))}
      {isSending && <li>Waiting for the responses....</li>}
    </ul>
  );
};

export default ChatsList;
