import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { User, Clock, Lock, MapPin, Gift } from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'account' | 'loyalty' | 'orders' | 'security'>('account');

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'loyalty', label: 'Loyalty', icon: Gift },
    { id: 'orders', label: 'Orders', icon: Clock },
    { id: 'security', label: 'Privacy', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <Header onBack={onBack} title={t('profile.title')} />

      <div className="max-w-md mx-auto px-6 py-6">
        <Card className="mb-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4 shadow-lg">
            {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {profile?.full_name || 'User'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {profile?.email}
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 inline-block">
            <p className="text-xs text-gray-600 dark:text-gray-400">{t('profile.personalInfo')}</p>
            <p className="font-semibold text-gray-800 dark:text-white capitalize">
              {profile?.role}
            </p>
          </div>
        </Card>

        <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'account' && (
          <div className="space-y-3 mb-6">
            <Card>
              <p className="text-xs text-gray-500 mb-1">{t('profile.name')}</p>
              <p className="font-semibold text-gray-800 dark:text-white">{profile?.full_name}</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-500 mb-1">{t('profile.email')}</p>
              <p className="font-semibold text-gray-800 dark:text-white break-all">{profile?.email}</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-500 mb-1">Role</p>
              <p className="font-semibold text-gray-800 dark:text-white capitalize">{profile?.role}</p>
            </Card>
            <Card>
              <p className="text-xs text-gray-500 mb-2">Saved addresses</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>28 May Street, Baku</span>
                  <MapPin className="w-4 h-4 text-[#2E8C3B]" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Family Home, Khatai</span>
                  <MapPin className="w-4 h-4 text-[#2E8C3B]" />
                </div>
              </div>
            </Card>
            <Card>
              <p className="text-xs text-gray-500 mb-2">Payment methods</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="text-sm font-medium">Apple Pay</span>
                  <span className="text-xs text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="text-sm font-medium">OBA Wallet</span>
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
            </Card>
            <Button variant="secondary" className="w-full">
              Manage Account
            </Button>
          </div>
        )}

        {activeTab === 'loyalty' && (
          <div className="space-y-3 mb-6">
            <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-gray-800">Digital Bonus Card</p>
                <span className="text-2xl">⭐</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Card Number: ****-****-****-{profile?.id?.slice(-4).toUpperCase()}
              </p>
              <Button variant="secondary" className="w-full">
                View Bonus Card
              </Button>
            </Card>

            <Card>
              <p className="text-xs text-gray-500 mb-2">Points system</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total points</span>
                <span className="text-lg font-semibold text-[#2E8C3B]">{profile?.coins_balance || 1200}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Special offers unlock at 1500 points.
              </p>
            </Card>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-3 mb-6">
            <Card>
              <p className="text-center text-gray-500 py-6">No order history yet</p>
            </Card>
            <p className="text-xs text-gray-500 text-center">
              Your purchase and activity history will appear here
            </p>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-3 mb-6">
            <Card className="border-l-4 border-yellow-500">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white mb-1">Privacy &amp; Security</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Manage password, biometric login, and privacy controls.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Update Privacy Settings
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white mb-1">Preferences</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Notifications, accessibility, and dark mode options.
                  </p>
                  <Button variant="secondary" className="w-full">
                    Manage Preferences
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
