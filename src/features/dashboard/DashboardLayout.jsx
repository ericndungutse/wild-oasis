import styled from 'styled-components';
import { useRecentBookings, useRecentStays } from './dashboardHooks';
import Spinner from '../../ui/Spinner';

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
    stays,
    confirmedStays,
  } = useRecentStays();

  if (isLoadingRecentBookings || isLoadingRecentStays)
    return <Spinner />;

  console.log(confirmedStays);

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today's activities</div>
      <div>Chart stay diration</div>
      <div>Chart of sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
