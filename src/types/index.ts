export interface Song {
  _id: string;
  title: string;
  artistId: string | null;
  imageUrl: string;
  audioMp3Url: string;
  audioWavUrl: string;
  audioStemsUrl: string;
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
  ownerId: string;
  imageUrl: string;
  description: string;
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Stats {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  imageUrl: string;
  clerkId: string;
  following: string[];
  followers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
