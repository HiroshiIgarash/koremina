import { signIn } from "@/auth";
import { Button, ButtonProps } from "./ui/button";
import { ReactNode } from "react";

interface SignInButtonProps {
  children: ReactNode;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

const SignInButton = ({
  children,
  variant,
  size,
  className,
}: SignInButtonProps) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button className={className} variant={variant} size={size}>
        {children}
      </Button>
    </form>
  );
};

export default SignInButton;
