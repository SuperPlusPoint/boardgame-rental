import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthProvider';

export const useListParams = () => {
  const { user } = useAuthContext();
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId && user) {
      navigate(user.uid, { replace: true });
    }
  }, [userId, navigate, user]);

  return {
    userId: userId || user?.uid,
  };
};
