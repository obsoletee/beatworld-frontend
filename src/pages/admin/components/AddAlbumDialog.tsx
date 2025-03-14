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
import { Textarea } from '@/components/ui/textarea';
import { axiosInstance } from '@/lib/axios';
import { useChatStore } from '@/stores/useChatStore';
import { Plus, Upload } from 'lucide-react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const AddAlbumDialog = () => {
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { users, fetchUsers } = useChatStore();

  const [newAlbum, setNewAlbum] = useState({
    title: '',
    owner: '',
    description: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (!imageFile) {
        return toast.error('Please upload an image');
      }

      const formData = new FormData();

      formData.append('title', newAlbum.title);
      formData.append('ownerId', newAlbum.owner);
      formData.append('description', newAlbum.description);
      formData.append('imageFile', imageFile);

      await axiosInstance.post('/admin/albums', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewAlbum({ title: '', owner: '', description: '' });
      setImageFile(null);
      setAlbumDialogOpen(false);
      toast.success('Album created successfully');
    } catch (error) {
      return toast.error(`An error occured while uploading song ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(newAlbum.owner);
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-500 hover:bg-violet-600 text-white cursor-pointer">
          <Plus className="mr-2 size-4" />
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-white font-medium">
            Add New Album
          </DialogTitle>
          <DialogDescription>
            Add a new album to your collection
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <input
            disabled={isLoading}
            type="file"
            hidden
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageSelect}
          />
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <div className="text-center">
              <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                <Upload className="size-6 text-zinc-400" />
              </div>
              <div className="text-sm text-zinc-400 mb-2">
                {imageFile ? imageFile.name : 'Upload album cover'}
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Choose File
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Album Title</label>
            <Input
              disabled={isLoading}
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter album title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Owner</label>
            <Select
              disabled={isLoading}
              required
              onValueChange={(value) =>
                setNewAlbum({ ...newAlbum, owner: value })
              }
            >
              <SelectTrigger className="bg-zinc-700 border-zinc-600">
                <SelectValue placeholder="Select Owner" />
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
            <label className="text-sm font-medium">
              Album Description (Optional)
            </label>
            <Textarea
              disabled={isLoading}
              value={newAlbum.description}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, description: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700 resize-none max-h-40 overflow-y-auto max-w-[20vw]"
              placeholder="Enter album description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => setAlbumDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-violet-500 hover:bg-violet:600"
            onClick={handleSubmit}
            disabled={
              isLoading || !imageFile || !newAlbum.title || !newAlbum.owner
            }
          >
            {isLoading ? 'Creating...' : 'Add Album'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
