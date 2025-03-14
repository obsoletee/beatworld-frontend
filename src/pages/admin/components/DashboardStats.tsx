import { useMusicStore } from '@/stores/useMusicStore';
import { Library, ListMusic, PlayCircle, User2 } from 'lucide-react';
import { StatsCard } from './StatsCard';

export const DashboardStats = () => {
  const { stats } = useMusicStore();

  const statsData = [
    {
      icon: ListMusic,
      label: 'Total Songs',
      value: stats.totalSongs.toString(),
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-400/10',
      bgColorOnHover: 'hover:bg-emerald-500/40',
      iconColor: 'text-emerald-500',
    },
    {
      icon: Library,
      label: 'Total Albums',
      value: stats.totalAlbums.toString(),
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-400/10',
      bgColorOnHover: 'hover:bg-violet-500/40',
      iconColor: 'text-violet-500',
    },
    {
      icon: User2,
      label: 'Total Artists',
      value: stats.totalArtists.toString(),
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-400/10',
      bgColorOnHover: 'hover:bg-orange-500/40',
      iconColor: 'text-orange-500',
    },
    {
      icon: PlayCircle,
      label: 'Total Users',
      value: stats.totalUsers.toString(),
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-400/10',
      bgColorOnHover: 'hover:bg-sky-500/40',
      iconColor: 'text-sky-500',
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          bgColor={stat.bgColor}
          borderColor={stat.borderColor}
          bgColorOnHover={stat.bgColorOnHover}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};
