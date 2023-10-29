import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createEditCabin,
  deleteCabin as deleteCabinApi,
  getCabins,
} from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

//  Fetch Cabins
export function useFetchBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');

  const filterObj = {};
  if (!filterValue || filterValue === 'all') {
    filterObj.value = null;
  } else {
    filterObj.value = filterValue;
  }

  // Load
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ['bookings', filterObj],
    queryFn: () => getBookings(filterObj),
  });

  return [isLoading, bookings, error];
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

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deleteCabin };
}
