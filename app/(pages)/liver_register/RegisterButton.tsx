"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

const RegisterButton = ({
  liverId,
  className,
}: {
  liverId?: string;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      {liverId ? (
        <Button className={className} disabled={pending}>
          {pending ? "更新中..." : "更新"}
        </Button>
      ) : (
        <Button className={className} variant={"secondary"} disabled={pending}>
          {pending ? "登録中..." : "登録"}
        </Button>
      )}
    </>
  );
};

export default RegisterButton;
