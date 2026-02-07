import { useState, useEffect } from 'react';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

import { LoadingSpinner } from './components/LoadingSpinner';
import { BottomNav } from './components/BottomNav';

import { Welcome } from './screens/Welcome';
import { Auth } from './screens/Auth';
import { Home } from './screens/Home';
import { Market } from './screens/Market';
import { SearchScreen } from './screens/SearchScreen';
import { Locations } from './screens/Locations';
import { KidsZone } from './screens/KidsZone';
import { GrandpaMode } from './screens/GrandpaMode';
import { Wallet } from './screens/Wallet';
import { DigitalCard } from './screens/DigitalCard';
import { WeeklyChallenges } from './screens/WeeklyChallenges';
import { Referral } from './screens/Referral';
import { Settings } from './screens/Settings';
import { Profile } from './screens/Profile';

type Screen =
  | 'welcome'
  | 'auth'
  | 'home'
  | 'market'
  | 'search'
  | 'locations'
  | 'kids'
  | 'grandpa'
  | 'wallet'
  | 'card'
  | 'challenges'
  | 'referral'
  | 'settings'
  | 'profile';

type Tab = 'home' | 'market' | 'search' | 'locations' | 'profile';

function AppContent() {
  const { user, profile, loading } = useAuth();

  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('hasSeenWelcome')) {
      setHasSeenWelcome(true);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user && profile) {
        setCurrentScreen('home');
        setActiveTab('home');
      } else if (hasSeenWelcome) {
        setCurrentScreen('auth');
      } else {
        setCurrentScreen('welcome');
      }
    }
  }, [user, profile, loading, hasSeenWelcome]);

  if (loading) return <LoadingSpinner />;

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <Welcome onComplete={() => setCurrentScreen('auth')} />;

      case 'auth':
        return <Auth onSuccess={() => setCurrentScreen('home')} />;

      case 'home':
        return <Home onNavigate={setCurrentScreen} />;

      case 'market':
        return <Market onBack={() => setCurrentScreen('home')} />;

      case 'search':
        return <SearchScreen onBack={() => setCurrentScreen('home')} />;

      case 'locations':
        return <Locations onBack={() => setCurrentScreen('home')} />;

      case 'kids':
        return <KidsZone onBack={() => setCurrentScreen('home')} />;

      case 'grandpa':
        return <GrandpaMode onBack={() => setCurrentScreen('home')} />;

      case 'wallet':
        return <Wallet onBack={() => setCurrentScreen('home')} />;

      case 'card':
        return <DigitalCard onBack={() => setCurrentScreen('home')} />;

      case 'challenges':
        return <WeeklyChallenges onBack={() => setCurrentScreen('home')} />;

      case 'referral':
        return <Referral onBack={() => setCurrentScreen('home')} />;

      case 'settings':
        return <Settings onBack={() => setCurrentScreen('home')} />;

      case 'profile':
        return <Profile onBack={() => setCurrentScreen('home')} />;

      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">

      {/* MOBILE FRAME */}
      <div className="relative w-full max-w-[430px] pb-24">

        {renderScreen()}

        {user && currentScreen !== 'auth' && currentScreen !== 'welcome' && (
          <BottomNav
            active={activeTab}
            onChange={(tab) => {
              setActiveTab(tab);
              setCurrentScreen(tab);
            }}
          />
        )}

      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
