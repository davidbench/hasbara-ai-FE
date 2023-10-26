import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { FC } from "react";

interface EmptyScreenProps {
  handleSubmit: (value: string) => Promise<void>;
}

const exampleMessages = [
  "What is going on in Israel right now?",

  "Why is Israel attacking the palestinians?",

  "What is the Hamas militant group?",
  "What happened on October 7th?",
  "When is this war going to end?",
];

const EmptyScreen: FC<EmptyScreenProps> = ({ handleSubmit }) => {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">Welcome to Hasbara AI Chatbot!</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          Hasbara.ai is an interactive project designed to educate, inform, and inspire dialogue around the devastating impacts of the 2023
          Gaza war.
        </p>
        <p className="leading-normal text-muted-foreground">You can start a conversation here or try the following examples:</p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button key={index} variant="link" className="h-auto p-0 text-base" onClick={() => handleSubmit(message)}>
              <ArrowRight className="mr-2 w-4 h-4 text-muted-foreground" />
              {message}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmptyScreen;
