import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { clearAuthData } from '../../store/slices/authSlice';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(clearAuthData());
    navigate('/signin');
  };

  return (
    <Button
      variant=""
      className="flex-grow-0 border 2 grey"
      onClick={handleLogout}
    >
      {t('Navigation.logout')}
    </Button>
  );
};

export default LogoutButton;
