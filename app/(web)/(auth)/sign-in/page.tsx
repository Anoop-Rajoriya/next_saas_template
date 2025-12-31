"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import parseClerkErrors, { Errors } from "@/lib/parseClerkErrors";
import { useSignin } from "@/hooks";
import { Button, Link, SigninForm } from "@/app/(components)";
import { SigninFields } from "@/app/(components)/type";

const SigninPage = () => {
  const { signin, isLoaded } = useSignin();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleEmailSignin = async (signupFields: SigninFields) => {
    setErrors({});
    setLoading(true);
    try {
      await signin(signupFields);
      router.push("/dashboard");
    } catch (error: any) {
      setErrors(parseClerkErrors(error));
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded)
    return (
      <div className="skeleton bg-surface w-full max-w-md h-[500px] mx-auto"></div>
    );

  return (
    <div className="bg-surface w-full max-w-md mx-auto p-4 pt-6 px-8 rounded-md flex flex-col">
      <div className="mb-6 space-y-1">
        <h1 className="text-center text-2xl font-bold text-txt-main">
          Welcom Back
        </h1>
        <p className="text-center text-txt-muted font-semibold">
          Sign in to continue to your todos
        </p>
      </div>
      <SigninForm
        onSignin={handleEmailSignin}
        loading={loading}
        errors={errors}
      />
      <div className="divider">OR</div>
      <p className="text-center mt-4 font-semibold text-txt-muted">
        Have an account? <Link href={"/sign-up"}>Sign up</Link>
      </p>
    </div>
  );
};

export default SigninPage;
