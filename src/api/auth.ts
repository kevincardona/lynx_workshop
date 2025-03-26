import { supabase } from '../lib/supabase/index.ts';
import type { AuthError, Session, User } from '@supabase/supabase-js';

export async function signInWithEmail(email: string, password: string): Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { user: data.user, session: data.session, error };
  } catch (err) {
    console.error('Sign-in failed:', err);
    return { user: null, session: null, error: err as AuthError };
  }
}

export async function signUpWithEmail(email: string, password: string): Promise<{
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}> {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    return { user: data.user, session: data.session, error }
  } catch (err) {
    console.error('Sign-up failed:', err);
    return { user: null, session: null, error: err as AuthError };
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

