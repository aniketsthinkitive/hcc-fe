export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'counselor' | 'patient';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmailPasswordCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: EmailPasswordCredentials) => Promise<any>;
  logout: () => void;
  clearAuthError: () => void;
  getRedirectPathForCurrentUser: () => string;
}
