import { useSignIn } from '@clerk/clerk-react';
import { Button } from './ui/button';

export const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/auth-callback',
    });
  };

  return (
    <Button
      variant={'secondary'}
      className="w-full text-white border-zinc-200 cursor-pointer"
      onClick={signInWithGoogle}
    >
      Continue with Google
    </Button>
  );
};
