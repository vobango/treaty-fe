import * as React from 'react';
import {Icon} from './icons';
import {useMutation} from 'react-query';
import {useLocale} from '../context/locale';
import Input from './input';
import request from '../utils/request';

export const ContactForm = () => {
  const {translate} = useLocale();
  const [errors, setErrors] = React.useState({});
  const onContactFormSubmit = () => {
    const contactName = document.querySelector('#js-contact-name').value;
    const contactEmail = document.querySelector('#js-contact-email').value;
    const message = document.querySelector('#js-contact-message').value;
    const formValid = contactName && contactEmail && message;

    if (!formValid) {
      setErrors({
        name: contactName ? '' : translate('contactNameEmpty'),
        email: contactEmail ? '' : translate('contactEmailEmpty'),
        message: message ? '' : translate('contactMessageEmpty')
      });
      return Promise.resolve({});
    }

    return request('/.netlify/functions/send-email', {
      body: {
        contactName,
        contactEmail,
        message
      }
    });
  };
  const [mutate, {status, reset}] = useMutation(onContactFormSubmit, {
    onSuccess: () => {
      document.querySelector('#js-contact-name').value = '';
      document.querySelector('#js-contact-email').value = '';
      document.querySelector('#js-contact-message').value = '';
    }
  });
  const clearError = key => {
    setErrors({
      ...errors,
      [key]: ''
    });
    reset();
  };

  return (
    <form
      className="flex flex-col items-start"
      onSubmit={async e => {
        e.preventDefault();
        await mutate();
      }}
    >
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

      <div className="flex items-center mt-8 ml-1">
        <button className="bg-green-500 rounded-lg px-6 py-3 text-white font-bold hover:bg-green-600 focus:outline-none focus:shadow-outline active:bg-green-700">
          {translate('contactSend')}
        </button>
        {status === 'success' && (
          <div className="ml-10 bg-green-200 text-green-900 py-3 px-6 flex items-center">
            <Icon.Check className="text-green-700 w-5 mr-2" />
            {translate('contactSuccess')}
          </div>
        )}
        {status === 'error' && (
          <div className="ml-10 bg-red-200 text-red-900 py-3 px-6 flex items-center">
            <Icon.Cross className="text-red-800 w-5 mr-2" />
            {translate('contactError')}
          </div>
        )}
      </div>
    </form>
  );
};
