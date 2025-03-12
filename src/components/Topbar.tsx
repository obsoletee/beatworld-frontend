import { SignedOut, UserButton } from '@clerk/clerk-react';
import { SignInOAuthButtons } from './SignInOAuthButtons';

export const Topbar = () => {
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 rounded-md">
      <div className="flex gap-1 items-center">
        <img
          src="/logo/beatworld-logo.png"
          alt="Beatworld logo"
          className="size-10"
        />
        Beatworld
      </div>
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
