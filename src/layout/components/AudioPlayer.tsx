import { usePlayerStore } from '@/stores/usePlayerStore';
import { useEffect, useRef } from 'react';

export const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaiyng, playNext } = usePlayerStore();

  useEffect(() => {
    if (isPlaiyng) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaiyng]);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();
    };
    audio?.addEventListener('ended', handleEnded);
    return () => audio?.removeEventListener('ended', handleEnded);
  }, [playNext]);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong?.audioMp3Url;
    if (isSongChange) {
      audio.src = currentSong?.audioMp3Url;
      audio.currentTime = 0;
      prevSongRef.current = currentSong?.audioMp3Url;
      if (isPlaiyng) audio.play();
    }
  }, [currentSong, isPlaiyng]);
  return <audio ref={audioRef} />;
};
