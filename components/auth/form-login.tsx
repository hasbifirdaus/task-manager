"use client";
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginSchema, LoginInput } from "@/lib/zod";

export default function FormLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("/api/users/login", data);

      if (response.status === 200) {
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message ||
          "Login failed. Check your email/password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login__card bg-[#4C3575] rounded-xl text-white p-8 md:p-14 shadow-2xl flex flex-col gap-6 py-12 min-h-\[600px\] justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-medium">Sign in</h1>
        <p className="text-purple-100">Free access to our dashboard</p>
      </div>

      {errorMessage && (
        <div className="bg-red-500 text-white p-3 rounded-lg text-sm text-center">
          {errorMessage}
        </div>
      )}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-3 rounded-lg bg-gray-100 text-gray-800"
            type="email"
            {...register("email")}
            placeholder="name@example.com"
          />
          <div aria-live="polite" aria-atomic="true">
            {errors.email && (
              <span className="text-sm text-red-400">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-md" htmlFor="password">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-800"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="********"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            <div aria-live="polite" aria-atomic="true">
              {errors.password && (
                <span className="text-sm text-red-400">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          className="w-full bg-[#921ace] text-white font-semibold py-3 rounded-lg hover:bg-purple-700 mt-4 cursor-pointer border-2 border-white"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "SIGN IN"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-300">
        Don&apos;t have an account yet?
        <Link href="/register">
          <span className="text-red-400 font-medium hover:underline ml-1 cursor-pointer">
            Sign up here
          </span>
        </Link>
      </p>
    </div>
  );
}
