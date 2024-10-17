/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Formik, Field, Form as FormikForm } from "formik";
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { loginUser } from '../api/api.js';
import ChatNavbar from './chat/ChatNavbar.jsx';
import { useTranslation } from 'react-i18next';
import loginImg from '../assets/img/login.jpeg'

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);

  const validationSchema = Yup.object({
    login: Yup.string().required('Required'),
    password: Yup.string().required('Required')
  });

  const handleSubmit = async (values) => {

    try {
      const response = await loginUser({
        username: values.username,
        password: values.password,
      });
      localStorage.setItem('user', JSON.stringify(response))
      navigate('/');
      } catch (error) {
        console.error('Ошибка входа', error);
        setLoginFailed(true);
      }
  };

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
                  <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={validationSchema}
                    // onSubmit={(param) => {console.log("this is onSubmit", param)}}
                  >
                    {(props) => {
                      return <FormikForm
                      onSubmit={(e)=>{
                        e.preventDefault();
                        handleSubmit(props.values)}}>
                        <h1 className="text-center mb-4">{t('loginPage.heading')}</h1>
                        <Form.Group className="form-floating mb-3">
                          <Field
                            as={Form.Control}
                            type="text"
                            name="username"
                            id="username"
                            placeholder={t('loginPage.username')}
                            autoComplete="username"
                            isInvalid={loginFailed}
                          />
                          <Form.Label htmlFor="username">{t('loginPage.username')}</Form.Label>
                        </Form.Group>
                        <Form.Group className="form-floating mb-4">
                          <Field
                            as={Form.Control}
                            type="password"
                            name="password"
                            id="password"
                            placeholder={t('loginPage.password')}
                            autoComplete="current-password"
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
                      </FormikForm>
                    }}
                  </Formik>
                </Col>
              </Card.Body>

              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t('loginPage.noAccount')}</span> <Link to="/signup">{t('loginPage.signup')}</Link>
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
