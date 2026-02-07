import { Heart, ShoppingBag, Gift, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { useState } from 'react';

interface WelcomeProps {
  onComplete: () => void;
}

export function Welcome({ onComplete }: WelcomeProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: ShoppingBag,
      title: 'Welcome to OBA LifeHub',
      description: 'More than just a market - your complete family lifestyle companion',
      color: 'bg-[#2E8C3B]'
    },
    {
      icon: Users,
      title: 'Perfect for Every Family Member',
      description: 'Engage kids with fun learning, help seniors with easy access, and earn rewards together',
      color: 'bg-[#FFB703]'
    },
    {
      icon: Gift,
      title: 'Earn Green Coins',
      description: 'Shop, learn, and complete activities to collect coins and unlock amazing rewards',
      color: 'bg-[#4A90E2]'
    },
    {
      icon: Heart,
      title: 'Ready to Start?',
      description: 'Join thousands of families already enjoying the OBA LifeHub experience',
      color: 'bg-[#2E8C3B]'
    }
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className={`w-32 h-32 ${currentStep.color} rounded-3xl flex items-center justify-center mb-8 shadow-2xl animate-bounce`}>
          <Icon className="w-16 h-16 text-white" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4 max-w-md">
          {currentStep.title}
        </h1>

        <p className="text-lg text-gray-600 text-center max-w-md mb-12">
          {currentStep.description}
        </p>

        <div className="flex gap-2 mb-12">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === step ? 'w-8 bg-[#2E8C3B]' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 space-y-3">
        {step < steps.length - 1 ? (
          <>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => setStep(step + 1)}
            >
              Continue
            </Button>
            <button
              onClick={onComplete}
              className="w-full text-gray-600 py-3 text-sm"
            >
              Skip
            </button>
          </>
        ) : (
          <Button
            variant="primary"
            className="w-full"
            onClick={onComplete}
          >
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
}
