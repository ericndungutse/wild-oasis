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
import { useDeleteBooking, useGetBooking } from './bookingsHooks';
import Spinner from '../../ui/Spinner';
import { useCheckout } from '../check-in-out/hooks/useCheckOut';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const [isGettingBooking, booking] = useGetBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { isCheckingOut, checkOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  if (isGettingBooking) return <Spinner />;
  if (!booking) return <Empty resourceName='booking' />;

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
        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete this booking</Button>
          </Modal.Open>

          <Modal.Window modalName='delete'>
            <ConfirmDelete
              resourceName='booking'
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in <HiArrowDownOnSquare />
          </Button>
        )}

        {status === 'checked-in' && (
          <Button
            disabled={isCheckingOut}
            onClick={() => checkOut(bookingId)}>
            Check out
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
