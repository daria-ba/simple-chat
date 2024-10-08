import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { clearAuthData } from '../store/slices/authSlice'

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(clearAuthData());  
    navigate('/login');
  };

  return <Button
  variant=""
  className='flex-grow-0 border 2 black'
  onClick={handleLogout}>
    Logout
  </Button>;
};

export default LogoutButton;