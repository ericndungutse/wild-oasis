import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import { useCheckout } from './hooks/useCheckOut';

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkOut } = useCheckout();
  return (
    <Button
      disabled={isCheckingOut}
      variation='primary'
      size='small'
      onClick={() => checkOut(bookingId)}>
      {isCheckingOut ? <SpinnerMini /> : 'Check out'}
    </Button>
  );
}

export default CheckoutButton;
