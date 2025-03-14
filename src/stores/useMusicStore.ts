import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface MusicStore {
  albums: Album[];
  songs: Song[];
  stats: Stats;
  isLoading: boolean;
  isAlbumsLoading: boolean;
  isSongsLoading: boolean;
  isStatsLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  updatePlays: (id: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],
  isLoading: false,
  isAlbumsLoading: false,
  isSongsLoading: false,
  isStatsLoading: false,
  error: null,
  currentAlbum: null,
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalUsers: 0,
  },
  fetchAlbums: async () => {
    set({
      error: null,
      isAlbumsLoading: true,
    });
    try {
      const response = await axiosInstance.get('/albums');
      set({ albums: response.data });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isAlbumsLoading: false });
    }
  },

  fetchSongs: async () => {
    set({
      error: null,
      isSongsLoading: true,
    });
    try {
      const response = await axiosInstance.get('/songs');
      set({ songs: response.data });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isSongsLoading: false });
    }
  },

  fetchStats: async () => {
    set({
      error: null,
      isStatsLoading: true,
    });
    try {
      const response = await axiosInstance.get('/stats');
      set({ stats: response.data });
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isStatsLoading: false });
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
  deleteSong: async (id) => {
    set({
      error: null,
      isSongsLoading: true,
    });
    try {
      await axiosInstance.delete(`/admin/songs/${id}`);
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id),
      }));
      toast.success('Song deleted succesfully');
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
      toast.error('Error deleting song');
    } finally {
      set({ isSongsLoading: false });
    }
  },

  deleteAlbum: async (id) => {
    set({
      error: null,
      isSongsLoading: true,
    });
    try {
      await axiosInstance.delete(`/admin/albums/${id}`);
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id),
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title
            ? { ...song, album: null }
            : song,
        ),
      }));
      toast.success('Album deleted succesfully');
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
      toast.error('Error deleting album');
    } finally {
      set({ isSongsLoading: false });
    }
  },

  updatePlays: async (id) => {
    try {
      set({
        error: null,
        isSongsLoading: true,
      });
      await axiosInstance.patch(`/songs/updatePlays/${id}`);
    } catch (error) {
      //@ts-expect-error error is type of unknown
      set({ error: error.response.data.message });
    } finally {
      set({ isSongsLoading: false });
    }
  },
}));
