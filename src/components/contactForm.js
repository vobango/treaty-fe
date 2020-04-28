import * as React from 'react';
import {Icon} from './icons';
import {useMutation} from 'react-query';
import {useLocale} from '../context/locale';
import Input from './input';
import request from '../utils/request';

export const ContactForm = () => {
  const {translate} = useLocale();
  const onContactFormSubmit = ({contactName, contactEmail, message}) => {
    return request('/.netlify/functions/send-email', {
      body: {
        contactName,
        contactEmail,
        message
      }
    });
  };
  const [submitForm, {status, reset}] = useMutation(onContactFormSubmit, {
    onSuccess: () => {
      document.querySelector('#js-contact-name').value = '';
      document.querySelector('#js-contact-email').value = '';
      document.querySelector('#js-contact-message').value = '';
    }
  });
  const [errors, setErrors] = React.useState({});
  const validateForm = ({contactName, contactEmail, message}) => {
    const formValid = contactName && contactEmail && message;

    if (!formValid) {
      setErrors({
        name: contactName ? '' : translate('contactNameEmpty'),
        email: contactEmail ? '' : translate('contactEmailEmpty'),
        message: message ? '' : translate('contactMessageEmpty')
      });
      return false;
    }

    return true;
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const fields = {
      contactName: document.querySelector('#js-contact-name').value,
      contactEmail: document.querySelector('#js-contact-email').value,
      message: document.querySelector('#js-contact-message').value
    };
    const formIsValid = validateForm(fields);

    if (formIsValid) {
      await submitForm(fields);
    }
  };
  const clearError = key => {
    setErrors({
      ...errors,
      [key]: ''
    });
    reset();
  };

  return (
    <form className="flex flex-col items-start" onSubmit={handleSubmit}>
      <Input
        id="js-contact-name"
        label={translate('contactName')}
        error={errors.name}
        clearError={() => clearError('name')}
      />
      <div className="my-4" />
      <Input
        id="js-contact-email"
        label={translate('contactEmail')}
        error={errors.email}
        clearError={() => clearError('email')}
      />
      <div className="my-4" />
      <Input
        id="js-contact-message"
        label={translate('contactMessage')}
        type="textarea"
        textareaProps={{rows: 5, wrap: 'hard'}}
        error={errors.message}
        clearError={() => clearError('message')}
      />

      <div className="flex flex-col md:flex-row items-start md:items-center mt-8 ml-1">
        {status === 'loading' ? (
          <div className="bg-gray-200 w-32 h-12 border-2 border-gray-400 rounded-lg flex justify-center items-center">
            <Icon.Loader className="w-5 text-gray-700" />
          </div>
        ) : (
          <button className="bg-green-500 rounded-lg w-32 h-12 flex justify-center items-center text-white font-bold hover:bg-green-600 focus:outline-none focus:shadow-outline active:bg-green-700">
            {translate('contactSend')}
          </button>
        )}
        <div className="my-3 md:my-0 md:mx-3" />
        {status === 'success' && (
          <div className="bg-green-200 text-green-900 py-3 px-6 flex items-center">
            <Icon.Check className="text-green-700 w-5 mr-2" />
            {translate('contactSuccess')}
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-200 text-red-900 py-3 px-6 flex items-center">
            <Icon.Cross className="text-red-800 w-5 flex-grow mr-2" />
            {translate('contactError')}
          </div>
        )}
      </div>
    </form>
  );
};
