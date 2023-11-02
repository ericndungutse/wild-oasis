import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import {
  login as loginApi,
  logout as logOutApi,
} from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { getCurrentUser } from '../../services/apiAuth';

import { useNavigate } from 'react-router-dom';
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({ email, password }),

    onSuccess: (user) => {
      queryClient.setQueriesData(['user'], user);
      navigate('/dashboard', { replace: true });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isLoggingIn, login };
}

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === 'authenticated',
  };
}

export function useLogOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading: isLogingOut, mutate: logOut } = useMutation({
    mutationFn: logOutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { isLogingOut, logOut };
}
