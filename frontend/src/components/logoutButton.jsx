import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { clearAuthData } from '../store/slices/authSlice'
import { useTranslation } from 'react-i18next';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const handleLogout = () => {
    dispatch(clearAuthData());  
    navigate('/login');
  };

  return <Button
  variant=""
  className='flex-grow-0 border 2 black'
  onClick={handleLogout}>
    {t('Navigation.logout')}
  </Button>;
};

export default LogoutButton;