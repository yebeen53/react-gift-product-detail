import useAuth from '@/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ROUTES } from '@/constants/routes';

const useRequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.authToken) {
      navigate(ROUTES.HOME, {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [user, navigate, location]);

  return user;
};

export default useRequireAuth;
