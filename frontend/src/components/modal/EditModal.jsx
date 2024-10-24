/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { toast } from 'react-toastify';
import useValidationSchemas from '../../validation'
import { useGetChannelsQuery, useEditChannelMutation } from '../../store/middlewares/index';

const EditModal = ({
  show,
  close,
  currentChannel,
}) => {
  const inputRef = useRef(null);
  const { data: channels } = useGetChannelsQuery();
  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();
  const { modalShema } = useValidationSchemas();
  
  const actualChannel = channels.find((channel) => channel.id === currentChannel);
  const channelsNames = channels.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
    channelName: actualChannel?.name || '',
    },
    validationSchema: modalShema(channelsNames),
    onSubmit: async (values, { resetForm }) => {
      try {
        const editedChannel = {
          id: actualChannel.id,
          name: leoProfanity.clean(values.channelName),
        };
        const data = await editChannel(editedChannel).unwrap();
        resetForm();
        close();
        if (data) {
          toast.success(`${t('channel.edit')}`);
        }
      } catch (err) {
        console.error('Failed to edit channel', err);
        }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (show !== 'delete') {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [show]);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('channel.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="channelName">
            <Form.Label htmlFor="name" visuallyHidden>{t('channel.editChannelName')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('channel.newName')}
              name="channelName"
              ref={inputRef}
              value={formik.values.channelName}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.channelName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelName}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary"
          onClick={close}>
            {t('modal.cancel')}
        </Button>
        <Button variant="primary"
          onClick={formik.handleSubmit}>
            {t('modal.submit')}
        </Button>
      </Modal.Footer>
    </>
  );
};

export default EditModal;
