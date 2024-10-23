/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import leoProfanity from 'leo-profanity';
import { setActiveChannel } from '../../store/slices/chatSlice';
import { useGetChannelsQuery, useEditChannelMutation, useAddChannelMutation } from '../../store/middlewares/index';

const ModalElements = ({
  show,
  close,
  type,
  currentChannel,
  confirmDeleteChannel,
}) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { data: channels } = useGetChannelsQuery();
  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();

  const actualChannel = channels.find((channel) => channel.id === currentChannel);
  const channelsNames = channels.map((channel) => channel.name);

  const validationSchema = Yup.object({
    channelName: Yup.string()
      .min(3, `${t('validation.min_max')}`)
      .max(20, `${t('validation.min_max')}`)
      .notOneOf(channelsNames, `${t('validation.uniq')}`)
      .required(`${t('validation.required')}`),
  });

  const createNotify = () => {
    if (type === 'add') {
      toast.success(t('channel.created'));
    }
    if (type === 'edit') {
      toast.success(t('channel.edited'));
    }
    if (type === 'delete') {
      toast.success(t('channel.removed'));
    }
  };

  const formik = useFormik({
    initialValues: {
      channelName: type === 'edit' ? actualChannel?.name : '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      if (type === 'edit') {
        try {
          const editedChannel = {
            id: actualChannel.id,
            name: leoProfanity.clean(values.channelName),
          };
          const data = await editChannel(editedChannel).unwrap();
          resetForm();
          close();
          if (data) {
            toast.success(`${t('channel.edited')}`);
          }
        } catch (err) {
          console.error('Failed to edit channel', err);
        }
      } else {
        const newChannel = {
          name: leoProfanity.clean(values.channelName),
        };
        try {
          const data = await addChannel(newChannel).unwrap();
          resetForm();
          close();
          if (data) {
            dispatch(setActiveChannel(data.id));
          }
          createNotify();
        } catch (err) {
          console.error('Failed to add channel', err);
        }
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  useEffect(() => {
    if (show && type !== 'delete') {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [show, type]);

  return (
    <Modal
      show={show}
      onHide={close}
      centered
      backdrop="static"
    >
      <div className="modal-content">
        <Modal.Header>
          <Modal.Title>
            { type === 'delete' && t('channel.remove')}
            { type === 'edit' && t('channel.edit')}
            { type === 'add' && t('channel.add')}
          </Modal.Title>
          <Button
            variant="close"
            aria-label="Close"
            onClick={close}
          />
        </Modal.Header>
        <Modal.Body>
          { type === 'delete' && (
            <p className="lead">{t('modal.confirmation')}</p>
          )}
          { type === 'edit' && (
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group controlId="channelName">
                <Form.Control
                  type="text"
                  placeholder={t('channel.newName')}
                  name="channelName"
                  ref={inputRef}
                  value={formik.values.channelName}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.channelName}
                />
                <Form.Label className="visually-hidden">{t('channel.editChannelName')}</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.channelName}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
          )}
          { type === 'add' && (
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="name" visuallyHidden>{t('channel.channelName')}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t('channel.addPlaceholder')}
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
          )}
          <div className="mt-2 d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={close}>
              {t('modal.cancel')}
            </Button>
            {type === 'delete' ? (
              <Button variant="danger" onClick={confirmDeleteChannel}>
                {t('modal.confirm')}
              </Button>
            ) : (
              <Button variant="primary" onClick={formik.handleSubmit}>
                {t('modal.submit')}
              </Button>
            )}
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default ModalElements;
