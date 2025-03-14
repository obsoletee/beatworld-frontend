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
import { Calendar, Trash2 } from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const AlbumsTable = () => {
  const { albums, deleteAlbum, isAlbumsLoading, error } = useMusicStore();
  const { users, fetchUsers } = useChatStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (isAlbumsLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading albums...</div>
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
          <TableHead className="w-[80px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album) => (
          <TableRow key={album._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                className="size-16 rounded object-cover"
                src={album.imageUrl}
              />
            </TableCell>
            <TableCell className="font-medium">
              <Link
                to={`/albums/${album._id}`}
                className="cursor-pointer hover:underline"
              >
                {album.title}
              </Link>
            </TableCell>
            <TableCell>
              {users.find((user) => user._id === album.ownerId)
                ? users.find((user) => user._id === album.ownerId)!.username
                : 'Not Found'}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                {album.createdAt.toString().split('T')[0]}
              </div>
            </TableCell>
            <TableCell>{album.songs.length + ' Songs'}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10 cursor-pointer"
                  onClick={() => {
                    deleteAlbum(album._id);
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
