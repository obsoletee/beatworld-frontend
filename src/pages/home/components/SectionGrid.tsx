import { SectionGridSkeleton } from '@/components/skeletons/SectionGridSkeleton';
import { Button } from '@/components/ui/button';
import { Song } from '@/types';
import { PlayButton } from './PlayButton';
import { useChatStore } from '@/stores/useChatStore';
import { useEffect } from 'react';

type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};

export const SectionGrid = ({ title, songs, isLoading }: SectionGridProps) => {
  const { users, fetchUsers } = useChatStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (isLoading) return <SectionGridSkeleton />;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white cursor-pointer"
        >
          Show all
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <PlayButton song={song} size={'large'} />
            </div>
            <h3 className="font-medium mb-2 truncate">{song.title}</h3>
            <p className="text-sm text-zinc-400 truncate">
              {users.find((user) => user._id === song.artistId)
                ? users.find((user) => user._id === song.artistId)!.username
                : 'Not Found'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
