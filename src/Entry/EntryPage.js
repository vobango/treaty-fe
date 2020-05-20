import React from 'react';
import logo from '../assets/images/Cofind_logo_roh_pos.png';
import {useLocale} from '../context/locale';

const EntryPage = ({changePage}) => {
  const {translate} = useLocale();
  return (
    <div className="flex flex-col flex-grow justify-between h-screen px-8">
      <a href="/" className="flex justify-center">
        <img className="h-24 mt-8" src={logo} alt={translate('logo')} />
      </a>
      <div className="flex flex-col h-auto w-full sm:items-stretch md:items-center px-4 mb-16">
        <h1 className="header-text">{translate('entryText')}</h1>
        <button className="entry-button" onClick={() => changePage('login')}>
          {translate('login')}
        </button>
        <button className="entry-button" onClick={() => changePage('register')}>
          {translate('register')}
        </button>
      </div>
      <button className="text-xl text-gray-600 font-bold mb-8">EST</button>
    </div>
  );
};

export default EntryPage;
