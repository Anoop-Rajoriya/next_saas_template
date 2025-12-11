"use client";
import { Form, Input } from "@/components";
import { parsedClerkErrors } from "@/lib/utils.client";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Errors = {
  emailAddress?: string;
  password?: string;
};

function SingInPage() {
  const { isLoaded, setActive, signIn } = useSignIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center">
        <span className="loading"></span>
      </div>
    );

  async function handleLogin() {
    if (!isLoaded) return;
    setFormError("");
    setErrors({});
    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        setActive({ session: signInAttempt.createdSessionId });
        router.push("/user");
      } else {
        // console.error("Sign in attempt failed, status: ", signInAttempt.status);
        throw new Error("Failed to sign in. Retry after some time.");
      }
    } catch (error: any) {
      // console.error(JSON.stringify(error, null, 2));
      if (isClerkAPIResponseError(error)) {
        const { fieldErrors, formError } = parsedClerkErrors(error);
        setErrors(fieldErrors);
        setFormError(formError || "");
      } else {
        setFormError(error.message || "Unexpacted sign in error.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-sm w-full mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-center text-xl md:text-2xl font-bold">
          Welcome Back
        </h1>
        <h2 className="text-center font-medium text-text-muted">
          Sign in to revisite your Next.js Todo Saas Template demo.
        </h2>
      </div>
      {/* Sign Up Form */}
      <Form
        onSubmit={handleLogin}
        isLoading={isLoading}
        error={formError}
        initialLable="Sign In"
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
        Don't have an account?{" "}
        <Link
          href={"/sign-up"}
          className="text-bright-blue hover:text-bright-blue/80 active:text-bright-blue"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SingInPage;
