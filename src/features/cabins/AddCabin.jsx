import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import CabinTable from './CabinTable';

function AddCabin() {
  return (
    // Modal is a context provider
    <div style={{ display: 'flex' }}>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add Cabin</Button>
        </Modal.Open>
        <Modal.Window modalName='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opens='table'>
          <Button>Open Table</Button>
        </Modal.Open>
        <Modal.Window modalName='table'>
          <CabinTable />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <>
//       <Row>
//         <Button onClick={() => setIsOpenModal((cur) => !cur)}>
//           Add new cabin
//         </Button>
//         {isOpenModal && (
//           <Modal onClose={() => setIsOpenModal(false)}>
//             <CreateCabinForm
//               onCloseModel={() => setIsOpenModal(false)}
//             />
//           </Modal>
//         )}
//       </Row>
//     </>
//   );
// }

export default AddCabin;
