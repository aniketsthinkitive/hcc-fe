import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

interface UnprotectedRouteProps {
  children: React.ReactNode;
}

const UnprotectedRoute: React.FC<UnprotectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If authenticated, redirect to admin dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If not authenticated, show the public content
  return <>{children}</>;
};

export default UnprotectedRoute;