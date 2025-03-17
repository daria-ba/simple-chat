import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import leoProfanity from 'leo-profanity';
import { useFormik } from 'formik';
import {
  Button,
  Form,
  Container,
  Card,
  Row,
  Col,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useValidationSchemas from '../validation';
import ChatNavbar from './chat/ChatNavbar';
import regImg from '../assets/img/signup.jpg';
import { setAuthData } from '../store/slices/authSlice';
import { useSignupMutation } from '../store/middlewares/index';

const RegistrationForm = () => {
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const [ signup ] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { signupShema } = useValidationSchemas();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupShema,
    onSubmit: async (values) => {
      setRegistrationFailed(false);

      try {
        const response = await signup({
          login: leoProfanity.clean(values.login),
          password: values.password,
        })
        console.log(response.data);
        const { token, login } = response.data;
        dispatch(setAuthData({ token, login }));
        navigate('/');
      } catch (error) {
        console.error('Ошибка регистрации', error);
        setRegistrationFailed(true);
      }
    },
    validateOnBlur: true,
    validateOnChange: false,
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
                        name="login"
                        id="login"
                        placeholder={t('signupPage.loginPlaceholder')}
                        autoComplete="login"
                        ref={inputRef}
                        value={formik.values.login}
                        onChange={formik.handleChange}
                        isInvalid={formik.errors.login || registrationFailed}
                      />
                      <Form.Label htmlFor="login">{t('signupPage.login')}</Form.Label>
                      {!registrationFailed && (
                        <Form.Control.Feedback type="invalid" tooltip placement="right">
                          {formik.errors.login && t(formik.errors.login)}
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
                        isInvalid={formik.errors.password || registrationFailed}
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
                        isInvalid={formik.errors.confirmPassword || registrationFailed}
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
