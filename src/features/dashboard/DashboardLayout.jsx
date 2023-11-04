import styled from 'styled-components';
import { useRecentBookings, useRecentStays } from './dashboardHooks';
import Spinner from '../../ui/Spinner';
import Stats from './Stats';
import { useFetchCabins } from '../cabins/cabinHooks';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingRecentBookings, bookings } =
    useRecentBookings();

  const {
    isLoading: isLoadingRecentStays,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const [isLoading, cabins] = useFetchCabins();

  if (isLoadingRecentBookings || isLoadingRecentStays || isLoading)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
        numDays={numDays}
      />
      <div>Today's activities</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
