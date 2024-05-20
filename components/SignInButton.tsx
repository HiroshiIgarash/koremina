import { signIn } from "@/auth";
import { Button, ButtonProps } from "./ui/button";
import { ReactNode } from "react";

interface SignInButtonProps {
  children: ReactNode;
  variant?: ButtonProps["variant"];
}

const SignInButton = ({ children, variant }: SignInButtonProps) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button variant={variant}>{children}</Button>
    </form>
  );
};

export default SignInButton;
