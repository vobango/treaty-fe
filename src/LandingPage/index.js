import React from 'react';
import logo from '../assets/images/logo.png';
import landing1 from '../assets/images/landing_1.jpg';
import {useLocale} from '../context/locale';

export default () => {
  const {translate} = useLocale();
  const menuItems = [
    {text: 'howItWorks', to: '/'},
    {text: 'offerWork', to: '/'},
    {text: 'offerWorkers', to: '/'},
    {text: 'jobOffers', to: '/'},
    {text: 'workerOffers', to: '/'},
    {text: 'contact', to: '/'}
  ];
  return (
    <div className="w-full">
      <img className="absolute" src={landing1} alt="workers" />
      <div className="w-full h-48 bg-black opacity-75 absolute" />
      <div className="w-full py-6 px-16 relative z-10 flex items-baseline justify-between">
        <a href="/">
          <img className="w-auto h-32" src={logo} alt={translate('logo')} />
        </a>
        <nav>
          <ul className="flex">
            {menuItems.map(({text, to}) => {
              return (
                <li className="mx-6 text-white font-bold text-xl" key={text}>
                  <a
                    href={to}
                    className="border-0 border-b-2 border-transparent hover:border-white"
                  >
                    {translate(text)}
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
