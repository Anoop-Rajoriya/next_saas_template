import parseClerkErrors, { Errors } from "@/lib/parseClerkErrors";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

function useSignin() {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const signin = async (identifier: string, password: string) => {
    if (!isLoaded) return;
    setLoading(true);
    setErrors({});
    try {
      const signinAttempt = await signIn.create({
        identifier,
        password,
      });

      if (signinAttempt.status === "complete") {
        await setActive({ session: signinAttempt.createdSessionId });
      } else {
        console.warn("Sign in attempt failed, status: ", signinAttempt.status);
        throw new Error("Failed to sign in. Retry after some time.");
      }
    } catch (error) {
      setErrors(parseClerkErrors(error));
    } finally {
      setLoading(false);
    }
  };

  return { signin, errors, loading };
}

export default useSignin;
