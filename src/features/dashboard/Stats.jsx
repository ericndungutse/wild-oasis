import React from 'react';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendar,
  HiOutlineChartBar,
} from 'react-icons/hi2';
import Stat from './Stat';
import { formatCurrency } from '../../utils/helpers';

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. Num of Bookings
  const numBookings = bookings.length;

  //   2. Total Sales
  const sales = bookings.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0
  );

  //   3. Check ins
  const checkIns = confirmedStays.length;

  //   4. Occupacy Rate
  const occupatioRate =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <Stat
        value={numBookings}
        title='Bookings'
        color='blue'
        icon={<HiOutlineBriefcase />}
      />
      <Stat
        value={formatCurrency(sales)}
        title='Sales'
        color='green'
        icon={<HiOutlineBanknotes />}
      />
      <Stat
        value={checkIns}
        title='Check ins'
        color='indigo'
        icon={<HiOutlineCalendar />}
      />
      <Stat
        value={Math.round(occupatioRate * 100) + '%'}
        title='Occupance rate'
        color='yellow'
        icon={<HiOutlineChartBar />}
      />
    </>
  );
}

export default Stats;
