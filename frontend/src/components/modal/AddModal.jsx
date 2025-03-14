/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import useValidationSchemas from '../../validation';
import { setActiveChannel } from '../../store/slices/chatSlice';
import { useGetChannelsQuery, useAddChannelMutation } from '../../store/middlewares/index';
import { auth } from '../../store/slices/authSlice';

const AddModal = ({
  show,
  close,
  createNotify,
}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { data: channels } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const currentUserId = useSelector((state) => state.auth.userId);
  const { t } = useTranslation();
  const { modalShema } = useValidationSchemas();

  const channelsNames = channels.map((channel) => channel.name);

  const formik = useFormik({
    initialValues: {
      channelName: '',
      isPrivate: false,
    },
    validationSchema: modalShema(channelsNames),
    onSubmit: async (values, { resetForm }) => {
      console.log('user id', currentUserId);
      const newChannel = {
        created_by: currentUserId,
        name: leoProfanity.clean(values.channelName),
        is_private: false,
        // is_private: isPrivate,
      };
      try {
        const data = await addChannel(newChannel).unwrap();
        console.log('addmodal', data);
        resetForm();
        close();
        if (data) {
          dispatch(setActiveChannel(data.id));
        }
        createNotify();
      } catch (err) {
        console.error('Failed to add channel', err);
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
        <Modal.Title>{t('channel.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name" visuallyHidden>{t('channel.channelName')}</Form.Label>
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
        <div className="mt-2 d-flex justify-content-end">
          <Button variant="secondary" onClick={close}>
            {t('modal.cancel')}
          </Button>
          <Button
            variant="primary"
            onClick={formik.handleSubmit}
            className="ms-2"
          >
            {t('modal.submit')}
          </Button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default AddModal;
