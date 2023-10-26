import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  // Edit
  const { isLoading: isUpdating, mutate: updateSetting } =
    useMutation({
      mutationFn: updateSettingApi,

      onSuccess: () => {
        toast.success('Setting uccessfully updated');
        queryClient.invalidateQueries({
          queryKey: ['settings'],
        });
      },

      onError: (err) => toast.error(err.message),
    });

  return {
    isUpdating,
    updateSetting,
  };
}
