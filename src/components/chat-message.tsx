import { BotIcon, UserIcon } from "lucide-react";

import { FC } from "react";
import { MemoizedReactMarkdown } from "./markdown";
import { Message } from "ai/react";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: FC<ChatMessageProps> = ({ message, ...props }) => {
  return (
    <div className={cn("group relative mb-4 flex items-start md:-ml-12")} {...props}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow",
          message.role === "user" ? "bg-background" : "bg-primary text-primary-foreground"
        )}
      >
        {message.role === "user" ? <UserIcon className="w-4 h-4" /> : <BotIcon className="w-4 h-4" />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
