import { PlaylistSkeleton } from '@/components/skeletons/PLaylistSkeleton';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/useAuthStore';
import { useChatStore } from '@/stores/useChatStore';
import { useMusicStore } from '@/stores/useMusicStore';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import {
  HomeIcon,
  LayoutDashboardIcon,
  LibraryIcon,
  MessageCircle,
} from 'lucide-react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const LeftSidebar = () => {
  const { isAdmin } = useAuthStore();
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  const { users, fetchUsers } = useChatStore();

  useEffect(() => {
    fetchAlbums();
    fetchUsers();
  }, [fetchAlbums, fetchUsers]);

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to="/"
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className:
                  'truncate w-full justify-start text-white hover:bg-zinc-800 transition-all',
              }),
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>
          </Link>
          <SignedIn>
            <Link
              to="/chat"
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                  className:
                    'truncate w-full justify-start text-white hover:bg-zinc-800 transition-all',
                }),
              )}
            >
              <MessageCircle className="mr-2 size-5" />
              <span className="hidden md:inline">Messages</span>
            </Link>
            {isAdmin ? (
              <Link
                to={'/admin'}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    className:
                      'truncate w-full justify-start text-white hover:bg-zinc-800 transition-all',
                  }),
                )}
              >
                <LayoutDashboardIcon className="size-5 mr-2" />
                <span className="hidden md:inline">Admin Dashboard</span>
              </Link>
            ) : (
              <Link
                to={'/'}
                className={cn(
                  buttonVariants({
                    variant: 'outline',
                    className:
                      'truncate w-full justify-start text-white hover:bg-zinc-800 transition-all',
                  }),
                )}
              >
                <LayoutDashboardIcon className="size-5 mr-2" />
                <span className="hidden md:inline">Studio</span>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <LibraryIcon className="size-7 mr-2" />
            <span className="font-semibold hidden md:inline">
              Added Playlists
            </span>
          </div>
        </div>
        <SignedOut>
          <div className="flex items-center px-2 text-sm text-zinc-400">
            Authorize to add something to your library
          </div>
        </SignedOut>
        <SignedIn>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {isLoading ? (
                <PlaylistSkeleton />
              ) : (
                albums.map((album) => (
                  <Link
                    to={`/albums/${album._id}`}
                    key={album._id}
                    className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer transition-all"
                  >
                    <img
                      src={album.imageUrl}
                      alt={album.title}
                      className="size-12 rounded-mb flex-shrink-0 object-cover"
                    />
                    <div className="flex-1 min-w-0 hidden md:block">
                      <p className="font-medium truncate">{album.title}</p>
                      <p className="text-sm text-zinc-400 truncate">
                        Album ●{' '}
                        {users.find((user) => user._id === album.ownerId)
                          ? users.find((user) => user._id === album.ownerId)!
                              .username
                          : 'Not Found'}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </ScrollArea>
        </SignedIn>
      </div>
    </div>
  );
};
