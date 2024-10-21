import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authorisation from './LoginForm.jsx';
import NotFoundPage from './404Page';
import ChatLayout from './ChatLayout.jsx';
import PrivateRoute from '../privateRoute.jsx';
import RegistrationForm from './RegistrationForm.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<div><ChatLayout /></div>} />
      </Route>
      <Route path="/login" element={<div><Authorisation /></div>} />
      <Route path="/signup" element={<div><RegistrationForm /></div>} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
