import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const useValidationSchemas = () => {
  const { t } = useTranslation();

  const modalShema = (channelsNames) => Yup.object({
    channelName: Yup.string()
      .min(3, `${t('validation.min_max')}`)
      .max(20, `${t('validation.min_max')}`)
      .notOneOf(channelsNames, `${t('validation.uniq')}`)
      .required(`${t('validation.required')}`),
  });

  const authShema = Yup.object({
    login: Yup.string().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  });

  const signupShema = Yup.object().shape({
    login: Yup.string()
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

  return {
    modalShema,
    authShema,
    signupShema,
  };
};

export default useValidationSchemas;
