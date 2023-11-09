"use client";

import { FC, useEffect } from "react";
import { CreateMessage, Message, useChat } from "ai/react";

import ChatList from "./chat-list";
import ChatPanel from "./chat-panel";
import EmptyScreen from "./empty-screen";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/contexts/SessionContext";
import { useToast } from "@/lib/hooks/use-toast";

const FE_ENV = process.env.FE_ENV || process.env.NEXT_PUBLIC_FE_ENV ||
  (function() {throw new Error("Missing env variable NEXT_PUBLIC_FE_ENV. Please setup `.env` file per `.env.example`")})()

const MIDDLEWARE_URI = process.env.MIDDLEWARE_URI ?? (FE_ENV == "LOCAL" ? "https://hasbara.ai" : "");

interface ChatProps {}

const Chat: FC<ChatProps> = ({}) => {
  const session = useSession();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const api_uri = `${MIDDLEWARE_URI}/api/chat`;

  const { isLoading, messages, input, setInput, handleInputChange, handleSubmit, append } = useChat({
    api: api_uri,
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
    onFinish: (msg) => {
      /*toast({
        title: "OnFinish",
        description:
          `${msg.content}\n ||||| ${msg?.role ?? 'no role'} | \n${msg?.id ?? 'no id'} | \n${msg?.createdAt ?? 'no createdAt'}`,
      });*/
      const res_promise = fetch(api_uri, {
        method: 'POST',
        body: JSON.stringify({
          userSession: session,
          messages: messages,
          onFinishMsg: msg,
        })
      }).catch((e) => {
        console.log(e);
      });
    },
  });


  useEffect(() => {
    const fetchRes = async () => {
      try {
        const res = await append(
          {
            content: search,
            role: "user",
          } as CreateMessage);
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
