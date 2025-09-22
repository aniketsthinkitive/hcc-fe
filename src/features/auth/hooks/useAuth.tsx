import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { 
  AuthState, 
  AuthContextType, 
  User, 
  EmailPasswordCredentials,
  LoginResponse 
} from '../types/auth.types';

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Action types
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          // TODO: Validate token with backend
          // For now, just restore user data
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
          // Clear invalid data
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
    };

    checkAuthStatus();
  }, []);

  // Login function - to be implemented with actual API call
  const login = async (credentials: EmailPasswordCredentials): Promise<any> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // TODO: Replace with actual API call
      // Example:
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(credentials)
      // });
      // const data = await response.json();
      
      // For now, just show error to indicate API needs to be implemented
      throw new Error('API integration needed - please implement login endpoint');
      
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { type: 'auth/login/rejected', payload: errorMessage };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberMe');
    dispatch({ type: 'LOGOUT' });
  };

  const clearAuthError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const getRedirectPathForCurrentUser = (): string => {
    if (!state.user) return '/login';
    
    switch (state.user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'counselor':
        return '/admin/dashboard';
      case 'patient':
        return '/admin/dashboard';
      default:
        return '/admin/dashboard';
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    clearAuthError,
    getRedirectPathForCurrentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
