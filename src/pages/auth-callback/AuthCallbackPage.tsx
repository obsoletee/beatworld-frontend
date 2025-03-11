import { Card, CardContent } from '@/components/ui/card';
import { axiosInstance } from '@/lib/axios';
import { useUser } from '@clerk/clerk-react';
import { LoaderCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { isLoaded, user } = useUser();
  const syncAttempted = useRef(false);

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user || syncAttempted.current) return;
        syncAttempted.current = true;
        await axiosInstance.post('/auth/callback', {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log('Error occured in AuthCallbackPage', error);
      } finally {
        navigate('/');
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]);
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <LoaderCircle className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">Logging you in</h3>
          <p className="text-zinc-400 txt-sm">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};
