import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetBooking } from '../bookings/bookingsHooks';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useState } from 'react';
import { useEffect } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useCheckinBooking } from './hooks/useCheckin';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [hasPaid, setHasPaid] = useState(false);
  const moveBack = useMoveBack();
  const [isGettingBooking, booking] = useGetBooking();
  const { isCheckingIn, checkIn } = useCheckinBooking();

  useEffect(() => {
    setHasPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isGettingBooking) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    checkIn(bookingId);
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Box>
        <Checkbox
          checked={hasPaid}
          onChange={() => setHasPaid((currState) => !currState)}
          id='confirm'
          disabled={booking?.isPaid}>
          I confirm that <strong>{guests.fullName}</strong> has paid
          total amount{' '}
          <strong>
            <i>{formatCurrency(totalPrice)}</i>{' '}
          </strong>
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={isCheckingIn || !hasPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button
          variation='secondary'
          onClick={moveBack}
          disabled={isCheckingIn}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
