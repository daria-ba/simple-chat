import React, { useState } from 'react';
import { Formik, Field, Form as FormikForm } from "formik";
import { Button, Form, Container, Card, Navbar, Row, Col } from 'react-bootstrap';
// import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
// import axios from 'axios';
import { loginUser } from '../api/api.js';
// import handleLogin from '../api/routes.js';

const LoginForm = () => {
  const navigate = useNavigate();

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
      // console.log(response);
      localStorage.setItem('user', JSON.stringify(response))
      navigate('/');
      } catch (error) {
        console.error('Ошибка входа', error);
      } finally {
        // setSubmitting(false);
      }
    // finally {
    //   setSubmitting(false);
    // }
  };

  return (
    <div className="d-flex flex-column h-100 bg-light">
      {/* Navbar */}
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Chat
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container fluid className="h-100, vh-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src="" className="rounded-circle" alt="Войти" />
                </Col>
                <Col md={6} className="mt-3 mt-md-0">
                  <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(param) => {console.log("this is onSubmit", param)}}
                  >
                    {(props) => {
                      // console.log(props);
                      return <FormikForm
                      onSubmit={(e)=>{
                        e.preventDefault();
                        handleSubmit(props.values)}}>
                        <h1 className="text-center mb-4">Войти</h1>
                        <Form.Group className="form-floating mb-3">
                          <Field
                            as={Form.Control}
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Ваш ник"
                            autoComplete="username"
                            // isInvalid={touched.username && errors.username}
                          />
                          <Form.Label htmlFor="username">Ваш ник</Form.Label>
                          <Form.Control.Feedback type="invalid">
                            {/* {errors.username} */}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="form-floating mb-4">
                          <Field
                            as={Form.Control}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Пароль"
                            autoComplete="current-password"
                            // isInvalid={touched.password && errors.password}
                          />
                          <Form.Label htmlFor="password">Пароль</Form.Label>
                          <Form.Control.Feedback type="invalid">
                            {/* {errors.password} */}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                          className="w-100 mb-3"
                          variant="outline-secondary"
                          type="submit"
                          // disabled={isSubmitting}
                        >
                          Войти
                        </Button>
                      </FormikForm>
                    }}
                  </Formik>
                </Col>
              </Card.Body>

              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span> <Link to="/signup">Регистрация</Link>
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
