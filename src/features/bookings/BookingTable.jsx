import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import { useFetchBookings } from './bookingsHooks';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const [isLoading, bookings] = useFetchBookings();

  if (isLoading) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName='bookings' />;

  // CLIENT SIDE FILTERING AND SORTING

  // const filterBy = searchParams.get('status') || 'all';

  // let filteredBookings = bookings.filter((booking) => {
  //   if (filterBy === 'all') return booking;
  //   return booking.status === filterBy;
  // });

  // const sortByValue = searchParams.get('sortBy') || 'startDate-desc';

  // const [field, direction] = sortByValue.split('-');
  // const modifier = direction === 'asc' ? 1 : -1;

  // let sortedBookings = filteredBookings.sort((a, b) => {
  //   if (a[field] < b[field]) return -1 * modifier;
  //   if (a[field] > b[field]) return 1 * modifier;
  //   return 0;
  // });

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
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={45} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
