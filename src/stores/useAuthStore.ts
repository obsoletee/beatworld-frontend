import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface AuthStore {
  isAdmin: boolean;
  error: string | null;
  isLoading: boolean;
  checkAdminStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAdmin: false,
  isLoading: false,
  error: null,
  checkAdminStatus: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/admin/check');
      set({ isAdmin: response.data.admin });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => {
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
