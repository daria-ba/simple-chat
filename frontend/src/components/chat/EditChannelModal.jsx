import React, { useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useEditChannelMutation } from '../../store/middlewares';
import { useGetChannelsQuery } from '../../store/middlewares/index';


const EditChannelModal = ({ show, handleClose, actualChannel }) => {
    const inputRef = useRef(null);
    const { data: channels } = useGetChannelsQuery();
    
    const currentChannel = channels.find(channel => channel.id === actualChannel); //массив из 1 объекта
    const [updateChannel] = useEditChannelMutation();

    const channelNames = channels.map((channel) => {
      if (channel.removable === true) {
        return channel.name
      }
    });
  
    const validationSchema = Yup.object({
      channelName: Yup.string()
        .min(3, 'Название канала должно содержать не менее 3 символов')
        .max(20, 'Название канала не должно превышать 20 символов')
        .notOneOf(channelNames, 'Канал с таким именем уже существует')
        .required('Обязательное поле'),
    });
  
    const formik = useFormik({
      initialValues: {
        channelName: currentChannel?.name || '',
      },
      enableReinitialize: true,
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        try {
          const updatedChannel = { id: currentChannel.id, name: values.channelName };
          const data = await updateChannel(updatedChannel).unwrap();
          resetForm();
          handleClose();
          if (data) {
            toast.success('Канал переименован');
          }
        } catch (err) {
          console.error('Failed to edit channel', err);
        }
      },
      validateOnChange: false,
      validateOnBlur: false,
    });
    
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить имя канала</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="channelName">
              <Form.Label>Новое имя канала</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите новое имя канала"
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
            Отменить
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Сохранить изменения
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default EditChannelModal;