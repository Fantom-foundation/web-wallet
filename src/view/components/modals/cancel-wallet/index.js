import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class CancelWalletModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const SELF = this;
    const { toggleModal, cancelModalToggle, cancelWallet } = SELF.props;
    return (
      <Modal isOpen={toggleModal} toggle={cancelModalToggle}>
        <ModalHeader toggle={cancelModalToggle}>Cancel Wallet </ModalHeader>
        <ModalBody>Are you sure, you want to cancel the wallet ?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={e => cancelWallet(e)}>
            Yes
          </Button>{' '}
          <Button color="danger" onClick={cancelModalToggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
