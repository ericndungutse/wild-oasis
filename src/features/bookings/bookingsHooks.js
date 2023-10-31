import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import {
  deleteBooking as deleteBookingApi,
  getBooking,
  getBookings,
} from '../../services/apiBookings';
import { useParams, useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

//  Fetch Bookings
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

export function useGetBooking() {
  const { id } = useParams();

  const {
    isLoading: isGettingBooking,
    data: booking,
    error,
  } = useQuery({
    queryKey: [`booking-${id}`],
    queryFn: () => getBooking(id),
    retry: false,
  });

  if (error) throw new Error('Error getting booking!');

  return [isGettingBooking, booking];
}

// Delete Booking
export function useDeleteBooking() {
  const queryClient = useQueryClient();
  // Delete
  const { isLoading: isDeleting, mutate: deleteBooking } =
    useMutation({
      mutationFn: deleteBookingApi,
      onSuccess: () => {
        toast.success('Booking successfully deleted.');
        queryClient.invalidateQueries({
          queryKey: ['bookings'],
        });
      },

      onError: (err) => {
        toast.error(err.message);
      },
    });

  return { isDeleting, deleteBooking };
}
