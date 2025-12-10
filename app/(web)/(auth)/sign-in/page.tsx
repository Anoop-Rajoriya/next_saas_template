"use client";
import { Form, Input } from "@/components";
import { useSignIn } from "@clerk/nextjs";
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

  function handleLogin() {}

  return (
    <div className="max-w-sm w-full mx-auto space-y-6">
      <h1 className="fieldset-legend flex justify-center text-2xl md:text-3xl">
        WelCome Back
      </h1>
      {/* Sign Up Form */}
      <Form
        onSubmit={handleLogin}
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
