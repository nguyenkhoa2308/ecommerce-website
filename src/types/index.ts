export interface UserProfile {
  id: string;
  email: string;
  username?: string;
  full_name?: string;
  role?: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthState {
  access_token: string | null;
  user: UserProfile | null;
  isLoggedIn: boolean;

  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hydrate: () => void;
}

export interface MenuItem {
  key: string;
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}
