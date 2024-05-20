import getCurrentUser from "@/app/action/getCurrentUser";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import HeaderPopover from "./HeaderPopover";

const HeaderRight = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex items-center gap-2">
      {currentUser ? (
        <HeaderPopover currentUser={currentUser}>
          <SignOutButton className="w-full" variant="ghost" />
        </HeaderPopover>
      ) : (
        <SignInButton />
      )}
    </div>
  );
};

export default HeaderRight;
