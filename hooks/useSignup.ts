import { useSignUp } from "@clerk/nextjs";

function useSignup() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const signup = async (
    emailAddress: string,
    password: string,
    name: string
  ) => {
    if (!isLoaded) return;

    await signUp.create({
      firstName: name,
      emailAddress,
      password,
    });

    await signUp.prepareEmailAddressVerification({
      strategy: "email_code",
    });
  };

  const verify = async (code: string) => {
    if (!isLoaded) return;
    const verifyAttempt = await signUp.attemptEmailAddressVerification({
      code,
    });

    if (verifyAttempt.status === "complete") {
      await setActive({
        session: verifyAttempt.createdSessionId,
      });
    } else {
      console.warn("Email verification failed, status: ", verifyAttempt.status);
      throw new Error("Failed to verify email. Retry after some time.");
    }
  };

  const resend = async () => {
    if (!isLoaded) return;
    await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
  };

  return {
    signup,
    verify,
    resend,
    isLoaded,
  };
}

export default useSignup;
