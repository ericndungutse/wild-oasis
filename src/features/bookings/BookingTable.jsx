import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import { useFetchBookings } from './bookingsHooks';
import { useSearchParams } from 'react-router-dom';

function BookingTable() {
  const [isLoading, bookings] = useFetchBookings();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName='bookings' />;

  const filterBy = searchParams.get('status') || 'all';

  let filteredBookings;

  filteredBookings = bookings.filter((booking) => {
    if (filterBy === 'all') return booking;
    return booking.status === filterBy;
  });

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={filteredBookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
