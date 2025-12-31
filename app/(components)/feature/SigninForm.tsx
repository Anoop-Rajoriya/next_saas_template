"use client";
import React, { useState } from "react";
import clsx from "clsx";
import Input from "../ui/Input";
import { Button, Link } from "../ui/Button";
import { Errors } from "@/lib/parseClerkErrors";
import { InfoIcon, KeyIcon, MailIcon } from "lucide-react";
import { SigninFields } from "../type";

type Props = {
  onSignin: (SignupFields: SigninFields) => void;
  loading: boolean;
  errors: Errors;
  className?: string;
};

const SigninForm: React.FC<Props> = ({
  onSignin,
  loading,
  errors,
  className = "",
}) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    onSignin({ emailAddress, password });
  };
  return (
    <form
      className={clsx("flex flex-col gap-4", className)}
      onSubmit={handleSignin}
    >
      {errors.global && (
        <div className="alert alert-error">
          <InfoIcon className="size-6 shrink-0" />
          <span>{errors.global}</span>
        </div>
      )}
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
      <div className="flex flex-col">
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
        <Link href="/forgot-password" className="ml-auto">
          Forgot password?
        </Link>
      </div>
      <Button
        className="text-lg"
        type="submit"
        variant="gradient"
        size="lg"
        loading={loading}
      >
        Sign in
      </Button>
    </form>
  );
};

export default SigninForm;
