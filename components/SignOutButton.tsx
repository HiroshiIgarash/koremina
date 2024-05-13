import { signOut } from "@/auth"
import { Button, ButtonProps, buttonVariants } from "./ui/button"
import { VariantProps } from "class-variance-authority"
import { LogOut, LogOutIcon } from "lucide-react"

interface SignOutButtonProps {
  variant?: ButtonProps['variant']
  className?: string | undefined
}

const SignOutButton = ({className,variant = 'secondary'}:SignOutButtonProps) => {

  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo:"/"})
      }}
      className={className}
    >
      <Button className="w-full justify-start" variant={variant}><LogOutIcon className="mr-2 w-4 h-4"  />ログアウト</Button>
    </form>
  )
}

export default SignOutButton