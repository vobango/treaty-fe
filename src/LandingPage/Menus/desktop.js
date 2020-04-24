import {useLocale} from '../../context/locale';
import React from 'react';
import {menuItems} from '../index';

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
                className="border-0 border-b-2 border-transparent hover:border-white"
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
