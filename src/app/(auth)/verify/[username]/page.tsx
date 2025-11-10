"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApiResponse } from "@/types/ApiResponse";

const page = () => {
  const [submitOtpLoading, setSubmitOtpLoading] = useState(false);
  const { username } = useParams();
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const submitOtp = async () => {
    try {
      setSubmitOtpLoading(true);
      const response = await axios.post("/api/verify-code", {
        username,
        code: value,
      });
      toast.success(response.data.message);
      router.replace(`/sign-in`);
    } catch (error) {
      console.log("there is an error in Submiting otp", error);
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      }
    } finally {
      setSubmitOtpLoading(false);
    }
  };
  const resendOtp = async () => {
    try {
      setSubmitOtpLoading(true);
       await axios.post("/api/verify-code", {
        username,
        code: value,
      });
      toast.success("Otp is Resend Successfully");
    } catch (error) {
      console.log("there is an error in Resending otp", error);
      const axiosError = error as AxiosError<ApiResponse>;
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message);
      }
    } finally {
      setSubmitOtpLoading(false);
    }
  };
  const inputClassName =
    "text-3xl h-15 w-15  shadow-xl bg-white text-center rounded-md";
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="   bg-gray-100 rounded-2xl shadow-2xl px-6 py-12 flex flex-col gap-5 ">
        <h1 className="font-medium text-xl text-center">
          Please verify Your Email
        </h1>
        <div className="flex flex-col justify-center items-center gap-5">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            className=""
          >
            <InputOTPGroup className="text-3xl">
              <InputOTPSlot
                className={`${inputClassName}`}
                style={{}}
                index={0}
              />
              <InputOTPSlot className={`${inputClassName}`} index={1} />
              <InputOTPSlot className={`${inputClassName}`} index={2} />
              <InputOTPSeparator />
              <InputOTPSlot className={`${inputClassName}`} index={3} />
              <InputOTPSlot className={`${inputClassName}`} index={4} />
              <InputOTPSlot className={`${inputClassName}`} index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm">
            {value === "" ? (
              <>Enter your one-time password.</>
            ) : (
              <>You entered: {value}</>
            )}
            <div>
              <Button
                className="text-white hover:text-gray-200 mt-5"
                onClick={submitOtp}
                disabled={submitOtpLoading}
              >
                {submitOtpLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </div>
          <div>
            if you did not receive a code, please{" "}
            <button onClick={resendOtp} className="text-blue-500 font-medium hover:underline  cursor-pointer">
              Resend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
