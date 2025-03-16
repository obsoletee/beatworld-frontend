import { Song } from '@/types';
import { create } from 'zustand';
import { useChatStore } from './useChatStore';

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

    const socket = useChatStore.getState().socket;
    const users = useChatStore.getState().users;

    if (socket.auth) {
      socket.emit('update_activity', {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${
          users.find((user) => user._id === song.artistId)?.username
        }`,
      });
    }

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

    const socket = useChatStore.getState().socket;
    const users = useChatStore.getState().users;

    if (socket.auth) {
      socket.emit('update_activity', {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${
          users.find((user) => user._id === song.artistId)?.username
        }`,
      });
    }

    set({
      currentSong: song,
      isPlaiyng: true,
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex,
    });
  },
  togglePlay: () => {
    const willStartPlaying = !get().isPlaiyng;

    const currentSong = get().currentSong;
    const socket = useChatStore.getState().socket;
    const users = useChatStore.getState().users;

    if (socket.auth) {
      socket.emit('update_activity', {
        userId: socket.auth.userId,
        activity:
          willStartPlaying && currentSong
            ? `Playing ${currentSong.title} by ${
                users.find((user) => user._id === currentSong.artistId)
                  ?.username
              } `
            : 'Idle',
      });
    }

    set({ isPlaiyng: willStartPlaying });
  },
  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      const socket = useChatStore.getState().socket;
      const users = useChatStore.getState().users;

      if (socket.auth) {
        socket.emit('update_activity', {
          userId: socket.auth.userId,
          activity: `Playing ${nextSong.title} by ${
            users.find((user) => user._id === nextSong.artistId)?.username
          }`,
        });
      }
      set({ currentSong: nextSong, currentIndex: nextIndex, isPlaiyng: true });
    } else {
      set({ isPlaiyng: false });
      const socket = useChatStore.getState().socket;

      if (socket.auth) {
        socket.emit('update_activity', {
          userId: socket.auth.userId,
          activity: `Idle`,
        });
      }
    }
  },
  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      const socket = useChatStore.getState().socket;
      const users = useChatStore.getState().users;

      if (socket.auth) {
        socket.emit('update_activity', {
          userId: socket.auth.userId,
          activity: `Playing ${prevSong.title} by ${
            users.find((user) => user._id === prevSong.artistId)?.username
          }`,
        });
      }
      set({ currentSong: prevSong, currentIndex: prevIndex, isPlaiyng: true });
    } else {
      set({ isPlaiyng: false });
      const socket = useChatStore.getState().socket;

      if (socket.auth) {
        socket.emit('update_activity', {
          userId: socket.auth.userId,
          activity: `Idle`,
        });
      }
    }
  },
}));
