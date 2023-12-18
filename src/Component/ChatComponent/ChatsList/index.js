import * as React from "react";

const ChatsList = ({ messages, isSending }) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ul className="message-list" ref={ref}>
      {messages.map((message, index) => (
        <li key={index} className={`message chat-list-${message.sender}`}>
          <div>{message.sender.toUpperCase()}</div>
          <div>{message.text}</div>
        </li>
      ))}
      {isSending && <li>Waiting for the responses....</li>}
    </ul>
  );
};

export default ChatsList;
