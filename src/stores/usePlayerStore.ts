import { Song } from '@/types';
import { create } from 'zustand';

interface PlayerStore {
  currentSong: Song | null;
  isPlaiyng: boolean;
  queue: Song[];
  currentIndex: number;
  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}
export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaiyng: false,
  queue: [],
  currentIndex: -1,
  initializeQueue: (songs) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0],
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },
  playAlbum: (songs, startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];
    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaiyng: true,
    });
  },
  setCurrentSong: (song) => {
    if (!song) return;

    const songIndex = get().queue.findIndex((s) => s._id === song._id);
    set({
      currentSong: song,
      isPlaiyng: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },
  togglePlay: () => {
    const willStartPlaying = !get().isPlaiyng;

    set({ isPlaiyng: willStartPlaying });
  },
  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({ currentSong: nextSong, currentIndex: nextIndex, isPlaiyng: true });
    } else {
      set({ isPlaiyng: false });
    }
  },
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex <= 0) {
      const prevSong = queue[prevIndex];
      set({ currentSong: prevSong, currentIndex: prevIndex, isPlaiyng: true });
    } else {
      set({ isPlaiyng: false });
    }
  },
}));
