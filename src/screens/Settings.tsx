import { useState } from 'react';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Globe, Moon, Bell, Lock, Trash2, Info, ChevronRight, Check } from 'lucide-react';
import { Language } from '../lib/translations';

interface SettingsProps {
  onBack: () => void;
}

export function Settings({ onBack }: SettingsProps) {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleDarkMode } = useTheme();
  const { signOut } = useAuth();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'az', name: 'Azerbaijani', flag: '🇦🇿' },
    { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setShowLanguageSelector(false);
  };

  if (showLanguageSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Header onBack={() => setShowLanguageSelector(false)} title={t('profile.language')} />

        <div className="max-w-md mx-auto px-6 py-6">
          <div className="space-y-3">
            {languages.map(lang => (
              <Card
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className="cursor-pointer hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{lang.name}</p>
                      <p className="text-xs text-gray-500">Tap to select</p>
                    </div>
                  </div>
                  {language === lang.code && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showDeleteConfirm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6">
        <Card className="max-w-sm">
          <div className="text-center">
            <Trash2 className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Delete Account?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <Button
                variant="secondary"
                className="flex-1"
                onClick={() => setShowDeleteConfirm(false)}
              >
                {t('common.cancel')}
              </Button>
              <Button
                variant="primary"
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onBack();
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header onBack={onBack} title={t('settings.title')} />

      <div className="max-w-md mx-auto px-6 py-6">
        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
          {t('settings.account')}
        </h3>

        <div className="space-y-2 mb-6">
          <Card
            onClick={() => setShowLanguageSelector(true)}
            className="cursor-pointer hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{t('profile.language')}</p>
                  <p className="text-xs text-gray-500">
                    {languages.find(l => l.code === language)?.name}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>

          <Card
            onClick={toggleDarkMode}
            className="cursor-pointer hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-6 h-6 text-purple-500" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{t('settings.darkMode')}</p>
                  <p className="text-xs text-gray-500">{isDark ? 'On' : 'Off'}</p>
                </div>
              </div>
              <div className={`w-12 h-7 rounded-full transition-all ${isDark ? 'bg-purple-500' : 'bg-gray-300'}`}>
                <div
                  className={`w-6 h-6 bg-white rounded-full transition-all transform ${isDark ? 'translate-x-5' : 'translate-x-1'}`}
                />
              </div>
            </div>
          </Card>
        </div>

        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
          {t('settings.security')}
        </h3>

        <div className="space-y-2 mb-6">
          <Card className="cursor-pointer hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6 text-red-500" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{t('settings.twoFactor')}</p>
                  <p className="text-xs text-gray-500">Add extra security</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-orange-500" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{t('settings.notifications')}</p>
                  <p className="text-xs text-gray-500">Manage notifications</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        </div>

        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
          About
        </h3>

        <div className="space-y-2 mb-6">
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Info className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{t('settings.about')}</p>
                  <p className="text-xs text-gray-500">{t('settings.version')} 1.0.0</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleSignOut}
          >
            {t('common.logout')}
          </Button>
          <Button
            variant="secondary"
            className="w-full text-red-500"
            onClick={() => setShowDeleteConfirm(true)}
          >
            {t('settings.deleteAccount')}
          </Button>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          <p>OBA LifeHub v1.0.0</p>
          <p>© 2026 OBA Corporation. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
