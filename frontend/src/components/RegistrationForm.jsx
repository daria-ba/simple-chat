import React, { useState } from 'react';
import { useFormik } from "formik";
import { Button, Form, Container, Card, Navbar, Row, Col } from 'react-bootstrap';
// import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { setAuthData, login } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import ChatNavbar from './chat/ChatNavbar';

const RegistrationForm = () => {
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(6, 'Минимум 6 символов')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле')
      .test(
        'confirmPassword',
        'validation.passwordMustMatch',
        (value, context) => value === context.parent.password,
      ),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async(values) => {
      try {
        const response = await axios.post('/api/v1/signup', { 
          username: values.username, 
          password: values.password 
        });
        const { token, username } = response.data;
        // localStorage.setItem('user', JSON.stringify({ token, username }));
        dispatch(setAuthData({ token, username }));
        dispatch(login({ token, username }));
        navigate('/');
      } catch (error) {
        console.error("Ошибка регистрации", error);
        setRegistrationFailed(true);
      }
    },
  });

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <ChatNavbar />
      <Container fluid className="h-100, vh-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src="" className="rounded-circle" alt="Зарегистрироваться" />
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                  <Form onSubmit={formik.handleSubmit} noValidate>
                    <h1 className="text-center mb-4">Регистрация</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Ваш ник"
                        autoComplete="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.username && formik.errors.username}
                      />
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Пароль"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.password && formik.errors.password}
                      />
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Подтвердите пароль"
                        autoComplete="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                      />
                      <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {registrationFailed && (
                      <div className="text-danger mb-3">
                        Такой пользователь уже существует
                      </div>
                    )}

                    <Button
                      className="w-100 mb-3"
                      variant="outline-secondary"
                      type="submit"
                    >
                      Зарегистрироваться
                    </Button>
                  </Form>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};


export default RegistrationForm;
