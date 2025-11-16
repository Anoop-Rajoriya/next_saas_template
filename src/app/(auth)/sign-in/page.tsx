"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { validateEmail } from "@/lib/utils";
import { BtnWithLoader, PageLoader } from "@/components/Loader";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function page() {
  const router = useRouter();
  const { isLoaded, setActive, signIn } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    emailAddress: "",
    password: "",
    general: "",
  });

  if (!isLoaded) {
    return <PageLoader />;
  }

  const validateFields = (): boolean => {
    setError({
      emailAddress: "",
      password: "",
      general: "",
    });
    const errors: Partial<typeof error> = {};

    if (!validateEmail(emailAddress)) {
      errors.emailAddress = "Enter valid email address";
    }

    if (!password || !password.trim() || password.length < 8) {
      errors.password = "Password must be 8 characters long";
    }

    setError((pre) => ({ ...pre, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSignin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLoaded) return;
    const isValid = validateFields();
    if (!isValid) return;

    setLoading(true);

    try {
      const signinRes = await signIn.create({
        identifier: emailAddress,
        password,
      });
      if (signinRes.status === "complete") {
        await setActive({ session: signinRes.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error("Signin unexpacted error", signinRes);

        setError((pre) => ({ ...pre, general: "unexpacted error occur" }));
      }
    } catch (error: any) {
      console.error("Signin error: ", error);
      console.dir( error);
      setError((pre) => ({
        ...pre,
        general: error.errors[0].message || "unexpacted authentication error",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-start justify-center pt-12">
      <div className="card w-full max-w-md shadow-sm py-4 px-2 flex flex-col">
        <h1 className="card-title font-bold text-xl capitalize flex flex-col items-center justify-center gap-1 text-base-content">
          <span className="text-primary">welcom back</span> sign in your account
        </h1>
        <form className="card-body" onSubmit={handleSignin}>
          {/* Error */}
          {error.general && (
            <div role="alert" className="alert alert-error alert-soft">
              <span>{error.general}</span>
            </div>
          )}
          {/* Email */}
          <div className="fieldset">
            <label htmlFor="email" className="fieldset-label">
              Email Address *
            </label>
            <input
              className="input w-full"
              type="email"
              id="email"
              disabled={loading}
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            {error.emailAddress && (
              <p className="text-xs text-error">{error.emailAddress}</p>
            )}
          </div>

          {/* Password */}
          <div className="fieldset">
            <label htmlFor="password" className="fieldset-label">
              Password *
            </label>
            <div className="join">
              <input
                className="input w-full join-item"
                type={isVisible ? "text" : "password"}
                id="password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setIsVisible((pre) => !pre)}
                className="join-item btn btn-ghost"
              >
                {isVisible ? <EyeIcon /> : <EyeOffIcon />}
              </span>
            </div>
            {error.password && (
              <p className="text-xs text-error">{error.password}</p>
            )}
          </div>

          <BtnWithLoader
            className="btn-primary w-full mt-4"
            loading={loading}
            type="submit"
          >
            Sign In
          </BtnWithLoader>
        </form>
        <div className="card-action items-center">
          <p className="w-full text-center text-base-content">
            Don't have an account?{" "}
            <Link className="btn btn-link p-0" href={"/sign-up"}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
