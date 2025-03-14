import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { axiosInstance } from '@/lib/axios';
import { useChatStore } from '@/stores/useChatStore';
import { useMusicStore } from '@/stores/useMusicStore';

import { Plus, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const AddSongDialog = () => {
  const { albums } = useMusicStore();
  const { users, fetchUsers } = useChatStore();

  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    duration: 0,
  });

  const [files, setFiles] = useState<{
    audioMp3: File | null;
    audioWav: File | null;
    stems: File | null;
    image: File | null;
  }>({
    audioMp3: null,
    audioWav: null,
    stems: null,
    image: null,
  });

  const audioMp3InputRef = useRef<HTMLInputElement>(null);
  const audioWavInputRef = useRef<HTMLInputElement>(null);
  const stemsInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!files.audioMp3 || !files.image) {
        return toast.error('Please upload both audio and image files');
      }
      const formData = new FormData();
      formData.append('title', newSong.title);
      formData.append('artistId', newSong.artist);
      formData.append('duration', newSong.duration.toString());
      if (newSong.album && newSong.album !== 'none') {
        formData.append('albumId', newSong.album);
      }

      formData.append('audioMp3File', files.audioMp3);
      if (files.audioWav) {
        formData.append('audioWavFile', files.audioWav);
      }

      if (files.stems) {
        formData.append('stemsFile', files.stems);
      }

      formData.append('imageFile', files.image);

      await axiosInstance.post('admin/songs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setNewSong({ title: '', artist: '', album: '', duration: 0 });
      setFiles({ audioMp3: null, audioWav: null, stems: null, image: null });
      setSongDialogOpen(false);
      toast.success('Song added successfully!');
    } catch (error) {
      return toast.error(`An error occured while uploading song ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black border-emerald-400/80 cursor-pointer transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-white font-medium">
            Add New Song
          </DialogTitle>
          <DialogDescription>
            Add a new song to your music library
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <input
            disabled={isLoading}
            type="file"
            accept="audio/mp3"
            ref={audioMp3InputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audioMp3: e.target.files![0] }))
            }
          />
          <input
            disabled={isLoading}
            type="file"
            accept="audio/wav"
            ref={audioWavInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, audioWav: e.target.files![0] }))
            }
          />
          <input
            disabled={isLoading}
            type="file"
            accept=".zip,.rar,.7z,.tar,.gz"
            ref={stemsInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, stems: e.target.files![0] }))
            }
          />
          <input
            disabled={isLoading}
            type="file"
            accept="image/*"
            ref={imageInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({ ...prev, image: e.target.files![0] }))
            }
          />

          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => {
              imageInputRef.current?.click();
            }}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs text-zinc-400">
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="size-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    Upload artwork
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs cursor-pointer"
                  >
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File (Mp3)</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioMp3InputRef.current?.click()}
                className="w-full cursor-pointer"
              >
                {files.audioMp3
                  ? files.audioMp3.name.slice(0, 20)
                  : 'Choose Audio file (Mp3)'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File (Wav)</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioWavInputRef.current?.click()}
                className="w-full cursor-pointer"
              >
                {files.audioWav
                  ? files.audioWav.name.slice(0, 20)
                  : 'Choose Audio file (Wav)'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Audio Files (Stems)</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => stemsInputRef.current?.click()}
                className="w-full cursor-pointer"
              >
                {files.stems
                  ? files.stems.name.slice(0, 20)
                  : 'Choose Stems Archive'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              disabled={isLoading}
              placeholder="Type something..."
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="bg-zinc-700 border-zinc-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Select
              disabled={isLoading}
              required
              value={newSong.artist}
              onValueChange={(value) =>
                setNewSong({ ...newSong, artist: value })
              }
            >
              <SelectTrigger className="bg-zinc-700 border-zinc-600">
                <SelectValue placeholder="Select Artist" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-700 border-zinc-600">
                {users.map((user) => (
                  <SelectItem value={user._id} key={user._id}>
                    {user.username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (seconds)</label>
            <Input
              disabled={isLoading}
              type="number"
              min="0"
              value={newSong.duration}
              onChange={(e) =>
                setNewSong({
                  ...newSong,
                  duration: parseInt(e.target.value) || 0,
                })
              }
              className="bg-zinc-700 border-zinc-600"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Album (Optional)</label>
            <Select
              disabled={isLoading}
              value={newSong.album}
              onValueChange={(value) =>
                setNewSong({ ...newSong, album: value })
              }
            >
              <SelectTrigger className="bg-zinc-700 border-zinc-600">
                <SelectValue placeholder="Select Album" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-700 border-zinc-600">
                <SelectItem value="none">No Album (Single)</SelectItem>
                {albums.map((album) => (
                  <SelectItem value={album._id} key={album._id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setSongDialogOpen(false)}
            disabled={isLoading}
            className="cursor-pointer transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !files.audioMp3 ||
              !newSong.title ||
              !newSong.artist ||
              !newSong.duration
            }
            className="bg-emerald-500 hover:bg-emerald-600 text-black border-emerald-400/80 cursor-pointer transition-all"
          >
            {isLoading ? 'Uploading...' : 'Add Song'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
