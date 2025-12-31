"use client";

import { LogOutIcon } from "lucide-react";
import { Button, Link } from "../ui/Button";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

export const SignupLink = () => {
  <Button>SingupLink</Button>;
};
export const SigninLink = () => {
  <Button>SinginLink</Button>;
};
export const Signout = () => {
  const { signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleEmailSignout = async () => {
    try {
      setLoading(true);
      await signOut();
    } catch (error) {
      console.error(`User signout component error ${error}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={handleEmailSignout}
      loading={loading}
      variant="plan"
      isIcon
    >
      <LogOutIcon className="size-6 shrink-0" />
    </Button>
  );
};
