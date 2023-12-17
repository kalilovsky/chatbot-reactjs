import * as React from "react";

const SendMessageForm = ({ onSubmit, disabled }) => {
  const [message, setMessage] = React.useState();

  const handleChange = React.useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      if (!message) {
        return;
      }

      setMessage(null);

      onSubmit(message);
    },
    [message, onSubmit],
  );

  return (
    <form onSubmit={handleSubmit} className="send-message-form">
      >
      <input
        disabled={disabled}
        onChange={handleChange}
        value={message || ""}
        placeholder="Type your message and hit ENTER"
        type="text"
      />
    </form>
  );
};

export default SendMessageForm;
