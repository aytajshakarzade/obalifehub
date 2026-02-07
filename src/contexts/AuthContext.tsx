// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface SmartProfile extends Profile {
  kidsEnabled: boolean;
  grandpaEnabled: boolean;
  premiumAccess: boolean;
  childSafe: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: SmartProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    fullName: string,
    role: 'parent' | 'child' | 'senior'
  ) => Promise<void>;
  signOut: () => Promise<void>;
  reloadProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<SmartProfile | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= SMART ROLE MAPPING ================= */
  function enhanceProfile(profileRow: Profile): SmartProfile {
    const role = profileRow.role?.toLowerCase();

    // CHILD
    if (role === 'child') {
      return {
        ...profileRow,
        kidsEnabled: false,       // uşaq özü Kids Zone-a girişə sahib deyil
        grandpaEnabled: false,
        premiumAccess: false,
        childSafe: true,         // marketdə yalnız child-safe məhsullar
      };
    }

    // PARENT
    if (role === 'parent') {
      return {
        ...profileRow,
        kidsEnabled: true,       // valideyn Kids Zone görür / idarə edir
        grandpaEnabled: false,
        premiumAccess: false,
        childSafe: false,
      };
    }

    // SENIOR
    if (role === 'senior') {
      return {
        ...profileRow,
        kidsEnabled: false,
        grandpaEnabled: true,    // yaşlılarda Grandpa Mode aktivdir
        premiumAccess: false,
        childSafe: false,
      };
    }

    // fallback
    return {
      ...profileRow,
      kidsEnabled: false,
      grandpaEnabled: false,
      premiumAccess: false,
      childSafe: false,
    };
  }

  /* ================= LOAD PROFILE ================= */
  async function loadProfile(userId?: string) {
    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(enhanceProfile(data));
    } else {
      setProfile(null);
    }

    setLoading(false);
  }

  /* ================= INIT & AUTH STATE ================= */
  useEffect(() => {
    let profileChannel: any = null;
    // initial session check
    supabase.auth.getSession().then(({ data }) => {
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);
      if (currentUser) loadProfile(currentUser.id);
      else setLoading(false);
    });

    // auth state change listener
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        loadProfile(currentUser.id);

        // subscribe to realtime changes for this user's profile
        // cleanup previous channel if exists
        if (profileChannel) {
          try { profileChannel.unsubscribe(); } catch (e) {}
        }

        profileChannel = supabase
          .channel(`public:profiles:id=eq.${currentUser.id}`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${currentUser.id}` },
            (payload) => {
              // payload.eventType can be 'INSERT' | 'UPDATE' | 'DELETE' depending on supabase client version
              // new row is in payload.new (or payload.record / payload.new depending on SDK) — handle common shapes
              const newRow = (payload as any).new ?? (payload as any).record ?? (payload as any).payload?.new;
              if (newRow) {
                setProfile(enhanceProfile(newRow as Profile));
              } else {
                // fallback: reload from server
                loadProfile(currentUser.id);
              }
            }
          )
          .subscribe();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      try {
        listener.subscription.unsubscribe();
      } catch (e) {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================= AUTH ACTIONS ================= */
  async function signIn(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async function signUp(
    email: string,
    password: string,
    fullName: string,
    role: 'parent' | 'child' | 'senior'
  ) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error('Signup failed');

    // create profile row
    await supabase.from('profiles').insert({
      id: data.user.id,
      email,
      full_name: fullName,
      role: role.toLowerCase(),
      family_id: crypto.randomUUID(),
    });

    // immediately load profile
    await loadProfile(data.user.id);
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  async function reloadProfile() {
    if (user) await loadProfile(user.id);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signIn,
        signUp,
        signOut,
        reloadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
