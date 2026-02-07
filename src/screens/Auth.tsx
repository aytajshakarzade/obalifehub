import { useState } from 'react';
import { Button } from '../components/Button';
import { useAuth } from '../contexts/AuthContext';

interface AuthProps {
  onSuccess: () => void;
}

export function Auth({ onSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'parent' | 'child' | 'senior'>('parent');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, fullName, role);
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xəta baş verdi');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex flex-col">

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">

        {/* LOGO */}
        <div className="mb-6 flex justify-center">
          <img
            src="https://www.veyseloglu.az/storage/companies/PUttOiNBLhM0uhKe84OCAEW1yAIXzSztboG1Ve2v.png"
            alt="OBA LifeHub Logo"
            className="w-36 h-36 object-contain drop-shadow-2xl"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          {isLogin ? 'Welcome Back' : 'Join OBA LifeHub'}
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          {isLogin
            ? 'Sign in to continue your journey'
            : 'Create your family account'}
        </p>

        {/* Form */}
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2E8C3B] focus:outline-none"
                    required
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a
                  </label>
                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value as 'parent' | 'child' | 'senior')
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2E8C3B] focus:outline-none"
                  >
                    <option value="parent">Parent</option>
                    <option value="child">Child</option>
                    <option value="senior">Senior</option>
                  </select>
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2E8C3B] focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#2E8C3B] focus:outline-none"
                required
                minLength={6}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Button */}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? 'Loading...'
                : isLogin
                ? 'Sign In'
                : 'Create Account'}
            </Button>

          </form>

          {/* Switch */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-[#2E8C3B] font-medium hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : 'Already have an account? Sign In'}
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Brand */}
      <div className="bg-[#2E8C3B] text-white text-center py-3 font-bold text-xl tracking-wider">
        OBA
      </div>

    </div>
  );
}
