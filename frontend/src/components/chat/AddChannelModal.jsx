import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addChannel, setActiveChannel } from '../../store/slices/chatSlice';
import { toast } from 'react-toastify';
import { useAddChannelMutation } from '../../store/middlewares';
import { useGetChannelsQuery } from '../../store/middlewares/index';

const AddChannelModal = ({ show, handleClose }) => {
    // const [newChannelName, setNewChannelName] = useState('');
    const dispatch = useDispatch();
    const { data: channels, error, isLoading } = useGetChannelsQuery();
    // const channels = useSelector((state) => state.channels);
    const [addChannel] = useAddChannelMutation(); 

    const validationSchema = Yup.object({
      channelName: Yup.string()
        .min(3, 'Название канала должно содержать не менее 3 символов')
        .max(20, 'Название канала не должно превышать 20 символов')
        .notOneOf(channels,  'Канал с таким именем уже существует')
        .required('Обязательное поле'),
    });

    const createNotify = () => {
      console.log('create!!')
      toast.success("Канал успешно добавлен!");
    };
    // .test('unique-channel', 'Канал с таким именем уже существует', 
    //   (values) => !channels.some(channel => channel.name === values.name)
    // )

    const formik = useFormik({
      initialValues: { channelName: '' },
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        const newChannel = { 
          // id: Date.now(),
          name: values.channelName,
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