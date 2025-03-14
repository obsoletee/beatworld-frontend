import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/" className="rounded-lg">
          <img
            src="/logo/beatworld-logo.png"
            alt="Beatworld Logo"
            className="size-10 text-black"
          />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Application Manager</h1>
          <p className="text-zinc-400 mt-1">
            Manage songs and albums from other users
          </p>
        </div>
      </div>
      <UserButton />
    </div>
  );
};
