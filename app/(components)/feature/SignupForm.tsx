"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Errors } from "@/lib/parseClerkErrors";
import { InfoIcon, KeyIcon, MailIcon, UserIcon } from "lucide-react";
import { SignupFields } from "../type";

type Props = {
  onSignup: (SignupFields: SignupFields) => void;
  onVerify: (code: string) => void;
  loading: boolean;
  verifing: boolean;
  errors: Errors;
  className?: string;
};

const SignupForm: React.FC<Props> = ({
  onSignup,
  onVerify,
  loading,
  verifing,
  errors,
  className = "",
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSignup({ firstName, lastName, emailAddress, password });
  };
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    await onVerify(code);
  };

  return (
    <form
      className={clsx("flex flex-col gap-4", className)}
      onSubmit={!verifing ? handleSignup : handleVerify}
    >
      {errors.global && (
        <div className="alert alert-error">
          <InfoIcon className="size-6 shrink-0" />
          <span>{errors.global}</span>
        </div>
      )}
      {verifing ? (
        <>
          <div className="p-2 border border-border-main rounded flex items-center justify-center gap-2">
            <MailIcon className="size-5 shrink-0 text-inherit" />
            <span>{emailAddress}</span>
          </div>
          <Input
            onChange={setCode}
            value={code}
            type="number"
            label="Verification Code"
            placeholder="Enter verification code..."
            error={errors.code}
            required
          />
        </>
      ) : (
        <>
          <div className="flex gap-4">
            <Input
              icon={UserIcon}
              onChange={setFirstName}
              value={firstName}
              label="First Name"
              placeholder="Anoop"
              error={errors.firstName}
              required
            />
            <Input
              onChange={setLastName}
              value={lastName}
              label="Last Name"
              placeholder="Rajoriya"
              error={errors.lastName}
            />
          </div>
          <Input
            icon={MailIcon}
            onChange={setEmailAddress}
            value={emailAddress}
            type="email"
            label="Email"
            placeholder="anoop@gmail.com"
            error={errors.emailAddress}
            required
          />
          <Input
            icon={KeyIcon}
            onChange={setPassword}
            value={password}
            type="password"
            label="Password"
            placeholder="Create a strong password"
            error={errors.password}
            required
          />
        </>
      )}
      <div
        id="clerk-captcha"
        className="flex items-center justify-center"
      ></div>
      <Button
        className="text-lg"
        type="submit"
        variant="gradiant"
        size="lg"
        loadingText={verifing ? "Verifing..." : "Creating..."}
        isLoading={loading}
      >
        {verifing ? "Verify Email Address" : "Create Account"}
      </Button>
    </form>
  );
};

export default SignupForm;
