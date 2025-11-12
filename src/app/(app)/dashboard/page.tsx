"use client";
import MessageCards from "@/components/appComponents/MessageCards";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { acceptingMessageSchema } from "@/schema/acceptingMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Message {
  content: string;
  createdAt: Date;
  _id: string;
}

const Page = () => {
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSwitchingLoading, setIsSwitchingLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const { register, setValue, watch } = useForm({
    resolver: zodResolver(acceptingMessageSchema),
    defaultValues: {
      isAcceptingMessage: false,
    },
  });
  const acceptingMessage = watch("isAcceptingMessage");

  const { data: session } = useSession();

  const checkIsAcceptingMessage = useCallback(async () => {
    setIsSwitchingLoading(true);
    try {
      const result = await axios.get("/api/accpepting-message");
      setValue("isAcceptingMessage", result.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "something went wrong while checking isAcceptingMessage"
      );
    } finally {
      setIsSwitchingLoading(false);
    }
  }, [ setValue]);

  const fetchMessage = useCallback(
    async (refresh: boolean = false) => {
      setIsLoadingMessages(true);
      setIsSwitchingLoading(false);
      try {
        const result = await axios.get("/api/get-messages");
        setMessages(result.data.messages || []);
        if (refresh) {
          toast.success("messages refreshed");
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(
          axiosError.response?.data.message ||
            "something went wrong while fetching messages"
        );
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [ setMessages, setIsLoadingMessages]
  );

  useEffect(() => {
    checkIsAcceptingMessage();
    fetchMessage();
  }, [checkIsAcceptingMessage, fetchMessage]);

  const handleSwtchButtonForAcceptingMessage = async (
    acceptingMessage: boolean
  ) => {
    setIsSwitchingLoading(true);
    console.log(acceptingMessage);
    
    try {
      const result = await axios.post("/api/accpepting-message", {
        acceptingMessage: acceptingMessage,
      });
      if (result.data.message) {
        toast.success(result.data.message);
      }
      setValue("isAcceptingMessage", result.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "something went wrong while updating isAcceptingMessage"
      );
    }finally{
      setIsSwitchingLoading(false);
    }
  };
  if (!session || !session.user) {
    return <div></div>;
  }

  const { username } = session.user as User;
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("link copied to clipboard");
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
    toast.success("message deleted");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-10 px-6 md:px-10 lg:px-20">
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">
        User Dashboard
      </h1>

      {/* Copy Link Section */}
      <div className="mb-8 bg-white shadow-sm rounded-lg p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Copy Your Unique Link
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="w-full sm:flex-1 p-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={copyToClipboard}
            className=" text-white font-semibold px-4 py-2 rounded-md"
          >
            Copy
          </Button>
        </div>
      </div>

      {/* Accept Messages Switch */}
      <div className="mb-8 bg-white shadow-sm rounded-lg p-6 border border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center">
          <Switch
          {...register("isAcceptingMessage")}
            checked={acceptingMessage}
            onCheckedChange={handleSwtchButtonForAcceptingMessage}
            disabled={isSwitchingLoading}
          />
          <span className="ml-3 text-gray-800 text-sm sm:text-base">
            Accept Messages:{" "}
            <span
              className={`font-medium ${
                acceptingMessage ? "text-green-600" : "text-red-500"
              }`}
            >
              {acceptingMessage ? "On" : "Off"}
            </span>
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Toggle to allow or stop receiving new messages.
        </p>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end mb-6">
        <Button
          className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            fetchMessage(true);
          }}
        >
          {isLoadingMessages ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4" />
          )}
          <span className="text-sm font-medium">Refresh</span>
        </Button>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCards
              key={message._id.toString()}
              messages={message}
              messageId={message._id.toString()}
              onDeleteMessage={handleDeleteMessage}
            />
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-36 bg-white border border-gray-100 rounded-lg text-gray-500">
            <p>No messages to display.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
