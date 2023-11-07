"use client";

import { FC, useEffect } from "react";
import { Message, useChat } from "ai/react";

import ChatList from "./chat-list";
import ChatPanel from "./chat-panel";
import EmptyScreen from "./empty-screen";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/contexts/SessionContext";
import { useToast } from "@/lib/hooks/use-toast";

interface ChatProps {}

const Chat: FC<ChatProps> = ({}) => {
  const session = useSession();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const { isLoading, messages, input, setInput, handleInputChange, handleSubmit, append } = useChat({
    api: "https://hasbara.ai/api/chat",
    sendExtraMessageFields: true,
    body: {
      userSession: session,
    },
    onError: (error) => {
      toast({
        title: "Oops! Something Went Wrong",
        description:
          "Apologies, we're encountering an issue with the API at the moment. Our team is working to resolve this as quickly as possible. Please try again later.",
      });
    },
    // initialMessages: searchParams.get("s")
    //   ? ([
    //       {
    //         content: searchParams.get("s"),
    //         role: "user",
    //       },
    //     ] as Message[])
    //   : undefined,
  });

  useEffect(() => {
    const fetchRes = async () => {
      try {
        const res = await append({
          content: search,
          role: "user",
        } as Message);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };

    const search = searchParams.get("s");
    if (search) setTimeout(fetchRes, 50);
  }, []);

  return (
    <>
      <div className="pb-[200px] pt-4 md:pt-10">
        {/* <p>Search: {search}</p> */}
        {messages.length ? (
          <>
            <ChatList messages={messages} isLoading={isLoading} />
          </>
        ) : (
          !searchParams.get("s") && (
            <EmptyScreen
              handleSubmit={async (value) => {
                setInput("");
                await append({
                  content: value,
                  role: "user",
                });
              }}
            />
          )
        )}
      </div>

      <ChatPanel isLoading={isLoading} input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
    </>
  );
};

export default Chat;
