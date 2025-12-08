"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import { Container, Input } from "@/components";

type Errors = {
  name: null | string;
  email: null | string;
  password: null | string;
  code: null | string;
  global: null | string;
};

type Status = "ideal" | "loading" | "success";

function Signup() {
  const { isLoaded, setActive, signUp } = useSignUp();
  const searchParams = useSearchParams();
  const [verifying, setVerifying] = useState(false);
  const [status, setStatus] = useState<Status>("ideal");
  const [fields, setFields] = useState({
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
    password: "",
    code: "",
  });
  const [errors, setErrors] = useState<Errors>({
    name: null,
    email: null,
    password: null,
    code: null,
    global: null,
  });

  if (!isLoaded) return null;
  const handleSignUp = async function (event: React.FormEvent) {
    event.preventDefault();
  };
  const handleVerification = async function (event: React.FormEvent) {
    event.preventDefault();
  };
  const handleResendCode = async function () {};
  const parseClerkErrors = function () {};
  const getButtonLabel = function () {
    if (status === "loading") {
      return verifying ? "Verifying..." : "Proccessing...";
    }

    if (status === "success") {
      return verifying ? "Verification Successful" : "Sign Up Successful";
    }

    return verifying ? "Verify" : "Sign Up";
  };

  if (verifying) {
    return (
      <div className="pt-6 flex flex-col gap-4">
        <div>
          <h1 className="text-center text-2xl md:text-3xl font-bold">
            Verify Your Account
          </h1>
          <h2 className="text-center text-text-muted text-lg font-light">{`Verification code had sent to email ${fields.email}`}</h2>
        </div>
        <form
          onSubmit={handleVerification}
          className="mx-auto w-full max-w-md space-y-4"
        >
          {errors.global && (
            <div role="alert" className="alert alert-error">
              <AlertCircleIcon />
              <span>{errors.global}</span>
            </div>
          )}

          <div className="pt-4">
            <Input
              type="text"
              placeholder="Enter verification code"
              id="code"
              label="Verification Code"
              value={fields.code}
              onChange={(code) => setFields((pre) => ({ ...pre, code }))}
              error={errors.code}
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
            Change email address{" "}
            <button
              onClick={() => setVerifying(false)}
              className="text-bright-blue hover:opacity-90 active:opacity-100"
            >
              Go back
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 flex flex-col gap-4">
      <div>
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          Create Your Account
        </h1>
        <h2 className="text-center text-text-muted text-lg font-light">
          Start your live demonstrate of next.js todo saas template
        </h2>
      </div>
      <form
        onSubmit={handleSignUp}
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
            type="text"
            placeholder="Enter full name"
            id="fullName"
            label="Full Name"
            value={fields.name}
            onChange={(name) => setFields((pre) => ({ ...pre, name }))}
            error={errors.name}
            className=""
          />
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
          Already have an account?{" "}
          <Link
            href={"/sign-in"}
            className="text-bright-blue hover:opacity-90 active:opacity-100"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
