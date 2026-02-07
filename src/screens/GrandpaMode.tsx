import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ShoppingCart, Truck, Phone, Mic, Volume2 } from 'lucide-react';
import { useState } from 'react';

interface GrandpaModeProps {
  onBack: () => void;
}

export function GrandpaMode({ onBack }: GrandpaModeProps) {
  const [showSOS, setShowSOS] = useState(false);

  if (showSOS) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Phone className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Need Help?
          </h2>

          <div className="space-y-3 mb-6">
            <Button variant="large" className="w-full bg-[#4A90E2] hover:bg-[#3A7BC8]">
              <Phone className="w-6 h-6 mr-3" />
              Call Family
            </Button>

            <Button variant="large" className="w-full bg-[#2E8C3B] hover:bg-[#267130]">
              <Phone className="w-6 h-6 mr-3" />
              Contact Support
            </Button>

            <Button variant="large" className="w-full bg-[#FFB703] hover:bg-[#E5A503]">
              <Phone className="w-6 h-6 mr-3" />
              Share Location
            </Button>
          </div>

          <button
            onClick={() => setShowSOS(false)}
            className="w-full text-gray-600 py-4 text-xl font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header onBack={onBack} title="Easy Access" />

      <div className="max-w-md mx-auto px-6 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Accessibility Mode
            </h2>
            <div className="w-12 h-12 bg-[#4A90E2] rounded-2xl flex items-center justify-center">
              <Volume2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-lg text-gray-600">
            Large buttons and clear text for easy navigation
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Button variant="large" className="w-full flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 mr-4" />
            Shopping List
          </Button>

          <Button variant="large" className="w-full flex items-center justify-center">
            <Truck className="w-8 h-8 mr-4" />
            Order Delivery
          </Button>

          <Button
            variant="large"
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600"
            onClick={() => setShowSOS(true)}
          >
            <Phone className="w-8 h-8 mr-4" />
            Emergency Help
          </Button>
        </div>

        <div className="bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] rounded-3xl p-6 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Mic className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">
                Voice Assistant
              </h3>
              <p className="text-white/90 text-base">
                Tap to activate voice help
              </p>
            </div>
          </div>
          <Button variant="large" className="w-full bg-white text-[#4A90E2] hover:bg-white/90">
            <Mic className="w-6 h-6 mr-3" />
            Read Screen
          </Button>
        </div>

        <div className="mt-8 bg-white/80 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Quick Tips
          </h3>
          <ul className="space-y-3 text-lg text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#2E8C3B] font-bold">•</span>
              <span>Tap any button once to select</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E8C3B] font-bold">•</span>
              <span>Use voice assistant for help</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#2E8C3B] font-bold">•</span>
              <span>Emergency button calls family</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
