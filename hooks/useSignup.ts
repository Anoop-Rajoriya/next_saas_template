import { useSignUp } from "@clerk/nextjs";
type SignupFields = {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName?: string;
};

function useSignup() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const signup = async ({
    emailAddress,
    password,
    firstName,
    lastName,
  }: SignupFields) => {
    if (!isLoaded) return;

    await signUp.create({
      firstName,
      lastName,
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
