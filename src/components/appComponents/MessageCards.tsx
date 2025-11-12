import React from "react";
import { X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";

interface Message {
  content: string;
  createdAt: Date;
  _id: string;
}

type Props = {
  messages: Message;
  messageId: string;
  onDeleteMessage: (messageId: string) => void;
};

const MessageCard = ({ messages, messageId, onDeleteMessage }: Props) => {
  const handleDeleteMessage = async () => {
    try {
       await axios.delete(`/api/message-delete/${messageId}`);
      onDeleteMessage(messageId);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Error deleting message:", axiosError.message);
      toast.error(
        axiosError.response?.data?.message || "Failed to delete message"
      );
    }
  };

  return (
    <div className="flex items-start justify-between bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4">
      {/* Left Section - Message content */}
      <div className="flex flex-col">
        <p className="text-gray-900 text-base font-medium leading-snug">
          {messages.content}
        </p>
        <span className="text-xs text-gray-500 mt-1">
          {new Date(messages.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Right Section - Delete button */}
      <button
        onClick={handleDeleteMessage}
        className="ml-4 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-full p-2 transition-all duration-150"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default MessageCard;
