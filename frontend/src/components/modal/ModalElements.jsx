/* eslint-disable react/prop-types */
import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const ModalElements = ({
  show,
  close,
  type,
  currentChannel,
  confirmDeleteChannel,
}) => {
  const { t } = useTranslation();

  const createNotify = () => {
    toast.success(t(`channel.${type}`));
  };

  const modalComponents = {
    edit: EditModal,
    delete: DeleteModal,
    create: AddModal,
  };

  const ModalComponent = type ? modalComponents[type] : null;

  return (
    <Modal
      show={show}
      onHide={close}
      centered
      backdrop="static"
    >
      <ModalComponent
        close={close}
        createNotify={createNotify}
        currentChannel={currentChannel}
        confirmDeleteChannel={confirmDeleteChannel}
      />
    </Modal>
  );
};

export default ModalElements;
