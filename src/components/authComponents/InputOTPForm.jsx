"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/toast"; 
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"; 

const FormSchema = z.object({
  pin: z.string().min(6, "Your one-time password must be 6 characters."),
});

export default function InputOTPForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data) => {
    // You would typically call a backend service to verify the OTP here
    console.log("OTP Submitted: ", data.pin);
    toast({
      title: "OTP Verification",
      description: "OTP has been submitted successfully.",
    });
  };

  const handleInputChange = (value, index) => {
    // This logic assumes your InputOTPSlot component can be integrated with react-hook-form
    // You may need to adjust it according to the actual implementation of InputOTPSlot
    setValue(`pin[${index}]`, value, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-12 w-2/3 space-y-6">
      <div className="flex flex-col items-center justify-center">
        <label htmlFor="otp" className="text-slate-50 mb-4">Enter OTP</label>
        <InputOTPGroup>
          {[...Array(6)].map((_, index) => (
            <InputOTPSlot
              key={index}
              {...register(`pin.${index}`)}
              onChange={(e) => handleInputChange(e.target.value, index)}
              maxLength={1}
              className="text-slate-50 bg-slate-900 placeholder:text-slate-400 text-center"
            />
          ))}
        </InputOTPGroup>
        {errors.pin && <p className="text-red-500">{errors.pin.message}</p>}
      </div>
      <button
        className="bg-slate-50 flex justify-center items-center gap-1 dark:bg-zinc-800 w-full text-slate-900 rounded-md h-10 font-medium mt-6"
        type="submit"
      >
        Verify OTP
      </button>
    </form>
  );
}
