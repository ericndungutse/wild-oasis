import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HiArrowDownOnSquare } from 'react-icons/hi2';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useGetBooking } from './bookingsHooks';
import Spinner from '../../ui/Spinner';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const [isGettingBooking, booking] = useGetBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isGettingBooking) return <Spinner />;
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>
            {status.replace('-', ' ')}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in <HiArrowDownOnSquare />
          </Button>
        )}
        <Button variation='secondary' onClick={moveBack}>
          &larr; Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
