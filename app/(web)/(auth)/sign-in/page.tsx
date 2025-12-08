"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import { Container, Input } from "@/components";

type Errors = {
  email: null | string;
  password: null | string;
  global: null | string;
};

type Status = "ideal" | "loading" | "success";

function SignIn() {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [status, setStatus] = useState<Status>("ideal");
  const [fields, setFields] = useState({
    email: "",
    password: "",
    code: "",
  });
  const [errors, setErrors] = useState<Errors>({
    email: null,
    password: null,
    global: null,
  });

  if (!isLoaded) return null;
  const handleSignIn = async function (event: React.FormEvent) {
    event.preventDefault();
  };
  const getButtonLabel = function () {
    if (status === "loading") {
      return "Proccessing...";
    }

    if (status === "success") {
      return "Sign In Successful";
    }

    return "Sign In";
  };

  return (
    <div className="pt-6 space-y-4">
      <div>
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          Welcome Back
        </h1>
        <h2 className="text-center text-text-muted text-lg font-light">
          Enter your credentials to access your account
        </h2>
      </div>
      <form
        onSubmit={handleSignIn}
        className="mx-auto w-full max-w-md space-y-4"
      >
        {errors.global && (
          <div role="alert" className="alert alert-error">
            <AlertCircleIcon />
            <span>{errors.global}</span>
          </div>
        )}

        <div className="pt-4 space-y-2">
          <Input
            type="email"
            placeholder="Enter email"
            id="email"
            label="Email Address"
            value={fields.email}
            onChange={(email) => setFields((pre) => ({ ...pre, email }))}
            error={errors.email}
            className=""
          />
          <Input
            type="text"
            placeholder="Enter password"
            id="password"
            label="Password"
            value={fields.password}
            onChange={(password) => setFields((pre) => ({ ...pre, password }))}
            error={errors.password}
            className=""
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`btn border-none text-white font-bold transition-all duration-300 ease-in-out w-full
                ${
                  status === "success"
                    ? "bg-check-gradient cursor-default scale-100"
                    : ""
                }
                ${
                  status == "ideal"
                    ? "bg-bright-blue hover:bg-bright-blue/90 hover:shadow-lg"
                    : ""
                }
                
                `}
        >
          {status === "loading" && <span className="loading"></span>}
          {getButtonLabel()}
        </button>
      </form>
      <div>
        <p className="text-center text-text-muted">
          don't have an account?{" "}
          <Link href={"/sign-up"} className="text-bright-blue hover:opacity-90">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
