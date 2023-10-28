"use client";

import * as z from "zod";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2Icon, X } from "lucide-react";
import { FC, SetStateAction, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

enum FeedbackType {
  Msg = "This specific message",
  Chat = "This specific chat session",
  General = "General feedback unrelated to the session",
}

enum AgreementLevel {
  Disagree = "Disagree",
  SomewhatDisagree = "Somewhat Disagree",
  Neutral = "Neutral",
  SomewhatAgree = "Somewhat Agree",
  Agree = "Agree",
}

// const formSchema = z.object({
//   feedbackCategory: z.nativeEnum(FeedbackType),
//   agreementLevel: z.nativeEnum(AgreementLevel),
//   body: z.string(),
// });

const formSchema = z.object({
  feedbackCategory: z.nativeEnum(FeedbackType),
  agreementLevel: z.nativeEnum(AgreementLevel),
  body: z.string(),
});
interface FeedbackFormProps {
  setIsFeedbackFormOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FeedbackForm: FC<FeedbackFormProps> = ({ setIsFeedbackFormOpen }) => {
  const [isSending, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedbackCategory: FeedbackType.Msg,

      body: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("submit...", values);

    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
      console.log("sucess");
      setTimeout(() => {
        console.log("reset");

        // setIsFeedbackFormOpen(false);
      }, 300);
    }, 500);
  }

  return (
    <Card className="relative">
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
