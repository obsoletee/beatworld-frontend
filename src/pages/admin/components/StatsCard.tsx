import { Card, CardContent } from '@/components/ui/card';
import { ElementType } from 'react';

type StatsCardProps = {
  icon: ElementType;
  label: string;
  value: string;
  bgColor: string;
  borderColor: string;
  bgColorOnHover: string;
  iconColor: string;
};

export const StatsCard = ({
  icon: Icon,
  label,
  value,
  bgColor,
  borderColor,
  bgColorOnHover,
  iconColor,
}: StatsCardProps) => {
  return (
    <Card
      className={`transition-colors ${bgColor} ${bgColorOnHover} ${borderColor}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${bgColor}`}>
            <Icon className={`${iconColor} size-6`} />
          </div>
          <div>
            <p className="text-sm text-zinc-400">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
