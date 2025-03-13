import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useMusicStore } from '@/stores/useMusicStore';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { Song } from '@/types';
import { formatTime } from '@/utils';
import { Clock, Pause, Play } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const AlbumPage = () => {
  const { albumId } = useParams();
  const { currentAlbum, fetchAlbumById, isLoading } = useMusicStore();
  const { currentSong, isPlaiyng, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) {
      fetchAlbumById(albumId);
    }
  }, [albumId, fetchAlbumById]);

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlayin = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id,
    );
    if (isCurrentAlbumPlayin) {
      togglePlay();
    } else {
      playAlbum(currentAlbum?.songs);
    }
  };
  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };
  if (isLoading) return null;

  return (
    <div className="h-full overflow-hidden">
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-[99vh]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none" />

          <div className="relative z-10 min-h-[100vh] flex flex-col">
            <div className="flex p-6 gap-6 pb-8 ">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-[240px] h-[240px] shadow-xl"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>●</span>
                  <span className="">{currentAlbum?.songs.length} songs</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer"
              >
                {isPlaiyng ? (
                  <Pause className="size-5 z-5 text-black" />
                ) : (
                  <Play className="size-5 z-5 text-black" />
                )}
              </Button>
            </div>

            <div className="bg-black/20 backdrop-blur-sm pb-4">
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5 ">
                <div>#</div>
                <div>Title</div>
                <div>Plays</div>
                <div>
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="px-6">
                <div className="space-y-2 py-4">
                  {currentAlbum?.songs
                    .sort((a: Song, b: Song) => a.trackNumber - b.trackNumber)
                    .map((song, index) => {
                      const isCurrentSong = currentSong?._id === song._id;
                      return (
                        <div
                          key={song._id}
                          onDoubleClick={() => handlePlaySong(index)}
                          className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md group cursor-pointer transition-all"
                        >
                          <div className="flex items-center justify-center">
                            {!isCurrentSong && !isPlaiyng && (
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                            )}
                            {!isCurrentSong && !isPlaiyng && (
                              <Play
                                className="h-4 w-4 hidden group-hover:block"
                                onClick={() => handlePlaySong(index)}
                              />
                            )}
                            {isCurrentSong && isPlaiyng && (
                              <span className="group-hover:hidden text-emerald-500">
                                ♫
                              </span>
                            )}
                            {isCurrentSong && isPlaiyng && (
                              <Pause
                                className="h-4 w-4 text-emerald-500 hidden group-hover:block"
                                onClick={togglePlay}
                              />
                            )}
                            {isCurrentSong && !isPlaiyng && (
                              <span className="group-hover:hidden text-emerald-500">
                                {index + 1}
                              </span>
                            )}
                            {isCurrentSong && !isPlaiyng && (
                              <Play
                                className="h-4 w-4 hidden text-emerald-500 group-hover:block"
                                onClick={() => handlePlaySong(index)}
                              />
                            )}
                            {!isCurrentSong && isPlaiyng && (
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                            )}
                            {!isCurrentSong && isPlaiyng && (
                              <Play
                                className="h-4 w-4 hidden group-hover:block"
                                onClick={() => handlePlaySong(index)}
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <img
                              src={song.imageUrl}
                              alt={song.title}
                              className="size-10"
                            />
                            <div>
                              {isCurrentSong ? (
                                <div className="font-medium text-emerald-500">
                                  {song.title}
                                </div>
                              ) : (
                                <div className="font-medium text-white">
                                  {song.title}
                                </div>
                              )}

                              <div>{song.artist}</div>
                            </div>
                          </div>
                          <div className="flex items-center">{song.plays}</div>
                          <div className="flex items-center">
                            {formatTime(song.duration)}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="bg-black/20 backdrop-blur-sm grow px-6 pb-4 flex flex-col gap-3">
              <div className="text-white">Description:</div>
              <div className="text-sm text-zinc-400">
                <span>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Beatae, modi architecto nisi eaque laudantium nihil ipsum,
                  rerum quia corrupti doloremque cumque rem exercitationem.
                  Facere, facilis veritatis. Quisquam iure illum dignissimos
                  reiciendis unde, distinctio culpa rerum aliquid hic
                  perspiciatis aut consequuntur dolorem illo excepturi harum
                  nostrum iusto, vitae nemo quo eum odio ipsam labore eveniet!
                  Voluptatibus rem iste nulla et consectetur commodi neque harum
                  ab. Minima, sapiente magni placeat pariatur deleniti
                  reiciendis fuga facilis recusandae. Temporibus voluptate nulla
                  dolor facere aliquam quae rem quam optio porro reprehenderit
                  deleniti deserunt aperiam voluptatem aut eius ea, sapiente
                  tempore ratione impedit ipsum dicta explicabo laboriosam? Vel
                  perferendis eligendi ipsam laudantium at animi nesciunt iusto
                  qui ab, molestias consequatur maxime fugiat quisquam quo
                  molestiae soluta omnis. Nobis eveniet veritatis eum, quasi
                  porro doloribus provident quam reprehenderit dolorem in vitae
                  voluptatum facere impedit animi voluptates excepturi? Natus
                  qui temporibus facere totam iste assumenda ex ipsam iure earum
                  magnam? In, dignissimos. Optio repellat fuga aliquid cumque
                  quaerat sapiente velit officiis, voluptatum aliquam tempora
                  nostrum sint totam cupiditate aut impedit vitae provident
                  omnis ex? Aut illo amet est facilis excepturi optio fuga
                  repudiandae possimus recusandae iure. Nobis, at. Similique
                  dicta perspiciatis animi optio inventore voluptatum odio, eius
                  error.
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
