import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { updateBooking as updateBookingApi } from '../../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckinBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: checkIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBookingApi(bookingId, {
        status: 'checked-in',
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in!`);
      queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCheckingIn, checkIn };
}
