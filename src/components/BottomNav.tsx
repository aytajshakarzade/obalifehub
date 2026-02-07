import { Home, ShoppingBag, Search, MapPin, User } from 'lucide-react';

type Tab = 'home' | 'market' | 'search' | 'locations' | 'profile';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export function BottomNav({ active, onChange }: Props) {
  return (
    <div className="absolute bottom-0 left-0 right-0">

      {/* mobile width wrapper */}
      <div className="mx-auto max-w-[430px]">

        <div className="bg-white dark:bg-gray-900 border-t shadow-xl flex justify-around py-2 rounded-t-2xl relative">
          <NavItem icon={Home} label="Home" active={active === 'home'} onClick={() => onChange('home')} />
          <NavItem
            icon={ShoppingBag}
            label="Market"
            active={active === 'market'}
            onClick={() => onChange('market')}
          />

          <button
            onClick={() => onChange('search')}
            className="relative -mt-8 w-14 h-14 rounded-full bg-[#FFB703] shadow-lg flex items-center justify-center text-white border-4 border-white"
          >
            <Search className="w-6 h-6" />
          </button>

          <NavItem
            icon={MapPin}
            label="Locations"
            active={active === 'locations'}
            onClick={() => onChange('locations')}
          />
          <NavItem icon={User} label="Profile" active={active === 'profile'} onClick={() => onChange('profile')} />
        </div>

      </div>

    </div>
  );
}

function NavItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center text-xs gap-1 ${
        active ? 'text-[#2E8C3B]' : 'text-gray-400'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}
