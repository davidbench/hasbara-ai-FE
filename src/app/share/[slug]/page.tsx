"use client";

import React, { useEffect, useState } from "react";

import Chat from "@/components/chat";
import ChatList from "@/components/chat-list";
import { Message } from "ai/react";

export default function SharedChatPage({ params }: { params: { slug: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setMessages([
      { content: "hello user, what can i help you with today?", role: "assistant" } as Message,
      { content: "What happend in the hospital bombing in Gaza?", role: "user" } as Message,
      { content: "Israel didn't do it.", role: "assistant" } as Message,
    ]);
  }, []);

  return (
    <div className="container  px-2 mx-auto w-full max-w-7xl py-24 flex flex-col stretch flex-grow overflow-y-auto no-scrollbar">
      <p>Chat id: {params.slug}</p>
      <div className="pb-[200px] pt-4 md:pt-10">{messages.length > 0 && <ChatList messages={messages} isLoading={false} />}</div>
    </div>
  );
}
