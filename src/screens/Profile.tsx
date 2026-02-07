import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { User, CreditCard, Clock, Lock } from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const { t } = useLanguage();
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'personal' | 'payment' | 'history' | 'security'>('personal');

  const tabs = [
    { id: 'personal', label: t('profile.personalInfo'), icon: User },
    { id: 'payment', label: t('profile.paymentCards'), icon: CreditCard },
    { id: 'history', label: t('profile.history'), icon: Clock },
    { id: 'security', label: t('profile.security'), icon: Lock },
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

        {activeTab === 'personal' && (
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
              <p className="text-xs text-gray-500 mb-1">Language</p>
              <p className="font-semibold text-gray-800 dark:text-white">{profile?.preferred_language || 'English'}</p>
            </Card>
            <Button variant="secondary" className="w-full">
              {t('profile.editProfile')}
            </Button>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className="space-y-3 mb-6">
            <Card className="border-2 border-blue-200 dark:border-blue-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-gray-800 dark:text-white">OBA Virtual Card</p>
                <span className="text-2xl">💳</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Card Number: ****-****-****-{profile?.id?.slice(-4).toUpperCase()}
              </p>
              <Button variant="secondary" className="w-full">
                View Full Card
              </Button>
            </Card>

            <Card>
              <p className="text-xs text-gray-500 mb-2">Payment Methods</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="text-sm font-medium">Virtual Card</span>
                  <span className="text-xs text-green-600">Connected</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3 mb-6">
            <Card>
              <p className="text-center text-gray-500 py-6">No transaction history yet</p>
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
                  <p className="font-semibold text-gray-800 dark:text-white mb-1">Password Security</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Last changed 90 days ago
                  </p>
                  <Button variant="secondary" className="w-full">
                    Change Password
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-blue-500">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white mb-1">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Add an extra layer of security
                  </p>
                  <Button variant="secondary" className="w-full">
                    Enable 2FA
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
