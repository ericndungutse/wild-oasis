import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createEditCabin,
  deleteCabin as deleteCabinApi,
  getCabins,
} from '../services/apiCabins';
import toast from 'react-hot-toast';

//  Fetch Cabins
export function useFetchCabins() {
  // Load
  const { isLoading, data: cabins } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return [isLoading, cabins];
}

// Create Cabin
export function useCreateCabin(reet) {
  const queryClient = useQueryClient();

  // Create Cabin
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin uccessfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}

// Update Cabin
export function useUpdateCabin() {
  const queryClient = useQueryClient();

  // Edit
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin uccessfully updated');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    isEditing,
    editCabin,
  };
}

// Delete Cabin
export function useDeleteCabin() {
  const queryClient = useQueryClient();
  // Delete
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
