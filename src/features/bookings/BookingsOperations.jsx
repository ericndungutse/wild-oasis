import React from 'react';
import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function BookingsOperations() {
  return (
    <TableOperations>
      <Filter
        filterValue='status'
        options={[
          {
            value: 'all',
            label: 'All',
          },
          {
            value: 'checked-out',
            label: 'Checked out',
          },
          {
            value: 'checked-in',
            label: 'Checked in',
          },
          {
            value: 'unconfirmed',
            label: 'Unconfirmed',
          },
        ]}
      />

      <SortBy
        options={[
          {
            value: 'startDate-desc',
            label: 'Sort by date (recent first)',
          },
          {
            value: 'startDate-asc',
            label: 'Sort by date (earlier first)',
          },
          {
            value: 'totalPrice-desc',
            label: 'Sort by amount (high first)',
          },
          {
            value: 'totalPrice-asc',
            label: 'Sort by amount (low first)',
          },
        ]}
      />
    </TableOperations>
  );
}

export default BookingsOperations;
