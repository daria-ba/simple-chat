import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Authorisation from './LoginForm.jsx';
import NotFoundPage from './404Page';
import ChatLayout from './ChatLayout.jsx';
import PrivateRoute from "../privateRoute.jsx";
import RegistrationForm from "./RegistrationForm.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<div><ChatLayout /></div>} />
        </Route>
        <Route path="/login" element={<div><Authorisation /></div>} />
        <Route path="/signup" element={<div><RegistrationForm /></div>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
