import { LucideIcon } from 'lucide-react';
import { Card } from './Card';

interface ModuleCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  color: string;
  onClick: () => void;
}

export function ModuleCard({ icon: Icon, title, subtitle, color, onClick }: ModuleCardProps) {
  return (
    <Card onClick={onClick} className="relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-10 rounded-full -mr-8 -mt-8`} />
      <div className="relative flex items-center gap-4">
        <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
}
