"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { PenBoxIcon, PenIcon } from "lucide-react";
import { Form, Input } from "@/components";
import { useTimer } from "@/hooks";

type Errors = {
  emailAddress?: string;
  password?: string;
  code?: string;
};

function SignUpPage() {
  const { isLoaded, setActive, signUp } = useSignUp();
  const router = useRouter();
  const { timeLeft, startTimer, isTimerActive } = useTimer(30);
  const [verifing, setVerifing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [formError, setFormError] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center">
        <span className="loading"></span>
      </div>
    );

  function handleSignUp() {}
  function handleVerification() {}
  function handleErrors() {}
  function handleResendCode() {
    startTimer();
  }
  function handleChangeEmail() {
    setFormError("");
    setErrors({});
    setUpdateEmail(true);
    setVerifing(false);
  }

  if (verifing) {
    return (
      <div className="max-w-sm w-full mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className=" text-center text-xl md:text-2xl font-bold">
            Verify Your Email
          </h1>
          <h2 className="font-medium text-text-muted flex items-center justify-center gap-2">
            Enter the verification code sent to your email {emailAddress}{" "}
            <button
              onClick={handleChangeEmail}
              title="Change email address"
              className=" size-4 text-bright-blue hover:text-bright-blue/80 active:text-bright-blue cursor-pointer"
            >
              <PenBoxIcon className="size-full" />
            </button>
          </h2>
        </div>
        {/* Verification Form */}
        <Form
          onSubmit={handleVerification}
          isLoading={isLoading}
          error={formError}
          initialLable="Verify Account"
          loadingLable="Verifing..."
        >
          <Input
            id="verification-code"
            label="Verification Code"
            placeholder="Enter your verification code..."
            error={errors.code}
            value={code}
            validationMessage="Verification code required."
            onChange={setCode}
          />
        </Form>
        <button
          onClick={handleResendCode}
          disabled={isTimerActive}
          className="btn btn-link no-underline text-center w-full"
        >
          Didn't receive a code? Resend{" "}
          {isTimerActive && (
            <span className="font-mono font-bold">{timeLeft}s</span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          Create Your Account
        </h1>
        <h2 className="font-medium text-text-muted text-center">
          Complete to get start your live demo of Next.js Todo Saas Template
          demo.
        </h2>
      </div>
      {/* Sign In Form */}
      <Form
        onSubmit={handleSignUp}
        isLoading={isLoading}
        error={formError}
        initialLable="Sign Up"
        loadingLable="Processing..."
      >
        <Input
          id="email-address"
          label="Email Address"
          placeholder="Enter your email address..."
          error={errors.emailAddress}
          value={emailAddress}
          validationMessage="Email address is required."
          onChange={setEmailAddress}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password..."
          error={errors.password}
          value={password}
          validationMessage="Password is required."
          onChange={setPassword}
        />
      </Form>
      <p className="text-text-muted text-sm text-center">
        Have an account?{" "}
        <Link
          href={"/sign-in"}
          className="text-bright-blue hover:text-bright-blue/80 active:text-bright-blue"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}

export default SignUpPage;
