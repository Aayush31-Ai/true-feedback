"use client";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import { signInSchema } from "@/schema/signInSchema";
import { signIn } from "next-auth/react";


const page = () => {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmittingForm(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.identifier,
      password: data.password,
    });
    setIsSubmittingForm(false);
    if (result?.error) {
      toast.error(result.error);
    }
    if (result?.ok) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className=" text-black h-screen flex justify-center items-center">
      <div className="border border-gray-700 p-10 rounded-xl text-xl shadow-2xl">
        <h1 className="mb-10 text-2xl font-bold ">Welcome to True Feedback</h1>
       
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="identifier"
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
                "sign in"
              )}
            </Button>
          </form>
        </Form>
        <div className="mt-6 flex items-center gap-1">
          <p className="text-[16px]">Create an account? </p>
          <Link
            className="text-[16px] hover:underline  text-blue-600"
            href="/sign-up"
          >
            sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
