import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { create } from 'zustand';

interface MusicStore {
  albums: Album[];
  songs: Song[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
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
  fetchAlbumById: async (id) => {
    set({
      error: null,
      isLoading: true,
    });
    try {
      const response = await axiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchFeaturedSongs: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get('/songs/featured');
      set({ featuredSongs: response.data });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchMadeForYouSongs: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get('/songs/made-for-you');
      set({ madeForYouSongs: response.data });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axiosInstance.get('/songs/trending');
      set({ trendingSongs: response.data });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
