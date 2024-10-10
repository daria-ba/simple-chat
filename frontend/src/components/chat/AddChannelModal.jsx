import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addChannel, setActiveChannel } from '../../store/slices/chatSlice';
import { toast } from 'react-toastify';

const AddChannelModal = ({ show, handleClose }) => {
    // const [newChannelName, setNewChannelName] = useState('');
    const dispatch = useDispatch();
    const channels = useSelector((state) => state.channels);

    // console.log(channels.channels);

    const validationSchema = Yup.object({
      channelName: Yup.string()
        .min(3, 'Название канала должно содержать не менее 3 символов')
        .max(20, 'Название канала не должно превышать 20 символов')
        .test('unique-channel', 'Канал с таким именем уже существует', 
          (value) => !channels.channels.some(channel => channel.name === value)
        )
        .required('Обязательное поле'),
    });

    const createNotify = () => {
      console.log('create!!')
      toast.success("Канал успешно добавлен!");
    };


    const formik = useFormik({
      initialValues: { channelName: '' },
      validationSchema,
      onSubmit: (values, { resetForm }) => {
        const newChannel = { 
          id: Date.now(),
          name: values.channelName,
        };
  
        dispatch(addChannel(newChannel));

        dispatch(setActiveChannel(newChannel.id)); //добавить проверку, что канал создал юзер
        //если кто-то другой создал канал, то юзеров не должно перебрасывать
  
        resetForm();
        handleClose();
        createNotify();
      },
      validateOnChange: false,
      validateOnBlur: false, 
    });

  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="channelName">
              <Form.Label>Channel Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter channel name"
                name="channelName"
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