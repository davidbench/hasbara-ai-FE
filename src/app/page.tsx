import Chat from "@/components/chat";
import React from "react";

export default function ChatPage() {
  return (
    <div className="container  px-2 mx-auto w-full max-w-7xl py-24 flex flex-col stretch flex-grow overflow-y-auto no-scrollbar">
      <Chat />
    </div>
  );
}
