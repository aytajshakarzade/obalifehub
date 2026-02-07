import { Home, ShoppingCart, CreditCard, Sparkles, User } from 'lucide-react';

type Tab = 'home' | 'shopping' | 'card' | 'ai' | 'profile';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export function BottomNav({ active, onChange }: Props) {
  return (
    <div className="absolute bottom-0 left-0 right-0">

      {/* mobile width wrapper */}
      <div className="mx-auto max-w-[430px]">

        <div className="bg-white dark:bg-gray-900 border-t shadow-xl flex justify-around py-3 rounded-t-2xl">

          <NavItem icon={Home} label="Home" active={active === 'home'} onClick={() => onChange('home')} />
          <NavItem icon={ShoppingCart} label="Shop" active={active === 'shopping'} onClick={() => onChange('shopping')} />
          <NavItem icon={CreditCard} label="Card" active={active === 'card'} onClick={() => onChange('card')} />
          <NavItem icon={Sparkles} label="AI" active={active === 'ai'} onClick={() => onChange('ai')} />
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
