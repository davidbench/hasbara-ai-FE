'use client';
 
import { useChat, Message } from 'ai/react';
import React from 'react';
import { useSession, SessionContextType } from '@/contexts/SessionContext';

export default function Chat() {
  const session = useSession();
  
  const { isLoading, messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'https://hasbara.ai/api/chat',
    initialInput: "what is going on in Israel right now?",
    sendExtraMessageFields: true,
    body: {
      userSession: session,
    },
  });
  
  
  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch flex-grow overflow-y-auto no-scrollbar">
      <div>{messages.length < 2 ? "Say something..." : null}</div>
      {messages.map(m => (
        <div key={m.id} style={{textAlign: m.role === 'user' ? 'left' : 'left'}} 
        {...{className: m.role === 'user' ? 
            'clr1 border border-sky-500 rounded mb-8 shadow-xl p-2 bg-gray-50' : 
            'clr2 border border-green-500 rounded mb-8 shadow-xl p-2 bg-green-50'}}>
          {m.content}
        </div>
      ))}
 
      <form onSubmit={handleSubmit} className="max-w-md w-max flex flex-col">
        <label className="fixed w-full max-w-md">
          <div className="mx-auto w-full max-w-md flex flex-row fixed bottom-0 gap-2">
            <input className=" flex-grow border border-gray-300 rounded mb-8 shadow-xl p-2 w-full" value={input} onChange={handleInputChange} />
            <button disabled={input.length < 1} type="submit" className="clr3 border border-gray-300 rounded mb-8 shadow-xl p-2">Send</button>
          </div>
          <div className="mx-auto w-full max-w-md fixed bottom-1 stretch grid grid-rows-1 grid-flow-col gap-1">
            <span className="text-gray-500 text-xs">Hasbara.ai is powered by customized Mistral</span>
            <span className="text-gray-400 text-xs text-right"><a href="https://benchte.ch" target="_blank">benchTech</a></span>
          </div>
        </label>


      </form>

    </div>
  );
}

