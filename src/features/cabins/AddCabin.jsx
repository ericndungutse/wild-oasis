import React, { useState } from 'react';
import Row from '../../ui/Row';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Row>
        <Button onClick={() => setIsOpenModal((cur) => !cur)}>
          Add new cabin
        </Button>
        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)}>
            <CreateCabinForm
              onCloseModel={() => setIsOpenModal(false)}
            />
          </Modal>
        )}
      </Row>
    </>
  );
}

export default AddCabin;
