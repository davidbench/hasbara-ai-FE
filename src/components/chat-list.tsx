import ChatMessage from "./chat-message";
import { FC } from "react";
import { Message } from "ai/react";
import { Separator } from "./ui/separator";

interface ChatListProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatList: FC<ChatListProps> = ({ messages, isLoading }) => {
  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} isLoading={isLoading} />
          {index < messages.length - 1 && <Separator className="my-4 md:my-8" />}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
