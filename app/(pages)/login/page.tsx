"use client"
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams()

  const callbackUrl = searchParams.get('callbackUrl') || undefined

  const googleLogin = () => {
      signIn('google',{callbackUrl})
  }
  return (
    <ul>
      <li>
        <button onClick={googleLogin}>google</button>
      </li>
      <li></li>
    </ul>
  );
};

export default Page;
