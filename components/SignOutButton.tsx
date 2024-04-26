import { signOut } from "@/auth"
import { Button } from "./ui/button"

const SignOutButton = () => {

  return (
    <form
      action={async () => {
        "use server"
        await signOut({redirectTo:"/"})
      }}
    >
      <Button variant='secondary'>ログアウト</Button>
    </form>
  )
}

export default SignOutButton