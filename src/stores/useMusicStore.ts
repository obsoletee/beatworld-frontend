import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { create } from 'zustand';

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  fetchAlbums: async () => {
    set({
      error: null,
      isLoading: true,
    });
    try {
      const response = await axiosInstance.get('/albums');
      set({ albums: response.data });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
