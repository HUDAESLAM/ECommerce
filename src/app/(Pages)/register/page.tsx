"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";


const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
  rePassword: z.string().min(6, "Confirm your password"),
  phone: z.string().min(10).regex(/^\d+$/, "Phone must be numbers only"),
}).refine((data) => data.password === data.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match",
});

type RegisterFormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(payload: RegisterFormData) {
    setLoading(true);
    setApiError("");
    setSuccess("");

    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      
      const result = await res.json();

      if(result.message == 'success'){
      router.push("/login");
    }

      if (!res.ok) {
        setApiError(result.error || "Failed to register");
      } else {
        setSuccess("✅ User registered successfully!");
      }
    } catch (err) {
      setApiError("Something went wrong");
      console.log(err);
      
    } finally {
      setLoading(false);
    }

    
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label className="my-2">Name</Label>
          <Input {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Label className="my-2">Email</Label>
          <Input {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <Label className="my-2">Password</Label>
          <Input type="password" {...register("password")} />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div>
          <Label className="my-2">Confirm Password</Label>
          <Input type="password" {...register("rePassword")} />
          {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword.message}</p>}
        </div>

        <div>
          <Label className="my-2">Phone</Label>
          <Input {...register("phone")} />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <Button type="submit" disabled={loading} className="w-full cursor-pointer">
          {loading ? <Loader className="animate-spin"/> : "Register"}
        </Button>
      </form>

      {apiError && <p className="text-red-500 mt-4">{apiError}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
