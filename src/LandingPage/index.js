import React from 'react';
import logo from '../assets/images/logo.png';
import {useLocale} from '../context/locale';

export default () => {
  const {translate} = useLocale();
  const menuItems = [
    {text: 'Kuidas see töötab?', to: '/'},
    {text: 'Paku tööd', to: '/'},
    {text: 'Paku tööjõudu', to: '/'},
    {text: 'Tööpakkumised', to: '/'},
    {text: 'Tööjõud', to: '/'},
    {text: 'Kontakt', to: '/'}
  ];
  return (
    <div className="w-full">
      <div className="w-full h-48 bg-black opacity-50 absolute" />
      <div className="w-full py-6 px-12 relative z-10 flex items-baseline justify-between">
        <img className="w-auto h-32" src={logo} alt={translate('logo')} />
        <nav>
          <ul className="flex">
            {menuItems.map(({text, to}) => {
              return (
                <li className="mx-6 text-white font-bold text-xl" key={text}>
                  <a
                    href={to}
                    className="border-0 border-b-2 border-transparent hover:border-white"
                  >
                    {text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
