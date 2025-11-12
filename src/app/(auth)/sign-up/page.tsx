"use client";
import { BtnWithLoader, PageLoader } from "@/components/Loader";
import Logo from "@/components/Logo";
import Link from "next/link";
import { LucideInfo } from "lucide-react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { validateEmail, validateFullName } from "@/lib/utils";

type FormState = "signup" | "verify";

function SignupPage() {
  const router = useRouter();
  const { isLoaded, setActive, signUp } = useSignUp();
  const [name, setName] = useState("");
  const [emailAdd, setEmailAdd] = useState("");
  const [password, setPassword] = useState("");
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [formState, setFormState] = useState<FormState>("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isLoaded) {
    return <PageLoader />;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");

    if (!name.trim() || !validateFullName(name))
      return setError(
        "name must be 8 characters long and formated like 'ram sharma'"
      );
    if (!emailAdd.trim() || !validateEmail(emailAdd))
      return setError("enter valid email address");
    if (!password.trim() || password.length < 4)
      return setError("password must be 6 characters long");

    setLoading(true);
    try {
      const [firstName, lastName] = name.split(" ");
      await signUp.create({
        emailAddress: emailAdd,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setFormState("verify");
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2));
      setError(error.errors[0].message || "unexpacted error occur");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setError("");

    setLoading(true);
    try {
      const verificationRes = await signUp.attemptEmailAddressVerification({
        code: verifyCode,
      });

      if (verificationRes.status === "complete") {
        await setActive({ session: verificationRes.createdSessionId });
        router.push("/dashboard");
      }

      if (verificationRes.status !== "complete") {
        console.error(JSON.stringify(verificationRes, null, 2));
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
        <h1 className="text-2xl font-bold mx-auto">
          {formState === "verify"
            ? "Verify your account"
            : "SignUp as user here"}
        </h1>
        <div className="card-body">
          {error && (
            <p className="label text-error capitalize py-2">
              <LucideInfo /> {error}
            </p>
          )}
          {formState === "verify" ? (
            <form onSubmit={handleVerify} className="space-y-2">
              <div className="fieldset">
                <label htmlFor="verify-code" className="fieldset-label">
                  Verification Code
                </label>
                <input
                  className="input w-full"
                  type="text"
                  id="verify-code"
                  disabled={loading}
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                />
              </div>
              <BtnWithLoader
                className="btn-primary w-full"
                loading={loading}
                type="submit"
                loadingLabel="Verifying"
              >
                Verify
              </BtnWithLoader>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-2">
              <div className="fieldset">
                <label htmlFor="name" className="fieldset-label">
                  Name *
                </label>
                <input
                  className="input w-full"
                  type="text"
                  id="name"
                  disabled={loading}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                Sign Up
              </BtnWithLoader>
            </form>
          )}
        </div>
        <section className="card-action items-center">
          <p className="w-full text-center text-base-content">
            Have an account?{" "}
            <Link className="btn btn-link p-0" href={"/sign-in"}>
              Sign In
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default SignupPage;
