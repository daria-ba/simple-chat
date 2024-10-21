/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import { useGetChannelsQuery, useEditChannelMutation } from '../../store/middlewares/index';

const EditChannelModal = ({ show, handleClose, actualChannel }) => {
  const inputRef = useRef(null);
  const { data: channels } = useGetChannelsQuery();
  const { t } = useTranslation();

  const currentChannel = channels.find((channel) => channel.id === actualChannel);
  const [editChannel] = useEditChannelMutation();

  const channelNames = channels
    .filter((channel) => channel.removable === true)
    .map((channel) => channel.name);

  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, `${t('validation.min_max')}`)
      .max(20, `${t('validation.min_max')}`)
      .notOneOf(channelNames, `${t('validation.uniq')}`)
      .required(`${t('validation.required')}`),
  });

  const formik = useFormik({
    initialValues: {
      channelName: currentChannel?.name || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const editedChannel = {
          id: currentChannel.id,
          name: leoProfanity.clean(values.channelName),
        };
        const data = await editChannel(editedChannel).unwrap();
        resetForm();
        handleClose();
        if (data) {
          toast.success(`${t('channel.renamed')}`);
        }
      } catch (err) {
        console.error('Failed to edit channel', err);
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channel.rename')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="channelName">
            <Form.Label>{t('channel.editChannelName')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('channel.new_name')}
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
        <Button variant="secondary" onClick={handleClose}>
          {t('modal.cancel')}
        </Button>
        <Button variant="primary" onClick={formik.handleSubmit}>
          {t('modal.submit')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditChannelModal;
