"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {  useForm } from "react-hook-form";
import { signUpSchema } from "@/schema/signUpSchema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
const page = () => {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      setIsSubmittingForm(true);
      console.log(data);
      const response = await axios.post("/api/sign-up", data);
      toast.success(response.data.message);
      router.replace(`/verify/${data.username}`);
    } catch (error) {
      console.log("there is an error in sign up", error);
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      }
    } finally {
      setIsSubmittingForm(false);
    }
  };

  return (
    <div className="bg-white text-black h-screen flex justify-center items-center">
      <div className="border border-gray-700 p-10 rounded-xl text-xl shadow-2xl">
        <h1 className="mb-10 text-2xl font-bold ">Welcome to True Feedback</h1>
 <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {isSubmittingForm ? (
                <Loader2 className="animate-spin" />
              ) : (
                "sign up"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6 flex items-center gap-1">
        <p className="text-[16px]">Already have an account? </p>
        <Link className="text-[16px] hover:underline  text-blue-600" href="/sign-in">sign in</Link>
       
      </div>
      </div>
      
       
    </div>
  );
};

export default page;
