"use client";

import ChatList from "./chat-list";
import ChatPanel from "./chat-panel";
import EmptyScreen from "./empty-screen";
import { FC } from "react";
import React from "react";
import { useChat } from "ai/react";
import { useSession } from "@/contexts/SessionContext";

interface ChatProps {}

const Chat: FC<ChatProps> = ({}) => {
  const session = useSession();

  const { isLoading, messages, input, setInput, handleInputChange, handleSubmit, append } = useChat({
    api: "https://hasbara.ai/api/chat",
    initialInput: "what is going on in Israel right now?",
    sendExtraMessageFields: true,
    body: {
      userSession: session,
    },
  });

  return (
    <>
      <div className="pb-[200px] pt-4 md:pt-10">
        {messages.length ? (
          <>
            <ChatList messages={messages} />
          </>
        ) : (
          <EmptyScreen
            handleSubmit={async (value) => {
              setInput("");
              await append({
                content: value,
                role: "user",
              });
            }}
          />
        )}
      </div>

      <ChatPanel isLoading={isLoading} input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </>
  );
};

export default Chat;
