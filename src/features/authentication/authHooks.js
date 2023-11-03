import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import {
  login as loginApi,
  logout as logOutApi,
  signup as signupApi,
  updateCurrentUser as updateCurrentUserApi,
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
      queryClient.setQueryData(['user'], user.user);
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

export function useSignup() {
  const { isLoading: isSigningUp, mutate: signup } = useMutation({
    mutationFn: signupApi,

    onSuccess: (data) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },

    onError: (err) => toast.error(err.message),
  });

  console.log(isSigningUp, typeof signup);

  return { isSigningUp, signup };
}

// Update User
export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCurrentUser } =
    useMutation({
      mutationFn: updateCurrentUserApi,
      onSuccess: () => {
        toast.success('User successfully updated');
        queryClient.invalidateQueries({
          queryKey: ['user'],
        });
      },
      onError: (err) => toast.error(err.message),
    });

  return {
    isUpdating,
    updateCurrentUser,
  };
}
