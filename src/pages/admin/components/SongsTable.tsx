import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useChatStore } from '@/stores/useChatStore';
import { useMusicStore } from '@/stores/useMusicStore';
import { Trash2 } from 'lucide-react';
import { useEffect } from 'react';

export const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();
  const { users, fetchUsers } = useChatStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Plays</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song) => (
          <TableRow key={song._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                className="size-10 rounded object-cover"
                src={song.imageUrl}
              />
            </TableCell>
            <TableCell className="font-medium">{song.title}</TableCell>
            <TableCell>
              {users.find((user) => user._id === song.artistId)
                ? users.find((user) => user._id === song.artistId)!.username
                : 'Not Found'}
            </TableCell>
            <TableCell>{song.plays}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 cursor-pointer"
                  onClick={() => {
                    deleteSong(song._id);
                  }}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
