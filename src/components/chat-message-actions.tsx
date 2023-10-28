"use client";

import { type Message } from "ai";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { FC, SetStateAction } from "react";
import { FlagIcon, MessageSquarePlusIcon } from "lucide-react";

interface ChatMessageActionsProps extends React.ComponentProps<"div"> {
  setIsFeedbackFormOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ChatMessageActions: FC<ChatMessageActionsProps> = ({ setIsFeedbackFormOpen, className, ...props }) => {
  return (
    <div className={cn("flex items-center justify-end  md:absolute md:-right-10 md:-top-2 ", className)} {...props}>
      <Button variant="ghost" size="icon" onClick={setIsFeedbackFormOpen.bind(null, true)}>
        <FlagIcon className="w-4 h-4 " />
        <span className="sr-only">Positive feedback</span>
      </Button>
    </div>
  );
};

export default ChatMessageActions;
