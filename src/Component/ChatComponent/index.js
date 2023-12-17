import * as React from "react";
import Title from "./Title";
import ChatsList from "./ChatsList";
import SendMessageForm from "./SendMessageForm";
import fetchData from "../../Infra/fetch";

const ChatComponent = () => {
  const [messages, setMessages] = React.useState([]);
  const [isSending, setIsSending] = React.useState(false);

  const sendMessage = React.useCallback(
    async (message) => {
      setIsSending(true);
      setMessages((messages) => [
        ...messages,
        { sender: "human", text: message },
      ]);

      try {
        const response = await fetchData("http://0.0.0.0:8000", {
          prompt: message,
          history: messages.reduce((acc, message) => {
            if (message.sender === "error") {
              return acc;
            }
            return [...acc, message.text];
          }),
        });

        setMessages((messages) => [
          ...messages,
          { sender: "ai", text: response },
        ]);
      } catch (error) {
        setMessages((messages) => [
          ...messages,
          {
            sender: "error",
            text: "Une erreur est survenue veuillez réessayer.",
          },
        ]);
      }

      setIsSending(false);
    },
    [messages],
  );

  if (!messages) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Title />
      <ChatsList messages={messages} isSending={isSending} />
      <SendMessageForm onSubmit={sendMessage} disabled={isSending} />
    </div>
  );
};

export default ChatComponent;
