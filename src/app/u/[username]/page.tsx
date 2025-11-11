"use client";
import { messageSchema } from "@/schema/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";

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
    setSendingMessage(true);
    try {
      const response = await axios.post("/api/send-messages", {
        username,
        content: data.content,
      });
      toast.success(response.data.message);
      form.reset();
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Navbar */}
      <nav className="w-full h-16 bg-white shadow-md border-b border-gray-200 flex items-center justify-between px-6 md:px-12">
        <Link href="/" className="font-bold text-2xl text-black">
          True Feedback
        </Link>
      </nav>

      {/* ✅ Feedback Form Section */}
      <div className="flex-grow flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white border border-gray-200 shadow-lg rounded-2xl p-8 transition-all hover:shadow-xl">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Send Feedback
          </h1>
          <p className="text-gray-600 text-center mb-8 text-sm">
            Write an anonymous message to{" "}
            <span className="font-semibold text-black">@{username}</span>
          </p>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Your Feedback
              </label>
              <textarea
                id="content"
                rows={4}
                placeholder="Write something kind or helpful..."
                {...form.register("content")}
                className="w-full border border-gray-300 rounded-lg py-3 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all resize-none"
              />
              {form.formState.errors.content && (
                <p className="text-red-500 text-xs mt-1">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={sendingMessage}
              className={`w-full py-3 font-semibold rounded-lg text-white ${
                sendingMessage
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800"
              } transition-all duration-200`}
            >
              {sendingMessage ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-xs text-center text-gray-400 mt-8">
            Your feedback will be sent anonymously ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
