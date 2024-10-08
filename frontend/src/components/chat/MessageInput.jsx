import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useAddMessageMutation } from '../../store/middlewares/messagesApi';

const MessageInput = () => {
  const { currentChatId } = useSelector((state) => state.channels);
  // const activeChannelId = useSelector((state) => { 
  //   return state.currentChatId });
  const username = useSelector((state) => state.auth.username);
  const inputRef = useRef(null);
  // console.log(currentChatId)
  
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const message = {
        body: values.message,
        username,
        removable: true,
        channelId: currentChatId,
        id: '',
      };

      try {
        await addMessage(message);
        resetForm();
      } catch (error) {
        console.error('Failed to send message:', error);
      }

      inputRef.current.focus();
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChatId]);

  return (
    <div className="mt-auto px-5 pt-3 pb-5">
      <Form className="p-0 rounded-3 border" noValidate onSubmit={formik.handleSubmit}>
        <InputGroup>
          <Form.Control
            className="border-0 p-0 ps-2"
            name="message"
            ref={inputRef}
            onChange={formik.handleChange}
            value={formik.values.message}
            disabled={isLoading}
            placeholder="Enter Message"
            aria-label="new Message"
            autoComplete="off"
          />
          <Button
            className="ms-1"
            variant="outline-secondary"
            type="submit"
            disabled={!formik.values.message || isLoading}
            aria-label="submit"
          >
            Send
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageInput;