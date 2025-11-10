
import React from "react";
import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { toast } from "sonner";

 interface Message {
    content:string,
    createdAt:Date,
   _id:string
}
type props = {
  messages: Message;
  messageId: string;
  onDeleteMessage: (messageId: string) => void;
};

const MessageCards = ({ messages, messageId,onDeleteMessage }: props) => {
  const handleDeleteMessage = async () => {
    try {
      const response = await axios.delete(`/api/message-delete/${messageId}`);
      toast.error(response.data.message);
      onDeleteMessage(messageId);

    } catch (error: any) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.log("there was an error in deleting message", error.message);
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      }
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{messages.content}</CardTitle>
        </CardHeader>
        <CardAction>
          <Button onClick={handleDeleteMessage} variant="destructive">
            <X size={40} />
          </Button>
        </CardAction>
      </Card>
    </div>
  );
};

export default MessageCards;
