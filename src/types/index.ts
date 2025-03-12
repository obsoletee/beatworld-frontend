export interface Song {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  plays: number;
  trackNumber: number;
  albumId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
}
