import {useLocale} from '../../providers/locale';
import React from 'react';
import {menuItems} from '../../pages/LandingPage';

export const DesktopMenu = () => {
  const {translate} = useLocale();

  return (
    <nav
      data-testid="desktop-menu"
      className="flex items-center justify-center"
    >
      <ul className="flex text-xl">
        {menuItems.map(({text, to}) => {
          return (
            <li className="mx-6 text-white font-bold" key={text}>
              <a
                href={to}
                className="border-0 border-b-2 pt-1 px-1 border-transparent hover:border-white focus:outline-none focus:border-white active:text-green-500 active:border-green-500"
              >
                {translate(text)}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
