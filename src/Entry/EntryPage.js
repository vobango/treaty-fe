import React from 'react';
import logo from '../assets/images/logo.png';
import {useLocale} from '../context/locale';

const EntryPage = ({changePage}) => {
  const {translate} = useLocale();
  return (
    <div className="flex flex-col flex-grow justify-between h-auto px-8">
      <a href="/" className="flex justify-center">
        <img
          className="w-auto sm:h-24 mt-8"
          src={logo}
          alt={translate('logo')}
        />
      </a>
      <div className="flex flex-col h-auto w-full sm:items-stretch md:items-center px-4 mb-16">
        <h1 className="text-lg text-gray-600 font-bold text-center px-8 mb-8">
          {translate('entryText')}
        </h1>
        <button
          className="bg-green-500 mt4 p-4 text-3xl text-white rounded-lg md:w-full md:max-w-4xl"
          onClick={() => changePage('login')}
        >
          {translate('login')}
        </button>
        <button
          className="bg-green-500 mt-8 p-4 text-3xl text-white rounded-lg md:w-full md:max-w-4xl"
          onClick={() => changePage('register')}
        >
          {translate('register')}
        </button>
      </div>
      <button className="text-xl text-gray-600 font-bold mb-8">EST</button>
    </div>
  );
};

export default EntryPage;
