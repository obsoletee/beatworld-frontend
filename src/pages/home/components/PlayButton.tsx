import { Button } from '@/components/ui/button';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { Song } from '@/types';
import { Pause, Play } from 'lucide-react';

interface PlayButtonProps {
  song: Song;
  size?: 'default' | 'large';
}

export const PlayButton = ({ song, size = 'default' }: PlayButtonProps) => {
  const {
    currentSong,
    isPlaiyng,
    setCurrentSong,
    togglePlay,
  } = usePlayerStore();

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      size="icon"
      onClick={handlePlay}
      className={`absolute ${
        size === 'large' && 'w-[48px] h-[48px]'
      } bottom-3 right-2 bg-green-500 hover:bg-green-400 cursor-pointer hover:scale-105 transition-all rounded-full opacity-0 translate-y-2 group-hover:translate-y-0 ${
        isCurrentSong
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 group-hover:opacity-100'
      } 
      }`}
    >
      {isCurrentSong && isPlaiyng ? (
        <Pause
          className={`${size === 'large' && 'size-7'} ${
            size === 'default' && 'size-5'
          } text-black`}
        />
      ) : (
        <Play
          className={`${size === 'large' && 'size-7'} ${
            size === 'default' && 'size-5'
          } text-black`}
        />
      )}
    </Button>
  );
};
