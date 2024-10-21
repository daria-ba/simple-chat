import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className="">
      <h1 className="h4 text-muted">
        {t('notFoundPage.heading')}
      </h1>
      <p className="text-muted">{t('notFoundPage.text')}
        <Link to='./'>{t('notFoundPage.linkText')}</Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
