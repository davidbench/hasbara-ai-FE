import { ChatRequestOptions } from "ai";
import { FC } from "react";
import { FooterText } from "./footer";
import PromptForm from "./prompt-form";

interface ChatPanelProps {
  isLoading: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
}

const ChatPanel: FC<ChatPanelProps> = ({ isLoading, input, handleInputChange, handleSubmit }) => {
  return (
    <div className="fixed inset-x-0 bottom-0">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm isLoading={isLoading} input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
