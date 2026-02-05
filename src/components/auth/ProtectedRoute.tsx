import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { usePrivy } from '@privy-io/react-auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const { authenticated: isPrivyAuthenticated } = usePrivy();
  const location = useLocation();

  const isFullyAuthenticated = isAuthenticated || isPrivyAuthenticated;

  if (!isFullyAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}
