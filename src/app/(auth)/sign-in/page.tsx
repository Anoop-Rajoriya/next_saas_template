"use client";
import { BtnWithLoader, PageLoader } from "@/components/Loader";
import Logo from "@/components/Logo";
import { validateEmail } from "@/lib/utils";
import { useSignIn } from "@clerk/nextjs";
import { LucideInfo } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function page() {
  const router = useRouter();
  const { isLoaded, setActive, signIn } = useSignIn();
  const [emailAdd, setEmailAdd] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) {
    return <PageLoader />;
  }

  const handleSignin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLoaded) return;
    setError("");

    if (!emailAdd.trim() || !validateEmail(emailAdd))
      return setError("enter valid email address");
    if (!password.trim() || password.length < 4)
      return setError("password must be 6 characters long");

    setLoading(true);
    try {
      const signinRes = await signIn.create({
        identifier: emailAdd,
        password,
      });

      if (signinRes.status === "complete") {
        await setActive({ session: signinRes.createdSessionId });
        router.push("/dashboard");
      } else {
        console.error(JSON.stringify(signinRes, null, 2));
        setError("unexpacted error occur");
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      setError(error.errors[0].message || "unexpacted error occur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-sm py-4 px-2 flex flex-col">
        <Logo classsName="text-xl mx-auto" />
        <h1 className="text-2xl font-bold mx-auto flex flex-col items-center">
          <span>Welcom Back!</span> Sign In to your account
        </h1>
        <div className="card-body">
          {error && (
            <p className="label text-error capitalize py-2">
              <LucideInfo /> {error}
            </p>
          )}
          <form onSubmit={handleSignin} className="space-y-2">
            <div className="fieldset">
              <label htmlFor="email" className="fieldset-label">
                Email Address *
              </label>
              <input
                className="input w-full"
                type="email"
                id="email"
                disabled={loading}
                value={emailAdd}
                onChange={(e) => setEmailAdd(e.target.value)}
              />
            </div>
            <div className="fieldset">
              <label htmlFor="password" className="fieldset-label">
                Password *
              </label>
              <input
                className="input w-full"
                type={isPassVisible ? "text" : "password"}
                id="password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onMouseEnter={() => setIsPassVisible(true)}
                onMouseLeave={() => setIsPassVisible(false)}
              />
            </div>
            <BtnWithLoader
              className="btn-primary w-full"
              loading={loading}
              type="submit"
            >
              Sign In
            </BtnWithLoader>
          </form>
        </div>
        <section className="card-action items-center">
          <p className="w-full text-center text-base-content">
            Don't have an account?{" "}
            <Link className="btn btn-link p-0" href={"/sign-up"}>
              Sign Up
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default page;
