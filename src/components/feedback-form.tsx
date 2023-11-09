"use client";

import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2Icon, X } from "lucide-react";
import { FC, SetStateAction, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Message } from "ai/react";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useSession } from "@/contexts/SessionContext";
import { useToast } from "@/lib/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

enum FeedbackType {
  Msg = "This specific message",
  Session = "This specific chat session",
  General = "General feedback unrelated to the session",
}

const FeedbackTypeNum = [
  FeedbackType.Msg,     // 0
  FeedbackType.Session, // 1
  FeedbackType.General, // 2
];

enum AgreementLevel {
  Disagree = "Disagree",
  SomewhatDisagree = "Somewhat Disagree",
  Neutral = "Neutral",
  SomewhatAgree = "Somewhat Agree",
  Agree = "Agree",
}

const BACKEND_URI = process.env.BACKEND_URI;

const formSchema = z.object({
  feedbackCategory: z.nativeEnum(FeedbackType),
  agreementLevel: z.nativeEnum(AgreementLevel),
  body: z.string(),
  url: z.string().url().optional().or(z.string().length(0)),
});
interface FeedbackFormProps extends React.ComponentProps<"div"> {
  setIsFeedbackFormOpen: React.Dispatch<SetStateAction<boolean>>;
  message: Message;
}

const FeedbackForm: FC<FeedbackFormProps> = ({ message, setIsFeedbackFormOpen, className }) => {
  const [isSending, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [linkList, setLinkList] = useState<string[]>([]);
  const session = useSession();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedbackCategory: FeedbackType.Msg,
      body: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const links = linkList;
    // adding the last input
    if (values.url?.length) links.push(values.url);

    const data = {
      messageID: message.id,
      agreement: values.agreementLevel,
      scope: FeedbackTypeNum.indexOf(values.feedbackCategory),
      feedback: values.body,
      feedback_ref: links,
    };

    try {
      console.log("sending feedback", data);
      
      const response = await fetch(`https://api.hasbara.ai/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userSession: session,
          feedback: data,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setIsLoading(false);
      } else {
        throw new Error("failed to send feedback");
      }
    } catch (error) {
      setIsSuccess(false);
      toast({
        title: "Oops! Something Went Wrong While Sending Your Feedback",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <Card className={cn("relative", className)}>
      <Button variant="ghost" size="icon" onClick={setIsFeedbackFormOpen.bind(null, false)} className="absolute right-4 top-4">
        <X className="w-4 h-4" />
        <span className="sr-only">Negative feedback</span>
      </Button>

      <CardHeader>
        {isSuccess ? (
          <>
            <p> Feedback sent successfully!</p>
            <CardDescription>Your input is valuable for our improvement. Thank you! </CardDescription>
          </>
        ) : (
          <>
            <CardTitle>Send Feedback</CardTitle>
            <CardDescription>Your feedback matters! Share your thoughts to help us improve. </CardDescription>
          </>
        )}
      </CardHeader>
      {!isSuccess && (
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="feedbackCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>My feedback is regarding</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(FeedbackType).map((val) => (
                          <SelectItem key={val[1]} value={val[1]}>
                            {val[1]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agreementLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your agreement level</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="I generally..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(AgreementLevel).map((val) => (
                          <SelectItem key={val[1]} value={val[1]}>
                            {val[1]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write here..." {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Add links for reference</FormLabel>
                    <div className="flex flex-row space-x-2 w-full">
                      <FormControl className="w-full flex-grow">
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                          const url = form.getValues("url");
                          try {
                            if (url && url.length && !linkList.includes(url)) {
                              z.string().url().parse(url);
                              setLinkList((perv) => [url, ...perv]);
                            }
                            form.setValue("url", "");
                          } catch (error) {
                            // this will revalidate the form
                            form.handleSubmit(onSubmit)();
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row flex-wrap gap-1">
                {linkList.map((link, idx) => (
                  <div key={idx + link} className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                    <a href={link} target="_blank">
                      {link}
                    </a>
                    <X
                      className="w-4 h-4 ml-2 cursor-pointer"
                      onClick={() => {
                        setLinkList((perv) => perv.filter((pervLink) => pervLink !== link));
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Button type="submit">
                  {isSending && <Loader2Icon className="mr-2 w-4 h-4 animate-spin" />}
                  {isSuccess && !isSending && <CheckCircle className="mr-2 w-4 h-4 " />}
                  Submit Feedback
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
};

export default FeedbackForm;
