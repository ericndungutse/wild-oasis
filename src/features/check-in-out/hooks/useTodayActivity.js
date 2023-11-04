import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../../services/apiBookings';

export function useTodayActivity() {
  const { isLoading: isLoadingActivities, data: activities } =
    useQuery({
      queryKey: ['today-activity'],
      queryFn: getStaysTodayActivity,
    });

  return { isLoadingActivities, activities };
}
