import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/clerk-react';
import { ReactNode, useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useChatStore } from '@/stores/useChatStore';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const { checkAdminStatus } = useAuthStore();

  const { initSocket, disconnectSocket } = useChatStore();

  const updateApiToken = (token: string | null) => {
    if (token) {
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
        if (token) {
          await checkAdminStatus();
          if (userId) {
            initSocket(userId);
          }
        }
      } catch (error) {
        updateApiToken(null);
        console.log('Error in AuthProvider', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => disconnectSocket();
  }, [getToken, checkAdminStatus, disconnectSocket, initSocket, userId]);

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoaderCircle className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  return <div>{children}</div>;
};
