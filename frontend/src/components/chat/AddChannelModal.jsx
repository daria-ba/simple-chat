/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { setActiveChannel } from '../../store/slices/chatSlice';
import { toast } from 'react-toastify';
import { useAddChannelMutation } from '../../store/middlewares';
import { useGetChannelsQuery } from '../../store/middlewares/index';
import leoProfanity from 'leo-profanity';

const AddChannelModal = ({ show, handleClose }) => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const { data: channels, error, isLoading } = useGetChannelsQuery();
    const [addChannel] = useAddChannelMutation(); 
    const {t} = useTranslation();

    const channelsNames = channels.map(channel => channel.name);


    const validationSchema = Yup.object({
      channelName: Yup.string()
        .min(3, `${t('validation.min_max')}`)
        .max(20, `${t('validation.min_max')}`)
        .notOneOf(channelsNames, `${t('validation.uniq')}`)
        .required(`${t('validation.required')}`),
    });

    const createNotify = () => {
      toast.success(`${t('channel.created')}`);
    };

    const formik = useFormik({
      initialValues: { channelName: '' },
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        const newChannel = {
          name: leoProfanity.clean(values.channelName),
        };
        try {
         const data = await addChannel(newChannel).unwrap();
          resetForm();
          handleClose();
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
      if (show) {
        inputRef.current.focus();
      }
    }, [show]);

    if (isLoading || !channels) {
      return (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">{t('loading')}</span>
          </Spinner>
        </div>
      );
    }

  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('channel.add')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="channelName">
              <Form.Control
                type="text"
                placeholder="Enter channel name"
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
            Закрыть
          </Button>
          <Button variant="primary" 
            onClick={formik.handleSubmit} 
            >
            Добавить чат
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default AddChannelModal;