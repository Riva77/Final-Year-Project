
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#4C2B21", // Light Brown header background color
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#4C2B21", // Light Brown bot bubble color
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const steps = [
  {
    id: "Greet",
    message: "Hello, Welcome to our bookstore",
    trigger: "Ask Name",
  },
  {
    id: "Ask Name",
    message: "Please enter your name",
    trigger: "Waiting1",
  },
  {
    id: "Waiting1",
    user: true,
    trigger: "Name",
  },
  {
    id: "Name",
    message: "Hi {previousValue}, How can I assist you?",
    trigger: "Waiting2",
  },
  {
    id: "Waiting2",
    message: "You can choose the following available options.",
    trigger: "assist",
  },
  {
    id: "assist",
    options: [
      {
        value: "Delivery",
        label: "Do you guys provide delivery?",
        trigger: "Delivery",
      },
      {
        value: "Store",
        label: "Is your store physically available?",
        trigger: "Store",
      },
    ],
  },
  {
    id: "Delivery",
    message: "Yes. We do provide that service.",
    trigger: "Closing",
  },
  {
    id: "Store",
    message:
      "Apologies, but currently, our services are limited to physical presence only.",
    trigger: "Closing",
  },
  {
    id: "Closing",
    options: [
      {
        value: "Thank you",
        label: "Thank you",
        end: true,
      },
      {
        value: "More",
        label: "I would like to ask more questions",
        trigger: "Waiting2",
      },
    ],
  },
];

const Chat = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div>
      <div
        id="chat-container"
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: chatOpen ? "translateX(0)" : "translateX(100%)",
        }}
        className="z-20 text-black flex flex-col shrink-0 grow-0 justify-around fixed bottom-0 right-32 rounded-lg mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
      >
        {chatOpen && <ChatBot steps={steps} />}
      </div>

      <div className="relative">
        <button
          onClick={toggleChat}
          className="z-20 text-white flex flex-col shrink-0 grow-0 justify-around fixed bottom-0 right-5 rounded-lg mr-1 mb-5 lg:mr-5 lg:mb-5 xl:mr-10 xl:mb-10"
        >
          <div className="p-3 rounded-full bg-[#4C2B21]">
            <svg
              className="w-6 h-6 lg:w-8 lg:h-8 xl:w-10 xl:h-10"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

const ChatWithThemeProvider = () => (
  <ThemeProvider theme={theme}>
    <Chat />
  </ThemeProvider>
);

export default ChatWithThemeProvider;
