"use client";
import { Button, SignupForm } from "@/app/(components)";
import { SignupFields } from "@/app/(components)/type";
import { useSignup } from "@/hooks";
import parseClerkErrors, { Errors } from "@/lib/parseClerkErrors";
import { ArrowLeftIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const { isLoaded, signup, verify, resend } = useSignup();
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifing, setVerifing] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const handleEmailSignup = async (signupFields: SignupFields) => {
    console.log(signupFields);
    setErrors({});
    setLoading(true);
    try {
      await signup(signupFields);
      setVerifing(true);
    } catch (error: any) {
      setErrors(parseClerkErrors(error));
    } finally {
      setLoading(false);
    }
  };
  const handleEmailVerification = async (code: string) => {
    setErrors({});
    setLoading(true);
    try {
      await verify(code);
      setVerified(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    } catch (error: any) {
      setErrors(parseClerkErrors(error));
    } finally {
      setLoading(false);
    }
  };
  const handleResendEmailCode = async () => {};

  if (!isLoaded)
    return (
      <div className="skeleton bg-surface w-full max-w-md h-[500px] mx-auto"></div>
    );

  if (verified) {
    return (
      <div className="bg-surface w-full max-w-md mx-auto p-4 py-8 rounded-md flex flex-col">
        <div>
          <h1 className="text-center font-bold text-2xl text-txt-main mb-1">
            Email Verified!
          </h1>
          <p className="text-center font-semibold text-txt-muted">
            Redirecting you to the app...
          </p>
        </div>
        <div className="size-22 rounded-full shrink-0 flex items-center justify-center bg-custom-gradient mx-auto mt-10 mb-4">
          <CheckCircleIcon className="size-12 shrink-0 text-white" />
        </div>
        <p className="text-txt-muted text-center">
          Your email has been verified successfully
        </p>
      </div>
    );
  }

  return (
    <div className="bg-surface w-full max-w-md mx-auto p-4 pt-6 px-8 rounded-md flex flex-col">
      <div className="mb-6 space-y-1">
        <h1 className="text-center text-2xl font-bold text-txt-main">
          {verifing ? "Verify Your Email" : "Create Account"}
        </h1>
        <p className="text-center text-txt-muted font-semibold">
          {verifing
            ? "We've sent a 6-digit code to your email"
            : "Sign up to start organizing your tasks"}
        </p>
      </div>
      <SignupForm
        onSignup={handleEmailSignup}
        onVerify={handleEmailVerification}
        loading={loading}
        verifing={verifing}
        errors={errors}
      />
      {verifing ? (
        <>
          <div className="flex flex-col items-center gap-1 mt-4">
            <p className="text-txt-muted">Didn't receive the code?</p>
            <Button variant="link">Resend Code</Button>
          </div>
          <div className="divider "></div>
          <Button variant="link">
            <ArrowLeftIcon className="size-6 shrink-0" />
            <span>Back to sign up</span>
          </Button>
        </>
      ) : (
        <>
          <div className="divider">OR</div>
          <p className="text-center mt-4 font-semibold text-txt-muted">
            Already have an account?{" "}
            <Button variant="link">
              {" "}
              <Link href={"/sign-in"}>Sign in</Link>
            </Button>
          </p>
        </>
      )}
    </div>
  );
};

export default page;
