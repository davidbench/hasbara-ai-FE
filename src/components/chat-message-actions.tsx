"use client";

import { type Message } from "ai";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { FC, SetStateAction } from "react";
import { FlagIcon } from "lucide-react";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  setIsFeedbackFormOpen: React.Dispatch<SetStateAction<boolean>>;
  isFeedbackFormOpen: boolean;
  messageId: string;
}

const ChatMessageActions: FC<ChatMessageActionsProps> = ({ isFeedbackFormOpen, setIsFeedbackFormOpen, messageId, className, ...props }) => {
  return (
    <div className={cn("flex items-center justify-end  md:absolute md:-right-10 md:-top-2 ", className)} {...props}>
      <Button
        variant="ghost"
        size="icon"
        onClick={async () => {
          if (isFeedbackFormOpen) {
            setIsFeedbackFormOpen(false);
          } else {
            setIsFeedbackFormOpen(true);
            // scrolling to the related message
            await new Promise((resolve) => setTimeout(resolve, 50));
            const elementPosition = document.getElementById(messageId)?.getBoundingClientRect().top;
            if (elementPosition)
              window.scroll({
                top: elementPosition + window.scrollY - 10,
                behavior: "smooth",
              });
          }
        }}
      >
        <FlagIcon className="w-[18px] h-[18px] " />
        <span className="sr-only">Positive feedback</span>
      </Button>
    </div>
  );
};

export default ChatMessageActions;
