import { FC, useEffect, useRef } from "react";
import { Loader2Icon, SendHorizonalIcon } from "lucide-react";

import { Button } from "./ui/button";
import { ChatRequestOptions } from "ai";
import Textarea from "react-textarea-autosize";

interface PromptFormProps {
  isLoading: boolean;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
}

const PromptForm: FC<PromptFormProps> = ({ isLoading, input, handleInputChange, handleSubmit }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.selectionStart = inputRef.current.selectionEnd = input.length;
    }
  }, []);
  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
          event.preventDefault();
          handleSubmit(event);
        }
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background pr-8 sm:rounded-md sm:border sm:pr-12">
        <Textarea
          ref={inputRef}
          tabIndex={0}
          rows={1}
          value={input}
          onChange={handleInputChange}
          placeholder="Type here to send a message..."
          spellCheck={false}
          className="min-h-[40px] w-full resize-none bg-transparent px-4 py-4 focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-[6px] sm:right-4">
          <Button type="submit" size="icon" disabled={isLoading || input === ""}>
            {isLoading ? <Loader2Icon className="h-4 w-4 animate-spin" /> : <SendHorizonalIcon className="w-4 h-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PromptForm;
