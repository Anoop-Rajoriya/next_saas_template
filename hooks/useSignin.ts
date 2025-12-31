import { useSignIn } from "@clerk/nextjs";

type SigninFields = {
  emailAddress: string;
  password: string;
};

function useSignin() {
  const { isLoaded, setActive, signIn } = useSignIn();

  const signin = async ({ emailAddress, password }: SigninFields) => {
    if (!isLoaded) return;

    const signinAttempt = await signIn.create({
      identifier: emailAddress,
      password,
    });

    if (signinAttempt.status === "complete") {
      await setActive({ session: signinAttempt.createdSessionId });
    } else {
      console.warn("Sign in attempt failed, status: ", signinAttempt.status);
      throw new Error("Failed to sign in. Retry after some time.");
    }
  };

  return { signin, isLoaded };
}

export default useSignin;
