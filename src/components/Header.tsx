import { ArrowLeft, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  onBack?: () => void;
  showProfile?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  title?: string;
}

export function Header({ onBack, showProfile, showSearch, showNotifications, title }: HeaderProps) {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
      <div className="max-w-md mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </button>
          )}
          {title && (
            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
          )}
          {showNotifications && (
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition-all relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          )}
          {showProfile && (
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2E8C3B] hover:bg-[#267130] active:scale-95 transition-all">
              <User className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
