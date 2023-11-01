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
import { useSettings } from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [hasPaid, setHasPaid] = useState(false);
  const [addBreakfast, setAddBreackfast] = useState(false);
  const moveBack = useMoveBack();
  const [isGettingBooking, booking] = useGetBooking();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  const { isCheckingIn, checkIn } = useCheckinBooking();

  useEffect(() => {
    setHasPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isGettingBooking || isLoadingSettings) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests;

  const totalAccPrice = optionalBreakfastPrice
    ? totalPrice + optionalBreakfastPrice
    : totalPrice;

  function handleCheckin() {
    if (addBreakfast) {
      checkIn({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalAccPrice,
        },
      });
    } else {
      checkIn({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            disabled={hasBreakfast}
            id='breakfast'
            onChange={() => {
              setAddBreackfast((add) => !add);
              setHasPaid(false);
            }}>
            Want to add breakfast for{' '}
            <strong>{formatCurrency(optionalBreakfastPrice)}?</strong>
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={hasPaid}
          onChange={() => setHasPaid((currState) => !currState)}
          id='confirm'
          disabled={hasPaid}>
          I confirm that <strong>{guests.fullName}</strong> has paid
          total amount{' '}
          <strong>
            <i>
              {!addBreakfast
                ? formatCurrency(totalPrice)
                : formatCurrency(totalAccPrice)}
            </i>{' '}
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
