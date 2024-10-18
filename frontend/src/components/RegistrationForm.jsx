import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from "formik";
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { setAuthData, login } from '../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import ChatNavbar from './chat/ChatNavbar';
import leoProfanity from 'leo-profanity';
import regImg from '../assets/img/signup.jpg'

const RegistrationForm = () => {
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('validation.min_max'))
      .max(20, t('validation.min_max'))
      .required(t('validation.required')),
    password: Yup.string()
      .min(6, t('validation.passwordCharacters'))
      .required(t('validation.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('validation.passwordMustMatch'))
      .required(t('validation.required'))
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
          username: leoProfanity.clean(values.username), 
          password: values.password 
        });
        const { token, username } = response.data;
        dispatch(setAuthData({ token, username }));
        dispatch(login({ token, username }));
        navigate('/');
      } catch (error) {
        console.error("Ошибка регистрации", error);
        setRegistrationFailed(true);
      }
    }
  });

  useEffect(() => {
    if (inputRef.current) {
    inputRef.current.focus();
    }
    if (registrationFailed) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [registrationFailed]);

  return (
    <div className="d-flex flex-column h-100 bg-light">
      <ChatNavbar />
      <Container fluid className="h-100 vh-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src={regImg} className="rounded-circle" alt="Зарегистрироваться" />
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                  <Form onSubmit={formik.handleSubmit} noValidate>
                    <h1 className="text-center mb-4">{t('signupPage.heading')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        name="username"
                        id="username"
                        placeholder={t('signupPage.usernamePlaceholder')}
                        autoComplete="username"
                        ref={inputRef}
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.username && formik.errors.username || registrationFailed}
                      />
                      <Form.Label htmlFor="username">{t('signupPage.username')}</Form.Label>
                      {!registrationFailed && (
                        <Form.Control.Feedback type="invalid" tooltip placement="right">
                          {formik.errors.username && t(formik.errors.username)}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        placeholder={t('signupPage.passwordPlaceholder')}
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.password && formik.errors.password || registrationFailed}
                      />
                      <Form.Label htmlFor="password">{t('signupPage.password')}</Form.Label>
                      {!registrationFailed && (
                        <Form.Control.Feedback type="invalid" tooltip>
                          {formik.errors.password && t(formik.errors.password)}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder={t('signupPage.mustMatch')}
                        autoComplete="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword || registrationFailed}
                      />
                      <Form.Label htmlFor="confirmPassword">{t('signupPage.confirm')}</Form.Label>
                      <Form.Control.Feedback type="invalid" tooltip>
                      {registrationFailed
                      ? t('signupPage.alreadyExists')
                      : t(formik.errors.confirmPassword)}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      className="w-100 mb-3"
                      variant="outline-secondary"
                      type="submit"
                    >
                      {t('signupPage.submit')}
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
