import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import parseClerkErrors, { Errors } from "@/lib/parseClerkErrors";

function useSignup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [verifing, setVerifing] = useState(false);

  const signup = async (email: string, password: string, name: string) => {
    if (!isLoaded) return;

    setLoading(true);
    setErrors({});
    try {
      await signUp.create({
        firstName: name,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setVerifing(true);
    } catch (error: any) {
      setErrors(parseClerkErrors(error));
    } finally {
      setLoading(false);
    }
  };

  const verify = async (code: string) => {
    if (!isLoaded) return;

    setLoading(true);
    setErrors({});

    try {
      const verifyAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (verifyAttempt.status === "complete") {
        await setActive({
          session: verifyAttempt.createdSessionId,
        });
      } else {
        console.warn(
          "Email verification failed, status: ",
          verifyAttempt.status
        );
        throw new Error("Failed to verify email. Retry after some time.");
      }
    } catch (error: any) {
      setErrors(parseClerkErrors(error));
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (!isLoaded || !loading) return;
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (error: any) {
      setErrors(parseClerkErrors(error));
    }
  };

  return {
    signup,
    verify,
    resend,
    loading,
    errors,
    verifing,
  };
}

export default useSignup;
