"use client";
import { messageSchema } from "@/schema/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";

const Page = () => {
  const [sendingMessage, setSendingMessage] = React.useState(false);
  const { username } = useParams();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
      createdAt: new Date(),
    },
  });

const onSubmit = async (data: z.infer<typeof messageSchema>) => {
  console.log("Form submission triggered");
  console.log("Form Data:", data);
  console.log(username);
  
  setSendingMessage(true);
  try {
    const response = await axios.post("/api/send-messages", {
      username,
      content: data.content,
    });
    toast.success(response.data.message);
    form.reset(); // reset input
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    toast.error(
      axiosError.response?.data.message || "Cannot send message to the user"
    );
  } finally {
    setSendingMessage(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-black via-neutral-900 to-black px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Send Feedback
        </h1>
        <p className="text-gray-600 text-center mb-8 text-sm">
          Write an anonymous message to{" "}
          <span className="font-semibold text-black">@{username}</span>
        </p>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 font-medium">
                    Your Feedback
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write something kind or helpful..."
                      className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                      {...field}
                    />
                  </FormControl>
                     <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={sendingMessage}
              className={`w-full py-2 font-semibold rounded-lg text-white ${
                sendingMessage
                  ? "bg-gray-700 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              } transition-all`}
            >
              {sendingMessage ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <p className="text-xs text-center text-gray-400 mt-6">
          Your feedback will be sent anonymously ✨
        </p>
      </div>
    </div>
  );
};

export default Page;
