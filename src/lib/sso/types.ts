/**
 * SSO User information from the lanonasis_user cookie
 */
export interface SSOUser {
  id: string;
  email: string;
  role: string;
  name?: string;
  avatar_url?: string;
}

/**
 * SSO authentication state
 */
export interface SSOState {
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** Whether the auth state is being determined */
  isLoading: boolean;
  /** User information if authenticated */
  user: SSOUser | null;
  /** Error message if auth check failed */
  error: string | null;
}

/**
 * Configuration for the SSO hook
 */
export interface SSOConfig {
  /** Auth gateway URL (default: https://auth.lanonasis.com) */
  authGatewayUrl?: string;
  /** Cookie domain (default: .lanonasis.com) */
  cookieDomain?: string;
  /** Callback when auth state changes */
  onAuthChange?: (state: SSOState) => void;
  /** Polling interval in ms for cookie changes (default: 30000) */
  pollInterval?: number;
}
