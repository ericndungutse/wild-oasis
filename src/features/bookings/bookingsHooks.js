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
import { PAGE_SIZE } from '../../utils/constants';

//  Fetch Cabins
export function useFetchBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status');

  // Filter
  const filterObj = {};
  if (!filterValue || filterValue === 'all') {
    filterObj.value = null;
  } else {
    filterObj.value = filterValue;
  }

  // Sort
  const sortRow = searchParams.get('sortBy') || 'startDate-desc';

  const [field, direction] = sortRow.split('-');

  const sortBy = { field, direction };

  // Pagination
  const page = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ['bookings', filterObj, sortBy, page],
    queryFn: () => getBookings(filterObj, sortBy, page),
  });

  // PREFETCH
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterObj, sortBy, page + 1],
      queryFn: () => getBookings(filterObj, sortBy, page + 1),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filterObj, sortBy, page - 1],
      queryFn: () => getBookings(filterObj, sortBy, page - 1),
    });

  return [isLoading, bookings, count, error];
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
