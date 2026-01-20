import { createClient, Session, AuthError, User } from '@supabase/supabase-js';
import {
  hasAuthCookies,
  parseUserCookie,
  COOKIE_NAMES,
  type SSOUser,
} from '@lanonasis/oauth-client/react';

// Auth gateway URL
const AUTH_GATEWAY_URL = import.meta.env.VITE_AUTH_GATEWAY_URL || 'https://auth.lanonasis.com';

// Error handling utility to prevent leaking sensitive error details
const handleAuthError = (error: AuthError | null) => {
  if (!error) return null;

  // Log the actual error for debugging but return a generic message
  console.error('Auth error:', error);

  // Return generic messages based on error type
  if (error.message.includes('Email not confirmed')) {
    return 'Please check your email to confirm your account';
  } else if (error.message.includes('Invalid login credentials')) {
    return 'Invalid email or password';
  } else if (error.message.includes('Email already registered')) {
    return 'An account with this email already exists';
  } else if (error.message.includes('rate limit')) {
    return 'Too many attempts. Please try again later';
  }

  // Default generic message
  return 'An authentication error occurred. Please try again later.';
};

/**
 * Check if user is authenticated via auth-gateway SSO cookies
 */
export function isAuthenticatedViaSSO(): boolean {
  return hasAuthCookies();
}

/**
 * Get user from SSO cookies (set by auth-gateway)
 */
export function getSSOUser(): SSOUser | null {
  return parseUserCookie();
}

/**
 * Redirect to auth-gateway login
 */
export function redirectToLogin(returnTo?: string): void {
  const loginUrl = new URL('/web/login', AUTH_GATEWAY_URL);
  loginUrl.searchParams.set('return_to', returnTo || window.location.href);
  window.location.href = loginUrl.toString();
}

/**
 * Redirect to auth-gateway logout
 */
export function redirectToLogout(returnTo?: string): void {
  const logoutUrl = new URL('/web/logout', AUTH_GATEWAY_URL);
  if (returnTo) {
    logoutUrl.searchParams.set('return_to', returnTo);
  }
  window.location.href = logoutUrl.toString();
}

// Shared Supabase instance across all platforms
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase environment variables are missing – update .env');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Auth helper functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { 
    data, 
    error: error ? { message: handleAuthError(error) } : null
  };
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  return { 
    data, 
    error: error ? { message: handleAuthError(error) } : null
  };
};

/**
 * Sign out - clears local Supabase session and redirects to auth-gateway logout
 */
export const signOut = async () => {
  // Clear local Supabase session
  const { error } = await supabase.auth.signOut();

  // Redirect to auth-gateway logout to clear SSO cookies
  if (isAuthenticatedViaSSO()) {
    redirectToLogout(window.location.origin);
    return { error: null };
  }

  return {
    error: error ? { message: handleAuthError(error) } : null
  };
};

/**
 * Get current user - checks SSO first, then falls back to Supabase
 */
export const getCurrentUser = async () => {
  // Check SSO first
  const ssoUser = getSSOUser();
  if (ssoUser) {
    // Return SSO user as a User-like object
    const user = {
      id: ssoUser.id,
      email: ssoUser.email,
      role: ssoUser.role,
      user_metadata: { name: ssoUser.name, avatar_url: ssoUser.avatar_url },
      app_metadata: {},
      aud: 'authenticated',
      created_at: new Date().toISOString(),
    } as unknown as User;

    return { user, error: null };
  }

  // Fallback to direct Supabase
  const { data: { user }, error } = await supabase.auth.getUser();
  return {
    user,
    error: error ? { message: handleAuthError(error) } : null
  };
};

export const onAuthStateChange = (callback: (event: string, session: Session | null) => void) => {
  return supabase.auth.onAuthStateChange(callback);
};