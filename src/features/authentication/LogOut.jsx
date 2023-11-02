import ButtonIcon from '../../ui/ButtonIcon';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useLogOut } from './authHooks';
import SpinnerMini from '../../ui/SpinnerMini';

export default function LogOut() {
  const { isLogingOut, logOut } = useLogOut();
  return (
    <ButtonIcon disabled={isLogingOut} onClick={logOut}>
      {!isLogingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
