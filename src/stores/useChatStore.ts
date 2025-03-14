import { axiosInstance } from '@/lib/axios';
import { User } from '@/types';
import { create } from 'zustand';

interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
  users: [],
  error: null,
  isLoading: false,
  fetchUsers: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get('/users');
      set({ users: response.data });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
