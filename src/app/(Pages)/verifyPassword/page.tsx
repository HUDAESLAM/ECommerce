"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const verifyCodeSchema = z.object({
  resetCode: z
    .string()
    .length(6, "Reset code must be 6 digits")
    .regex(/^\d+$/, "Reset code must be numeric"),
});

type VerifyCodeFormData = z.infer<typeof verifyCodeSchema>;

export default function VerifyResetCodePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeFormData>({
    resolver: zodResolver(verifyCodeSchema),
  });

  const onSubmit = async (data: VerifyCodeFormData) => {
    setLoading(true);
    setMessage("Verifying code...");
    setError(null);

    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode: data.resetCode }
      );

      setMessage("Code verified successfully!");
      
      setTimeout(() => {
        router.push("/reset-password");
      }, 1000);
    } catch (err: any) {
      setError(err.response?.data?.message || "❌ Invalid or expired reset code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Verify Reset Code
        </h2>

        {message && (
          <p className="mb-4 text-green-600 flex items-center justify-center gap-2">
            {loading && <Loader className="animate-spin" />} {message}
          </p>
        )}
        {error && <p className="mb-4 text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-200">
              Reset Code
            </label>
            <input
              type="text"
              {...register("resetCode")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.resetCode
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              } dark:bg-gray-700 dark:text-gray-100`}
              placeholder="Enter the 6-digit code"
            />
            {errors.resetCode && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.resetCode.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-white py-2 px-4 rounded-md disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader className="animate-spin" /> Verifying Code...
              </span>
            ) : (
              "Verify Code"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
