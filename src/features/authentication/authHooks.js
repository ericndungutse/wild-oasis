import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const { isLoading: isLoggingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({ email, password }),

    onSuccess: (user) => {
      console.log(user);
      navigate('/dashboard');
    },

    onError: (err) => toast.error(err.message),
  });

  return { isLoggingIn, login };
}
