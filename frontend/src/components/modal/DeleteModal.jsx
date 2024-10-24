/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const DeleteModal = ({
  close,
  confirmDeleteChannel,
}) => {
  const { t } = useTranslation();

  return (
    <div className="modal-content">
      <Modal.Header>
        <Modal.Title>{t('channel.remove')}</Modal.Title>
        <Button
          variant="close"
          aria-label="Close"
          onClick={close}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.confirmation')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={close}>
            {t('modal.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={confirmDeleteChannel}
            className="ms-2"
          >
            {t('modal.confirm')}
          </Button>
        </div>
      </Modal.Body>
    </div>
  );
};

export default DeleteModal;
