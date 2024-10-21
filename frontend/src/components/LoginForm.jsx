/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Button,
  Form,
  Container,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import loginUser from '../api/api.js';
import ChatNavbar from './chat/ChatNavbar.jsx';
import loginImg from '../assets/img/login.jpeg';
import { setAuthData, login } from '../store/slices/authSlice';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginFailed, setLoginFailed] = useState(false);
  const inputRef = useRef(null);

  const authSchema = Yup.object({
    username: Yup.string().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginUser({
          username: values.username,
          password: values.password,
        });
        const { token, username } = response;
        localStorage.setItem('user', JSON.stringify(response));
        dispatch(setAuthData({ token, username }));
        dispatch(login({ token, username }));
        navigate('/');
      } catch (error) {
        console.error('Ошибка входа', error);
        setLoginFailed(true);
      }
    },
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
    if (loginFailed) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [loginFailed]);

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <ChatNavbar />
      <Container fluid className="h-100, vh-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src={loginImg} className="rounded-circle" alt="Войти" />
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                  <Form onSubmit={formik.handleSubmit} noValidate>
                    <h1 className="text-center mb-4">{t('loginPage.heading')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        id="username"
                        placeholder={t('loginPage.username')}
                        autoComplete="username"
                        ref={inputRef}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        isInvalid={loginFailed}
                      />
                      <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
                      {!loginFailed && (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {t('loginPage.loginFailed')}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        placeholder={t('loginPage.password')}
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={loginFailed}
                      />
                      <Form.Label htmlFor="password">{t('loginPage.password')}</Form.Label>
                      {loginFailed && (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {t('loginPage.loginFailed')}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                    <Button
                      className="w-100 mb-3"
                      variant="outline-secondary"
                      type="submit"
                    >
                      {t('loginPage.submitBtn')}
                    </Button>
                  </Form>
                </Col>
              </Card.Body>

              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('loginPage.noAccount')}</span>
                  <Link to="/signup">{t('loginPage.signup')}</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;
